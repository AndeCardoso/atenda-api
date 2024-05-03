import { contentNotFound, ok } from "@helper/http/httpHelper";
import { prisma } from "@prismaClient/client";
import { ServiceOrderResponseDTO } from "@modules/serviceOrder/dtos/ServiceOrderResponseDTO";
import { HttpResponse } from "@shared/protocols/http";
import { CreateServiceOrderDTO } from "@modules/serviceOrder/dtos/CreateServiceOrderDTO";

export class UpdateServiceOrderUseCase {
  async execute(
    id: number,
    companyId: number,
    data: CreateServiceOrderDTO
  ): Promise<HttpResponse<ServiceOrderResponseDTO>> {
    const serviceOrder = await prisma.serviceOrder.update({
      where: { companyId, id },
      data: {
        status: data.status,
        selectedVoltage: data.selectedVoltage,
        reportedDefect: data.reportedDefect,
        foundDefect: data.foundDefect,
        orderedServices: data.orderedServices,
        executedServices: data.executedServices,
        observations: data.observations,
        customerId: data.customerId,
        equipmentId: data.equipmentId,
        technicianId: data.technicianId,
        addressId: data.addressId,
        closed_at: data.closedAt,
      },
    });

    const serviceOrderAddress = await prisma.address.update({
      where: { id: serviceOrder.addressId },
      data: {
        street: data.street,
        number: data.number,
        complement: data.complement,
        district: data.district,
        cep: data.cep,
        state: data.state,
        city: data.city,
      },
    });

    if (!serviceOrder) {
      return contentNotFound("Técnico");
    }

    return ok({
      ...serviceOrder,
      address: serviceOrderAddress,
    });
  }
}
