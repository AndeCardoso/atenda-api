import { Request, Response } from "express";
import { SendRecoverTokenUseCase } from "./sendRecoverTokenUseCase";

export class SendRecoverTokenController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;

    const sendRecoverTokenUseCase = new SendRecoverTokenUseCase();

    try {
      const result = await sendRecoverTokenUseCase.execute({ email });
      return res.status(200).json(result);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
