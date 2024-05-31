import { prisma } from "@prismaClient/client";
import {
  IPaginationResponse,
  paginationResponseMount,
} from "@utils/paginationResponseMount";
import { orderEnum } from "@shared/types/pagination.type";
import { serviceOrderColumnTypesEnum } from "../../constants/paramsType";
import { ServiceOrderResponseDTO } from "@modules/serviceOrder/dtos/ServiceOrderResponseDTO";
import { contentNotFound, ok, serverError } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { IPaginationSOParams } from "@modules/serviceOrder/dtos/ServiceOrderListDTO";

export class GetServiceOrderListUseCase {
  async execute({
    page = 1,
    limit = 20,
    order = orderEnum.ASC,
    column = serviceOrderColumnTypesEnum.ID,
    search,
    customer,
    equipment,
    technician,
    companyId,
  }: IPaginationSOParams): Promise<
    HttpResponse<IPaginationResponse<ServiceOrderResponseDTO>>
  > {
    const offset = (page - 1) * limit;

    try {
      const serviceOrders = await prisma.serviceOrder.findMany({
        select: {
          id: true,
          selectedVoltage: true,
          reportedDefect: true,
          foundDefect: true,
          orderedServices: true,
          executedServices: true,
          observations: true,
          signatureUrl: true,
          opened_at: true,
          closed_at: true,
          totalValue: true,
          status: true,
          address: {
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
          },
          customer: {
            select: {
              id: true,
              name: true,
              document: true,
              phone: true,
              secondPhone: true,
              email: true,
              status: true,
              updated_at: true,
            },
          },
          equipment: {
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
          },
          technician: {
            select: {
              id: true,
              name: true,
              cpf: true,
              phone: true,
              status: true,
              position: true,
              updated_at: true,
            },
          },
          updated_at: true,
          created_at: true,
        },
        where: {
          companyId,
          customerId: customer,
          equipmentId: equipment,
          technicianId: technician,
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

      const totalServiceOrders = serviceOrders.length;

      if (serviceOrders.length === 0) {
        return contentNotFound("Ordens de serviço");
      }

      return ok(
        paginationResponseMount<ServiceOrderResponseDTO>({
          data: serviceOrders,
          page,
          limit,
          totalItems: totalServiceOrders,
        })
      );
    } catch (error) {
      return serverError(error);
    }
  }
}
