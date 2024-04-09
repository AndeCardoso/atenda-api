import { prisma } from "@prismaClient/client";
import { CreateTechnicianDTO } from "@modules/technician/dtos/CreateTechnicianDTO";
import {
  TechnicianResponseDTO,
  technicianStatusEnum,
} from "@modules/technician/dtos/TechnicianResponseDTO";
import { badRequest, created, serverError } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";

export class CreateTechnicianUseCase {
  async execute({
    name,
    cpf,
    phone,
    position,
    status,
    nickname,
    cep,
    street,
    number,
    complement,
    district,
    state,
    city,
    userId,
  }: CreateTechnicianDTO): Promise<HttpResponse<TechnicianResponseDTO>> {
    const checkTechnicianExistence = await prisma.technician.findUnique({
      where: {
        userId,
        cpf,
      },
    });

    if (Boolean(checkTechnicianExistence)) {
      return badRequest("Cpf já cadastrado");
    }

    try {
      const newAddress = await prisma.address.create({
        data: {
          nickname,
          cep,
          street,
          number,
          complement,
          district,
          state,
          city,
        },
      });

      const newTechnician = await prisma.technician.create({
        data: {
          name,
          phone,
          cpf,
          position,
          status: status ?? technicianStatusEnum.AVAILABLE,
          addressId: newAddress.id,
          userId,
        },
      });

      return created({
        id: newTechnician.id,
        name: newTechnician.name,
        phone: newTechnician.phone,
        cpf: newTechnician.cpf,
        position: newTechnician.position,
        status: newTechnician.status,
        address: {
          nickname: newAddress?.nickname,
          cep: newAddress?.cep,
          district: newAddress?.district,
          street: newAddress?.state,
          number: newAddress?.number,
          complement: newAddress?.complement ?? null,
          state: newAddress?.state,
          city: newAddress?.city,
        },
        updated_at: newTechnician.updated_at,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
