import { contentNotFound, ok } from "@helper/http/httpHelper";
import { prisma } from "@prismaClient/client";
import { HttpResponse } from "@shared/protocols/http";
import { CreateEquipmentDTO } from "@modules/equipment/dtos/CreateEquipmentDTO";
import { EquipmentResponseDTO } from "@modules/equipment/dtos/EquipmentResponseDTO";

export class UpdateEquipmentUseCase {
  async execute(
    id: number,
    companyId: number,
    data: CreateEquipmentDTO
  ): Promise<HttpResponse<EquipmentResponseDTO>> {
    try {
      const currentEquipment = await prisma.equipment.findFirst({
        where: {
          id,
          customerId: data.customerId,
          companyId,
        },
      });

      if (!currentEquipment) {
        return contentNotFound("Equipamento");
      }

      const equipment = await prisma.equipment.update({
        where: { id, customerId: data.customerId, companyId },
        data: {
          nickname: data.nickname,
          brand: data.brand,
          model: data.model,
          description: data.description,
          serialNumber: data.serialNumber,
          voltage: data.voltage,
          accessories: data.accessories,
          color: data.color,
          status: data.status,
        },
      });

      return ok(equipment);
    } catch (error) {
      return contentNotFound("Equipamento");
    }
  }
}
