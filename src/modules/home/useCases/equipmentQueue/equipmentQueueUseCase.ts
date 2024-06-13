import { prisma } from "@prismaClient/client";
import { contentNotFound, ok, serverError } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { equipmentStatusEnum } from "@modules/equipment/constants";
import { EquipmentResponseDTO } from "@modules/equipment/dtos/EquipmentResponseDTO";

export class EquipmentQueueUseCase {
  async execute(id: number): Promise<HttpResponse<EquipmentResponseDTO>> {
    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    });

    if (!company) {
      return serverError("Erro inesperado");
    }

    const equipmentQueue = await prisma.equipment.findMany({
      select: {
        id: true,
        customerId: true,
        nickname: true,
        brand: true,
        model: true,
        voltage: true,
        status: true,
        updated_at: true,
      },
      where: {
        companyId: company.id,
        OR: [
          {
            status: equipmentStatusEnum.IN_LINE,
          },
          {
            status: equipmentStatusEnum.ON_BENCH,
          },
        ],
      },
      orderBy: { updated_at: "asc" },
      take: 10,
    });

    if (!equipmentQueue) {
      return contentNotFound("Equipamentos");
    }

    return ok(equipmentQueue);
  }
}
