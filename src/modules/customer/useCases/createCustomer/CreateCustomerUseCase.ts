import { prisma } from "@prismaClient/client";
import { badRequest, created, serverError } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { CreateCustomerDTO } from "@modules/customer/dtos/CreateCustomerDTO";
import { CustomerResponseDTO } from "@modules/customer/dtos/CustomerResponseDTO";
import { customerStatusEnum } from "@modules/customer/constants";
import { address } from "@shared/types/address.type";

export class CreateCustomerUseCase {
  async execute({
    name,
    document,
    phone,
    secondPhone,
    email,
    status,
    addresses,
    userId,
  }: CreateCustomerDTO): Promise<HttpResponse<CustomerResponseDTO>> {
    const checkCustomerExistence = await prisma.customer.findFirst({
      where: {
        userId,
        document,
      },
    });

    if (Boolean(checkCustomerExistence)) {
      return badRequest("Documento já cadastrado");
    }

    try {
      const newAddresses: address[] = [];
      const newAddressIds: number[] = [];
      for (const {
        nickname,
        cep,
        street,
        number,
        complement,
        district,
        state,
        city,
      } of addresses) {
        const newAddress = await prisma.address.create({
          data: {
            nickname,
            cep,
            street,
            number,
            complement,
            district,
            state,
            city,
          },
        });
        newAddressIds.push(newAddress.id);
        newAddresses.push(newAddress);
      }

      const newCustomer = await prisma.customer.create({
        data: {
          name,
          phone,
          secondPhone,
          email,
          document,
          status: status ?? customerStatusEnum.OK,
          addressesId: newAddressIds,
          userId,
        },
      });

      return created({
        id: newCustomer.id,
        name: newCustomer.name,
        document: newCustomer.document,
        phone: newCustomer.phone,
        secondPhone: newCustomer.secondPhone,
        email: newCustomer.email,
        status: newCustomer.status,
        addressIds: newAddressIds,
        addresses: newAddresses,
        updated_at: newCustomer.updated_at,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
