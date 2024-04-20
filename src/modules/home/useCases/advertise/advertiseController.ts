import { Request, Response } from "express";
import { AdvertiseUseCase } from "./advertiseUseCase";

export class AdvertiseController {
  async handle(req: Request, res: Response) {
    const advertiseUseCase = new AdvertiseUseCase();

    const userPayload = req.headers.user as string;
    const { id } = JSON.parse(userPayload!!);

    try {
      const result = await advertiseUseCase.execute(id);
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
