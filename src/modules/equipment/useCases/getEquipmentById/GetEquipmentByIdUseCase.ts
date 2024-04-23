import { contentNotFound, ok } from "@helper/http/httpHelper";
import { prisma } from "@prismaClient/client";
import { HttpResponse } from "@shared/protocols/http";
import { EquipmentResponseDTO } from "@modules/equipment/dtos/EquipmentResponseDTO";

export class GetEquipmentByIdUseCase {
  async execute(id: number): Promise<HttpResponse<EquipmentResponseDTO>> {
    const equipment = await prisma.equipment.findUnique({
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
      where: { id },
    });

    if (!equipment) {
      return contentNotFound("Equipamento");
    }

    return ok(equipment);
  }
}
