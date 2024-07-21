import { Request, Response } from "express";
import { GetServiceOrderByIdUseCase } from "./GetServiceOrderByIdUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class GetServiceOrderByIdController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    const { id } = req.params;

    const getServiceOrderByIdUseCase = new GetServiceOrderByIdUseCase();

    try {
      const result = await getServiceOrderByIdUseCase.execute(
        Number(id),
        Number(companyId)
      );
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
