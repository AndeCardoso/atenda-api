import { Request, Response } from "express";
import { RecoverPasswordUseCase } from "./recoverPasswordUseCase";
import { validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class RecoverPasswordController {
  async handle(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const { email, password, token } = req.body;

    const recoverPasswordUseCase = new RecoverPasswordUseCase();

    try {
      const result = await recoverPasswordUseCase.execute({
        email,
        password,
        token,
      });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
