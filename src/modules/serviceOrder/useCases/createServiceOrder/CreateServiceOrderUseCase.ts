import { prisma } from "@prismaClient/client";
import { CreateServiceOrderDTO } from "@modules/serviceOrder/dtos/CreateServiceOrderDTO";
import { ServiceOrderResponseDTO } from "@modules/serviceOrder/dtos/ServiceOrderResponseDTO";
import {
  equipmentsStatusBySoStatus,
  serviceOrderStatusEnum,
} from "@modules/serviceOrder/constants";
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
    status = serviceOrderStatusEnum.OPENED,
    signatureUrl,
    openedAt,
    closedAt,
    totalValue,
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
      let address;
      if (!addressId) {
        address = await prisma.address.create({
          data: {
            nickname,
            cep: cep!!,
            street: street!!,
            number: number!!,
            complement,
            district: district!!,
            state: state!!,
            city: city!!,
          },
        });

        const customer = await prisma.customer.findUnique({
          where: { companyId, id: customerId },
          select: {
            id: true,
            addressesId: true,
          },
        });

        if (customer) {
          const concatAddressesId = [...customer.addressesId];
          concatAddressesId.push(address.id);

          await prisma.customer.update({
            where: { companyId, id: customer.id },
            data: {
              addressesId: concatAddressesId,
            },
          });
        }
      } else {
        address = await prisma.address.findUnique({
          select: {
            id: true,
            nickname: true,
            cep: true,
            complement: true,
            district: true,
            street: true,
            number: true,
            state: true,
            city: true,
          },
          where: {
            id: addressId,
          },
        });
      }

      if (!address) {
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

      const currentEquipment = await prisma.equipment.findUnique({
        select: {
          id: true,
        },
        where: { companyId, id: equipmentId },
      });

      if (!currentEquipment) {
        return contentNotFound("Equipamento");
      }

      const equipment = await prisma.equipment.update({
        where: { id: equipmentId, companyId },
        data: {
          status: equipmentsStatusBySoStatus[status],
        },
      });

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
          status,
          selectedVoltage,
          reportedDefect,
          foundDefect,
          orderedServices,
          executedServices,
          observations,
          opened_at: openedAt,
          closed_at: closedAt,
          totalValue,
          signatureUrl,
          customerId,
          equipmentId,
          technicianId,
          addressId: address.id,
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
        closedAt: newServiceOrder.closed_at,
        openedAt: newServiceOrder.opened_at,
        totalValue: newServiceOrder.totalValue,
        signatureUrl: newServiceOrder.signatureUrl,
        address,
        customer,
        equipment,
        technician,
        updatedAt: newServiceOrder.updated_at,
        createdAt: newServiceOrder.created_at,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
