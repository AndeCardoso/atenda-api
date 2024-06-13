import { Request, Response } from "express";
import { ServiceOrderDatasUseCase } from "./serviceOrderDatasUseCase";

export class ServiceOrderDatasController {
  async handle(req: Request, res: Response) {
    const serviceOrderDatasUseCase = new ServiceOrderDatasUseCase();

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    try {
      const result = await serviceOrderDatasUseCase.execute(companyId);
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
