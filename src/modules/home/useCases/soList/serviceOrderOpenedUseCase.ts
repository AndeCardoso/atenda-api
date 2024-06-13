import { prisma } from "@prismaClient/client";
import { contentNotFound, ok, serverError } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { ServiceOrderResponseDTO } from "@modules/serviceOrder/dtos/ServiceOrderResponseDTO";
import { serviceOrderStatusEnum } from "@modules/serviceOrder/constants";

export class ServiceOrderOpenedUseCase {
  async execute(id: number): Promise<HttpResponse<ServiceOrderResponseDTO>> {
    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    });

    if (!company) {
      return serverError("Erro inesperado");
    }

    const serviceOrderOpenedList = await prisma.serviceOrder.findMany({
      select: {
        id: true,
        opened_at: true,
        status: true,
        customer: { select: { name: true } },
        equipment: { select: { nickname: true, brand: true, model: true } },
      },
      where: {
        companyId: company.id,
        OR: [
          {
            status: serviceOrderStatusEnum.OPENED,
          },
          {
            status: serviceOrderStatusEnum.EXECUTING,
          },
        ],
      },
      orderBy: { opened_at: "asc" },
      take: 10,
    });

    if (!serviceOrderOpenedList) {
      return contentNotFound("Ordens de serviço abertas");
    }

    return ok(serviceOrderOpenedList);
  }
}
