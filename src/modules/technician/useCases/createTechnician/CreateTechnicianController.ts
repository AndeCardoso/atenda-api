import { Request, Response } from "express";
import { CreateTechnicianUseCase } from "./CreateTechnicianUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class CreateTechnicianController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { id } = JSON.parse(userPayload!!);

    const createTechnicianUseCase = new CreateTechnicianUseCase();

    try {
      const result = await createTechnicianUseCase.execute({
        ...req.body,
        userId: Number(id),
      });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
