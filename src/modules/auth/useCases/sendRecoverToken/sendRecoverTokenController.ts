import { Request, Response } from "express";
import { SendRecoverTokenUseCase } from "./sendRecoverTokenUseCase";
import { Result, validationResult } from "express-validator";

export class SendRecoverTokenController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { email } = req.body;

    const sendRecoverTokenUseCase = new SendRecoverTokenUseCase();

    try {
      const result = await sendRecoverTokenUseCase.execute({ email });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
