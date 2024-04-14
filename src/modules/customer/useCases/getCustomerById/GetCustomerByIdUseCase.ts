import { contentNotFound, ok } from "@helper/http/httpHelper";
import { prisma } from "@prismaClient/client";
import { HttpResponse } from "@shared/protocols/http";
import { CustomerResponseDTO } from "@modules/customer/dtos/CustomerResponseDTO";

export class GetCustomerByIdUseCase {
  async execute(
    id: number,
    userId: number
  ): Promise<HttpResponse<CustomerResponseDTO>> {
    const customer = await prisma.customer.findUnique({
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
      where: { userId, id },
    });

    if (!customer) {
      return contentNotFound("Cliente");
    }

    const addressList = [];
    for (const id of customer.addressesId) {
      const adress = await prisma.address.findUnique({
        where: {
          id,
        },
      });

      addressList.push(adress);
    }

    return ok({ ...customer, addresses: addressList });
  }
}
