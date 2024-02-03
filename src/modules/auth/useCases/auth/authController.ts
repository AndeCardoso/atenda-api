import { Request, Response } from "express";
import { AuthUseCase } from "./authUseCase";

export class AuthController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUseCase = new AuthUseCase();

    try {
      const result = await authUseCase.execute({ email, password });
      return res.status(200).json(result);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
