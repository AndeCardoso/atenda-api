import { Request, Response } from "express";
import { ServiceOrderOpenedUseCase } from "./serviceOrderOpenedUseCase";

export class ServiceOrderOpenedController {
  async handle(req: Request, res: Response) {
    const serviceOrderOpenedUseCase = new ServiceOrderOpenedUseCase();

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    try {
      const result = await serviceOrderOpenedUseCase.execute(companyId);
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
