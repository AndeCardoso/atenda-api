import { Request, Response } from "express";
import { UpdateEquipmentUseCase } from "./UpdateEquipmentUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class UpdateEquipmentController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const { id } = req.params;
    const body = req.body;

    const updateEquipmentUseCase = new UpdateEquipmentUseCase();

    try {
      const result = await updateEquipmentUseCase.execute(Number(id), body);
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
