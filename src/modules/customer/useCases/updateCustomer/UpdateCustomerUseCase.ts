import { contentNotFound, ok } from "@helper/http/httpHelper";
import { prisma } from "@prismaClient/client";
import { HttpResponse } from "@shared/protocols/http";
import { CreateCustomerDTO } from "@modules/customer/dtos/CreateCustomerDTO";
import { CustomerResponseDTO } from "@modules/customer/dtos/CustomerResponseDTO";
import { address } from "@shared/types/address.type";

export class UpdateCustomerUseCase {
  async execute(
    id: number,
    companyId: number,
    data: CreateCustomerDTO
  ): Promise<HttpResponse<CustomerResponseDTO>> {
    try {
      const currentCustomer = await prisma.customer.findFirst({
        where: {
          id,
          companyId,
        },
      });

      if (!currentCustomer) {
        return contentNotFound("Cliente");
      }

      const updatedAddresses: address[] = [];
      const updatedAddressIds: number[] = currentCustomer.addressesId ?? [];

      const paramsIdList = data.addresses.map((address) => Number(address.id));

      const fixedIdList = [];

      for (const id of updatedAddressIds) {
        if (!paramsIdList.some((item) => item === id)) {
          await prisma.address.delete({
            where: {
              id,
            },
          });
        } else {
          fixedIdList.push(id);
        }
      }

      for (const [index, address] of data.addresses.entries()) {
        const {
          nickname,
          cep,
          street,
          number,
          complement,
          district,
          state,
          city,
        } = address;

        if (!address.id) {
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
          updatedAddresses.push(newAddress);
          fixedIdList.push(newAddress.id);
        } else {
          const updatedAddress = await prisma.address.update({
            where: {
              id: Number(address.id),
            },
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
          updatedAddresses.push(updatedAddress);
        }
      }

      const customer = await prisma.customer.update({
        where: { companyId, id },
        data: {
          name: data.name,
          document: data.document,
          phone: data.phone,
          secondPhone: data.secondPhone,
          email: data.email,
          status: data.status,
          addressesId: fixedIdList,
        },
      });

      return ok({
        ...customer,
        addresses: updatedAddresses,
      });
    } catch (error) {
      return contentNotFound("Cliente");
    }
  }
}
