import { contentNotFound, ok } from "@helper/http/httpHelper";
import { prisma } from "@prismaClient/client";
import { TechnicianResponseDTO } from "@modules/technician/dtos/TechnicianResponseDTO";
import { HttpResponse } from "@shared/protocols/http";
import { UpdateTechnicianDTO } from "@modules/technician/dtos/UpdateTechnicianDTO";

export class UpdateTechnicianUseCase {
  async execute(
    id: number,
    data: UpdateTechnicianDTO
  ): Promise<HttpResponse<TechnicianResponseDTO>> {
    const technician = await prisma.technician.update({
      where: { id },
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
        street: data?.address?.street,
        number: data?.address?.number,
        complement: data?.address?.complement,
        district: data?.address?.district,
        cep: data?.address?.cep,
        state: data?.address?.state,
        city: data?.address?.city,
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
