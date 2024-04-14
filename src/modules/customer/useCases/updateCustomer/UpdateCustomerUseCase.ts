import { contentNotFound, ok } from "@helper/http/httpHelper";
import { prisma } from "@prismaClient/client";
import { HttpResponse } from "@shared/protocols/http";
import { CreateCustomerDTO } from "@modules/customer/dtos/CreateCustomerDTO";
import { CustomerResponseDTO } from "@modules/customer/dtos/CustomerResponseDTO";
import { address } from "@shared/types/address.type";

export class UpdateCustomerUseCase {
  async execute(
    id: number,
    userId: number,
    data: CreateCustomerDTO
  ): Promise<HttpResponse<CustomerResponseDTO>> {
    try {
      const currentCustomer = await prisma.customer.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!currentCustomer) {
        return contentNotFound("Cliente");
      }

      const updatedAddresses: address[] = [];
      const updatedAddressIds: number[] = currentCustomer.addressesId;
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
          updatedAddressIds.push(newAddress.id);
          continue;
        }

        const updatedAddress = await prisma.address.update({
          where: {
            id: address.id,
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

      const customer = await prisma.customer.update({
        where: { userId, id },
        data: {
          name: data.name,
          document: data.document,
          phone: data.phone,
          secondPhone: data.secondPhone,
          email: data.email,
          status: data.status,
          addressesId: updatedAddressIds,
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
