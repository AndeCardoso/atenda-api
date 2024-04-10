import { contentNotFound, ok } from "@helper/http/httpHelper";
import { prisma } from "@prismaClient/client";
import { TechnicianResponseDTO } from "@modules/technician/dtos/TechnicianResponseDTO";
import { HttpResponse } from "@shared/protocols/http";
import { CreateTechnicianDTO } from "@modules/technician/dtos/CreateTechnicianDTO";

export class UpdateTechnicianUseCase {
  async execute(
    id: number,
    userId: number,
    data: CreateTechnicianDTO
  ): Promise<HttpResponse<TechnicianResponseDTO>> {
    const technician = await prisma.technician.update({
      where: { userId, id },
      data: {
        name: data.name,
        phone: data.phone,
        status: data.status,
        position: data.position,
      },
    });

    const technicianAddress = await prisma.address.update({
      where: { id: technician.addressId },
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

    if (!technician) {
      return contentNotFound("Técnico");
    }

    return ok({
      ...technician,
      address: technicianAddress,
    });
  }
}
