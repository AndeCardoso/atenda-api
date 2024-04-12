import { Request, Response } from "express";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";
import { validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class CreateCompanyController {
  async handle(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const { companyName, name, email, password } = req.body;

    const createCompanyUseCase = new CreateCompanyUseCase();

    try {
      const result = await createCompanyUseCase.execute({
        companyName,
        email,
        name,
        password,
      });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
