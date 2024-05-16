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
      select: {
        id: true,
        selectedVoltage: true,
        reportedDefect: true,
        foundDefect: true,
        orderedServices: true,
        executedServices: true,
        observations: true,
        status: true,
        address: {
          select: {
            id: true,
            nickname: true,
            cep: true,
            complement: true,
            district: true,
            street: true,
            number: true,
            state: true,
            city: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            document: true,
            phone: true,
            secondPhone: true,
            email: true,
            status: true,
            updated_at: true,
          },
        },
        equipment: {
          select: {
            id: true,
            nickname: true,
            brand: true,
            model: true,
            description: true,
            serialNumber: true,
            voltage: true,
            accessories: true,
            color: true,
            status: true,
            updated_at: true,
          },
        },
        technician: {
          select: {
            id: true,
            name: true,
            cpf: true,
            phone: true,
            status: true,
            position: true,
            updated_at: true,
          },
        },
        closed_at: true,
        updated_at: true,
        created_at: true,
      },
    });

    if (!serviceOrder) {
      return contentNotFound("Ordem de serviço");
    }

    return ok(serviceOrder);
  }
}
