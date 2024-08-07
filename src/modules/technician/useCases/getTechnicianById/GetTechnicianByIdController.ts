import { Request, Response } from "express";
import { GetTechnicianByIdUseCase } from "./GetTechnicianByIdUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class GetTechnicianByIdController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    const { id } = req.params;

    const getTechnicianByIdUseCase = new GetTechnicianByIdUseCase();

    try {
      const result = await getTechnicianByIdUseCase.execute(
        Number(id),
        Number(companyId)
      );
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
