import { Request, Response } from "express";
import { RecoverPasswordUseCase } from "./recoverPasswordUseCase";

export class RecoverPasswordController {
  async handle(req: Request, res: Response) {
    const { email, password, token } = req.body;

    const recoverPasswordUseCase = new RecoverPasswordUseCase();

    try {
      const result = await recoverPasswordUseCase.execute({
        email,
        password,
        token,
      });
      return res.status(200).json(result);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
