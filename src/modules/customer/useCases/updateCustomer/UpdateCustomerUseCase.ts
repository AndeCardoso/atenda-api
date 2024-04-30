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

      const currentIdList = currentCustomer.addressesId;
      const newIdList = data.addresses.map((address) =>
        address.id ? Number(address.id) : null
      );

      const newAddressesIdList: number[] = [];

      const addressIdsToDelete = Boolean(currentIdList)
        ? currentIdList.filter((curId) => {
            if (newIdList[0] !== null && newIdList.indexOf(curId) == -1) {
              return curId;
            } else {
              newAddressesIdList.push(curId);
            }
          })
        : undefined;

      if (addressIdsToDelete && addressIdsToDelete.length > 0) {
        for (const addressIdToDelete of addressIdsToDelete) {
          await prisma.address.delete({
            where: {
              id: addressIdToDelete,
            },
          });
        }
      }

      const updatedAddressIdList =
        newAddressesIdList.length > 0 ? newAddressesIdList : updatedAddressIds;

      const customer = await prisma.customer.update({
        where: { companyId, id },
        data: {
          name: data.name,
          document: data.document,
          phone: data.phone,
          secondPhone: data.secondPhone,
          email: data.email,
          status: data.status,
          addressesId: [...updatedAddressIdList],
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
