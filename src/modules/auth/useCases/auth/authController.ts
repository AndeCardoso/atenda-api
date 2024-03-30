import { Request, Response } from "express";
import { AuthUseCase } from "./authUseCase";
import { validationResult } from "express-validator";
import { serverError } from "@helper/http/httpHelper";
import { ParamsError } from "@errors/ParamError";

export class AuthController {
  async handle(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const { email, password } = req.body;

    const authUseCase = new AuthUseCase();

    try {
      const result = await authUseCase.execute({ email, password });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
