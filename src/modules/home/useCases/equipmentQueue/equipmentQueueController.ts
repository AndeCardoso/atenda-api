import { Request, Response } from "express";
import { EquipmentQueueUseCase } from "./equipmentQueueUseCase";

export class EquipmentQueueController {
  async handle(req: Request, res: Response) {
    const equipmentQueueUseCase = new EquipmentQueueUseCase();

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    try {
      const result = await equipmentQueueUseCase.execute(companyId);
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
