import { Request, Response } from "express";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";
import { validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class GetUserByIdController {
  async handle(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const { id } = req.params;
    const userPayload = req.headers.user as string;
    const { id: userId } = JSON.parse(userPayload!!);

    const getUserByIdUseCase = new GetUserByIdUseCase();

    try {
      const result = await getUserByIdUseCase.execute(
        Number(id),
        Number(userId)
      );
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
