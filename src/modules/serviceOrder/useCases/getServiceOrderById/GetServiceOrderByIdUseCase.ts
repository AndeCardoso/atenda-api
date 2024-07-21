import { contentNotFound, ok } from "@helper/http/httpHelper";
import { prisma } from "@prismaClient/client";
import { ServiceOrderResponseDTO } from "@modules/serviceOrder/dtos/ServiceOrderResponseDTO";
import { HttpResponse } from "@shared/protocols/http";

export class GetServiceOrderByIdUseCase {
  async execute(
    id: number,
    companyId: number
  ): Promise<HttpResponse<ServiceOrderResponseDTO>> {
    const serviceOrder = await prisma.serviceOrder.findUnique({
      select: {
        id: true,
        selectedVoltage: true,
        reportedDefect: true,
        foundDefect: true,
        orderedServices: true,
        executedServices: true,
        observations: true,
        signatureUrl: true,
        opened_at: true,
        closed_at: true,
        totalValue: true,
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
        updated_at: true,
        created_at: true,
      },
      where: { companyId, id },
    });

    if (!serviceOrder) {
      return contentNotFound("Ordem de serviço");
    }

    return ok(serviceOrder);
  }
}
