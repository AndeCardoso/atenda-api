import { Request, Response } from "express";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class CreateCustomerController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { id } = JSON.parse(userPayload!!);

    const createCustomerUseCase = new CreateCustomerUseCase();

    try {
      const result = await createCustomerUseCase.execute({
        ...req.body,
        userId: Number(id),
      });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
