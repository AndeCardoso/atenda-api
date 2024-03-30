import { Request, Response } from "express";
import { CreateTechnicianUseCase } from "./CreateTechnicianUseCase";
import { validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class CreateTechnicianController {
  async handle(req: Request, res: Response) {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const {
      name,
      cpf,
      phone,
      position,
      cep,
      street,
      number,
      complement,
      district,
      state,
      city,
    } = req.body;

    const createTechnicianUseCase = new CreateTechnicianUseCase();

    try {
      const result = await createTechnicianUseCase.execute({
        name,
        cpf,
        phone,
        position,
        address: {
          cep,
          street,
          number,
          complement,
          district,
          state,
          city,
        },
      });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
