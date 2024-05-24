import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";
import { AttachSignatureUseCase } from "./AttachSignatureUseCase";
import { IUploadedFile } from "@modules/serviceOrder/dtos/AttachSignatureDTO";

export class AttachSignatureController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    const { id } = req.params;

    const attachSignatureUseCase = new AttachSignatureUseCase();

    try {
      const result = await attachSignatureUseCase.execute({
        serviceOrderId: Number(id),
        signatureImage: req.file as IUploadedFile,
        companyId: Number(companyId),
      });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
