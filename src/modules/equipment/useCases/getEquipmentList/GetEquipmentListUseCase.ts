import { prisma } from "@prismaClient/client";
import {
  IPaginationResponse,
  paginationResponseMount,
} from "@utils/paginationResponseMount";
import { orderEnum } from "@shared/types/pagination.type";
import { equipmentColumnTypesEnum } from "../../constants/paramsType";
import { contentNotFound, ok, serverError } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { EquipmentResponseDTO } from "@modules/equipment/dtos/EquipmentResponseDTO";
import { GetEquipmentListRequestDTO } from "@modules/equipment/dtos/GetEquipmentListRequestDTO";
import { convertStringToNumberArray } from "@utils/convertStringToNumberArray";

export class GetEquipmentListUseCase {
  async execute({
    page = 1,
    limit = 20,
    order = orderEnum.ASC,
    column = equipmentColumnTypesEnum.NICKNAME,
    search,
    searchType,
    status,
    companyId,
    customerId,
  }: GetEquipmentListRequestDTO): Promise<
    HttpResponse<IPaginationResponse<EquipmentResponseDTO>>
  > {
    try {
      const offset = (page - 1) * limit;

      const statusNumber = convertStringToNumberArray(status);

      const equipments = await prisma.equipment.findMany({
        select: {
          id: true,
          customerId: true,
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
          customer: {
            select: {
              name: true,
            },
          },
        },
        where: {
          companyId,
          ...(customerId && { customerId }),
          ...(statusNumber &&
            statusNumber.length > 0 && {
              status: {
                in: statusNumber,
              },
            }),
          customer: {
            name: {
              mode: "insensitive",
              contains: search,
            },
          },
        },
        orderBy: { [column]: order },
        take: limit,
        skip: offset,
      });

      const totalEquipments = equipments.length;

      if (equipments.length === 0) {
        return contentNotFound("Equipamentos");
      }

      return ok(
        paginationResponseMount<EquipmentResponseDTO>({
          data: equipments,
          page,
          limit,
          totalItems: totalEquipments,
        })
      );
    } catch (error) {
      return serverError(error);
    }
  }
}
