import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";
import { GetPdfReportUseCase } from "./GetPdfReportUseCase";

export class GetPdfReportController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    const { id } = req.params;

    const getPdfReportUseCase = new GetPdfReportUseCase();

    try {
      const result = await getPdfReportUseCase.execute(
        Number(id),
        Number(companyId)
      );
      return res
        .setHeader("Content-Type", "application/pdf")
        .status(result.statusCode)
        .json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
