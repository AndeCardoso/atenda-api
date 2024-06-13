import { prisma } from "@prismaClient/client";
import { HttpResponse } from "@shared/protocols/http";
import { ok, serverError } from "@helper/http/httpHelper";
import { serviceOrderStatusEnum } from "@modules/serviceOrder/constants";
import { ServiceOrderDatasResponseDTO } from "@modules/home/dtos/advertise/ServiceOrderDatasDTO";

export class ServiceOrderDatasUseCase {
  async execute(
    id: number
  ): Promise<HttpResponse<ServiceOrderDatasResponseDTO>> {
    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    });

    if (!company) {
      return serverError("Erro inesperado");
    }

    const servicesOrder = await prisma.serviceOrder.findMany({
      select: {
        status: true,
      },
      where: {
        companyId: company.id,
      },
    });

    const openedServicesOrder = servicesOrder.filter(
      (so) => so.status === serviceOrderStatusEnum.OPENED
    ).length;
    const executingServicesOrder = servicesOrder.filter(
      (so) => so.status === serviceOrderStatusEnum.EXECUTING
    ).length;
    const concludedServicesOrder = servicesOrder.filter(
      (so) => so.status === serviceOrderStatusEnum.DONE
    ).length;
    const withdrawnServicesOrder = servicesOrder.filter(
      (so) => so.status === serviceOrderStatusEnum.CLOSED
    ).length;

    const datas = {
      openedSo: openedServicesOrder,
      executingSo: executingServicesOrder,
      concludedSo: concludedServicesOrder,
      withdrawnSo: withdrawnServicesOrder,
      total: servicesOrder.length,
    };

    return ok(datas);
  }
}
