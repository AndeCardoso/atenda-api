import { prisma } from "@prismaClient/client";
import {
  IPaginationResponse,
  paginationResponseMount,
} from "@utils/paginationResponseMount";
import { IPaginationParams, orderEnum } from "@shared/types/pagination.type";
import {
  TTechnicianColumnTypes,
  technicianColumnTypesEnum,
} from "./paramsType";
import { TechnicianResponseDTO } from "@modules/technician/dtos/TechnicianResponseDTO";
import { contentNotFound, ok, serverError } from "src/helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";

export class GetTechnicianListUseCase {
  async execute({
    page = 1,
    limit = 20,
    order = orderEnum.ASC,
    column = technicianColumnTypesEnum.NAME,
    search,
    userId,
  }: IPaginationParams<TTechnicianColumnTypes>): Promise<
    HttpResponse<IPaginationResponse<TechnicianResponseDTO>>
  > {
    const offset = (page - 1) * limit;

    try {
      const technicians = await prisma.technician.findMany({
        select: {
          id: true,
          name: true,
          cpf: true,
          phone: true,
          status: true,
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
          position: true,
          updated_at: true,
        },
        where: {
          userId,
          name: {
            mode: "insensitive",
            contains: search,
          },
        },
        orderBy: { [column]: order },
        take: limit,
        skip: offset,
      });

      const totalTechnicians = await prisma.technician.count();

      if (technicians.length === 0) {
        return contentNotFound("Técnicos");
      }

      return ok(
        paginationResponseMount<TechnicianResponseDTO>({
          data: technicians,
          page,
          limit,
          totalItems: totalTechnicians,
        })
      );
    } catch (error) {
      return serverError(error);
    }
  }
}
