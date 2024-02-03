import { Request, Response } from "express";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";

export class GetUserByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);
    const getUserByIdUseCase = new GetUserByIdUseCase();

    try {
      const result = await getUserByIdUseCase.execute(Number(id));
      return res.status(200).json(result);
    } catch (e) {
      res.status(404).json(e);
    }
  }
}
