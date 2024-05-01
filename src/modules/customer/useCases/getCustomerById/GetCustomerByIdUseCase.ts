import { contentNotFound, ok } from "@helper/http/httpHelper";
import { prisma } from "@prismaClient/client";
import { HttpResponse } from "@shared/protocols/http";
import { CustomerResponseDTO } from "@modules/customer/dtos/CustomerResponseDTO";

export class GetCustomerByIdUseCase {
  async execute(
    id: number,
    companyId: number
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
      where: { companyId, id },
    });

    if (!customer) {
      return contentNotFound("Cliente");
    }

    const addressList = [];
    for (const id of customer.addressesId) {
      const address = await prisma.address.findUnique({
        where: {
          id,
        },
      });

      addressList.push(address);
    }

    return ok({ ...customer, addresses: addressList });
  }
}
