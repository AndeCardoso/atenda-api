import { prisma } from "@prismaClient/client";
import { CreateServiceOrderDTO } from "@modules/serviceOrder/dtos/CreateServiceOrderDTO";
import { ServiceOrderResponseDTO } from "@modules/serviceOrder/dtos/ServiceOrderResponseDTO";
import { serviceOrderStatusEnum } from "@modules/serviceOrder/constants";
import {
  badRequest,
  contentNotFound,
  created,
  serverError,
} from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";

export class CreateServiceOrderUseCase {
  async execute({
    selectedVoltage,
    reportedDefect,
    foundDefect,
    orderedServices,
    executedServices,
    observations,
    status,
    closedAt,
    companyId,
    customerId,
    equipmentId,
    technicianId,
    addressId,
    nickname,
    cep,
    street,
    number,
    complement,
    district,
    state,
    city,
  }: CreateServiceOrderDTO): Promise<HttpResponse<ServiceOrderResponseDTO>> {
    try {
      let newAddress;
      if (!addressId) {
        newAddress = await prisma.address.create({
          data: {
            nickname,
            cep: cep!!,
            street: street!!,
            number: number!!,
            complement: complement!!,
            district: district!!,
            state: state!!,
            city: city!!,
          },
        });
      }

      const newAddressId = addressId || newAddress?.id;

      if (!newAddressId) {
        return badRequest(
          "Endereço é obrigatório para cadastro de ordem de serviço"
        );
      }

      const customer = await prisma.customer.findUnique({
        select: {
          id: true,
          name: true,
          document: true,
          phone: true,
          secondPhone: true,
          email: true,
          status: true,
          addressesId: true,
          updated_at: true,
        },
        where: { companyId, id: customerId },
      });

      if (!customer) {
        return contentNotFound("Cliente");
      }

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
        where: { companyId, id: equipmentId },
      });

      if (!equipment) {
        return contentNotFound("Equipamento");
      }

      const technician = await prisma.technician.findUnique({
        select: {
          id: true,
          name: true,
          cpf: true,
          phone: true,
          status: true,
          position: true,
          updated_at: true,
        },
        where: { companyId, id: technicianId },
      });

      if (!technician) {
        return contentNotFound("Técnico");
      }

      const newServiceOrder = await prisma.serviceOrder.create({
        data: {
          status: status ?? serviceOrderStatusEnum.OPENED,
          selectedVoltage,
          reportedDefect,
          foundDefect,
          orderedServices,
          executedServices,
          observations,
          customerId,
          equipmentId,
          technicianId,
          addressId: newAddressId,
          closed_at: closedAt,
          companyId,
        },
      });

      return created({
        id: newServiceOrder.id,
        selectedVoltage: newServiceOrder.selectedVoltage,
        reportedDefect: newServiceOrder.reportedDefect,
        foundDefect: newServiceOrder.foundDefect,
        orderedServices: newServiceOrder.orderedServices,
        executedServices: newServiceOrder.executedServices,
        observations: newServiceOrder.observations,
        status: newServiceOrder.status,
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
        customer,
        equipment,
        technician,
        closedAt: newServiceOrder.closed_at,
        updatedAt: newServiceOrder.updated_at,
        createdAt: newServiceOrder.created_at,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
