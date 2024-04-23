import { prisma } from "@prismaClient/client";
import { contentNotFound, created, serverError } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { CreateEquipmentDTO } from "@modules/equipment/dtos/CreateEquipmentDTO";
import { EquipmentResponseDTO } from "@modules/equipment/dtos/EquipmentResponseDTO";

export class CreateEquipmentUseCase {
  async execute({
    customerId,
    nickname,
    brand,
    model,
    description,
    serialNumber,
    voltage,
    accessories,
    color,
    status,
    userId,
  }: CreateEquipmentDTO): Promise<HttpResponse<EquipmentResponseDTO>> {
    const customer = await prisma.customer.findFirst({
      where: {
        userId,
        id: customerId,
      },
    });

    if (!customer) {
      return contentNotFound("Cliente");
    }

    try {
      const newEquipment = await prisma.equipment.create({
        data: {
          customerId: customer?.id,
          nickname,
          brand,
          model,
          description,
          serialNumber,
          voltage,
          accessories,
          color,
          status,
        },
      });

      return created({
        id: newEquipment.id,
        nickname: newEquipment.nickname,
        brand: newEquipment.brand,
        model: newEquipment.model,
        description: newEquipment.description,
        serialNumber: newEquipment.serialNumber,
        voltage: newEquipment.voltage,
        accessories: newEquipment.accessories,
        color: newEquipment.color,
        status: newEquipment.status,
        updated_at: newEquipment.updated_at,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
