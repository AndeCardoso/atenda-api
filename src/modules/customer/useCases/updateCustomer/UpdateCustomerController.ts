import { Request, Response } from "express";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class UpdateCustomerController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }
    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    const { id } = req.params;
    const body = req.body;

    const updateCustomerUseCase = new UpdateCustomerUseCase();

    try {
      const result = await updateCustomerUseCase.execute(
        Number(id),
        Number(companyId),
        body
      );
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
