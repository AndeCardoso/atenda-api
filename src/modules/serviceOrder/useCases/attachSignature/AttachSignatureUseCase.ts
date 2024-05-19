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
  }: AttachSignatureDTO): Promise<HttpResponse<AttachSignatureResponseDTO>> {
    try {
      console.log({ serviceOrderId, signatureImage });
      return created({ url: "http://issoeumteste.com/image-de-teste.jpeg" });
    } catch (error) {
      return serverError(error);
    }
  }
}
