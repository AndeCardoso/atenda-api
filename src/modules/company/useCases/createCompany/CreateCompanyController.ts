import { Request, Response } from "express";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class CreateCompanyController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const createCompanyUseCase = new CreateCompanyUseCase();

    try {
      const result = await createCompanyUseCase.execute(req.body);
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
