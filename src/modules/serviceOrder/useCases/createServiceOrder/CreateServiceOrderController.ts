import { Request, Response } from "express";
import { CreateServiceOrderUseCase } from "./CreateServiceOrderUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class CreateServiceOrderController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    const createServiceOrderUseCase = new CreateServiceOrderUseCase();

    try {
      const result = await createServiceOrderUseCase.execute({
        ...req.body,
        companyId: Number(companyId),
      });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
