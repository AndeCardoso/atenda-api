import { prisma } from "@prismaClient/client";
import { ok, serverError } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { differenceInDays } from "date-fns";
import { AdvertiseResponseDTO } from "@modules/home/dtos/advertise/AdvertiseResponseDTO";
import { DAY_TRIAL_EXPIRATION } from "src/config/access";

export class AdvertiseUseCase {
  async execute(id: number): Promise<HttpResponse<AdvertiseResponseDTO>> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return serverError("Erro inesperado");
    }

    const company = await prisma.company.findFirst({
      where: {
        id: user.companyId,
      },
    });

    if (!company) {
      return serverError("Erro inesperado");
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
