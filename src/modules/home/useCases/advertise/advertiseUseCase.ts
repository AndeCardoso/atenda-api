import { prisma } from "@prismaClient/client";
import { contentNotFound, ok, serverError } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { differenceInDays } from "date-fns";
import { AdvertiseResponseDTO } from "@modules/home/dtos/advertise/AdvertiseResponseDTO";
import { DAY_TRIAL_EXPIRATION } from "@config/access";
import { companyStatusEnum } from "@modules/company/constants";

export class AdvertiseUseCase {
  async execute(id: number): Promise<HttpResponse<AdvertiseResponseDTO>> {
    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    });

    if (!company) {
      return serverError("Erro inesperado");
    }

    if (company.status === companyStatusEnum.OK) {
      return contentNotFound("Alerta");
    }

    const remainDays =
      DAY_TRIAL_EXPIRATION -
      differenceInDays(new Date(), new Date(company.created_at));
    let response;

    if (remainDays === 1) {
      response = {
        message: `Sua licença gratuita expira amanhã, entre em contato para contratar!`,
      };
    } else {
      response = {
        message: `Faltam ${remainDays} dias para sua licença gratuita expirar!`,
      };
    }

    return ok(response);
  }
}
