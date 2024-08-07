import { Request, Response } from "express";
import { AuthUseCase } from "./authUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class AuthController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const { email, password } = req.body;

    const authUseCase = new AuthUseCase();

    try {
      const result = await authUseCase.execute({ email, password });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
