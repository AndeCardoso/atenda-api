import { prisma } from "@prismaClient/client";
import {
  IPaginationResponse,
  paginationResponseMount,
} from "@utils/paginationResponseMount";
import { IPaginationParams, orderEnum } from "@shared/types/pagination.type";
import {
  TCustomerColumnTypes,
  customerColumnTypesEnum,
} from "../../constants/paramsType";
import { contentNotFound, ok, serverError } from "src/helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { CustomerResponseDTO } from "@modules/customer/dtos/CustomerResponseDTO";
import { address } from "@shared/types/address.type";

export class GetCustomerListUseCase {
  async execute({
    page = 1,
    limit = 20,
    order = orderEnum.ASC,
    column = customerColumnTypesEnum.NAME,
    search,
    userId,
  }: IPaginationParams<TCustomerColumnTypes>): Promise<
    HttpResponse<IPaginationResponse<CustomerResponseDTO>>
  > {
    const offset = (page - 1) * limit;

    try {
      const customers = await prisma.customer.findMany({
        select: {
          id: true,
          name: true,
          document: true,
          phone: true,
          secondPhone: true,
          email: true,
          status: true,
          addressesId: true,
          updated_at: true,
        },
        where: {
          userId,
          name: {
            mode: "insensitive",
            contains: search,
          },
        },
        orderBy: { [column]: order },
        take: limit,
        skip: offset,
      });

      const addressList: address[] = [];
      const customerList: CustomerResponseDTO[] = [];
      for (const customer of customers) {
        for (const id of customer.addressesId) {
          const address = await prisma.address.findUnique({
            where: {
              id,
            },
          });

          if (address) {
            addressList.push(address);
          }
        }
        customerList.push({ ...customer, addresses: addressList });
      }

      const totalCustomers = customers.length;

      if (customers.length === 0) {
        return contentNotFound("Clientes");
      }

      return ok(
        paginationResponseMount<CustomerResponseDTO>({
          data: customerList,
          page,
          limit,
          totalItems: totalCustomers,
        })
      );
    } catch (error) {
      return serverError(error);
    }
  }
}
