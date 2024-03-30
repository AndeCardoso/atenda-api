import { contentNotFound, ok } from "@helper/http/httpHelper";
import { prisma } from "@prismaClient/client";
import { TechnicianResponseDTO } from "@modules/technician/dtos/TechnicianResponseDTO";
import { HttpResponse } from "@shared/protocols/http";

export class GetTechnicianByIdUseCase {
  async execute(id: number): Promise<HttpResponse<TechnicianResponseDTO>> {
    const technician = await prisma.technician.findUnique({
      select: {
        id: true,
        name: true,
        cpf: true,
        phone: true,
        status: true,
        position: true,
        address: {
          select: {
            cep: true,
            complement: true,
            district: true,
            street: true,
            number: true,
            state: true,
            city: true,
          },
        },
        updated_at: true,
      },
      where: { id },
    });

    if (!technician) {
      return contentNotFound("Técnico");
    }

    return ok(technician);
  }
}
