import { Request, Response } from "express";
import { GetCustomerByIdUseCase } from "./GetCustomerByIdUseCase";
import { validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class GetCustomerByIdController {
  async handle(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { id: userId } = JSON.parse(userPayload!!);

    const { id } = req.params;

    const getCustomerByIdUseCase = new GetCustomerByIdUseCase();

    try {
      const result = await getCustomerByIdUseCase.execute(
        Number(id),
        Number(userId)
      );
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
