import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const { name, email, password } = req.body;
    const createUserUseCase = new CreateUserUseCase();

    try {
      const result = await createUserUseCase.execute({ name, email, password });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
