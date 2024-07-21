import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }
    const userPayload = req.headers.user as string;
    const { id: userId } = JSON.parse(userPayload!!);

    const { id } = req.params;
    const body = req.body;

    const updateUserUseCase = new UpdateUserUseCase();

    try {
      const result = await updateUserUseCase.execute(
        Number(id),
        Number(userId),
        body
      );
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
