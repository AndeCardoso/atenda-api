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
    address,
  }: CreateTechnicianDTO): Promise<HttpResponse<TechnicianResponseDTO>> {
    const checkTechnicianExistence = await prisma.technician.findUnique({
      where: {
        cpf,
      },
    });

    if (Boolean(checkTechnicianExistence)) {
      return badRequest("Cpf já cadastrado");
    }

    try {
      const newAddress = await prisma.address.create({
        data: {
          cep: address.cep,
          street: address.street,
          number: address.number,
          complement: address.complement,
          district: address.district,
          state: address.state,
          city: address.city,
        },
      });

      const newTechnician = await prisma.technician.create({
        data: {
          name,
          phone,
          cpf,
          position,
          status: technicianStatusEnum.AVAILABLE,
          addressId: newAddress.id,
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
          cep: newAddress.cep,
          district: newAddress.district,
          street: newAddress.state,
          number: newAddress.number,
          complement: newAddress.complement ?? null,
          state: newAddress.state,
          city: newAddress.city,
        },
        updated_at: newTechnician.updated_at,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
