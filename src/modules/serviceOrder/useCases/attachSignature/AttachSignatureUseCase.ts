import { prisma } from "@prismaClient/client";
import {
  badRequest,
  contentNotFound,
  created,
  serverError,
} from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { AttachSignatureDTO } from "@modules/serviceOrder/dtos/AttachSignatureDTO";
import { AttachSignatureResponseDTO } from "@modules/serviceOrder/dtos/AttachSignatureResponseDTO";

export class AttachSignatureUseCase {
  async execute({
    serviceOrderId,
    signatureImage,
    companyId,
  }: AttachSignatureDTO): Promise<HttpResponse<AttachSignatureResponseDTO>> {
    try {
      const serviceOrder = await prisma.serviceOrder.update({
        where: { companyId, id: serviceOrderId },
        data: {
          signatureUrl: signatureImage.path,
        },
        select: {
          signatureUrl: true,
        },
      });

      if (!serviceOrder) {
        return badRequest("Ordem de serviço não encontrado");
      }

      return created({ url: signatureImage.path });
    } catch (error) {
      return serverError(error);
    }
  }
}
