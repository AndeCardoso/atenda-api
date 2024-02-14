import { Request, Response } from "express";
import { GetListUsersUseCase } from "./GetListUsersUseCase";
import { IGetListUsersParams, orderEnum } from "./paramsType";

export class GetListUsersController {
  async handle(req: Request, res: Response) {
    const { page, limit, order, column } = req.query as IGetListUsersParams;

    const getAllUsersUseCase = new GetListUsersUseCase();

    try {
      const result = await getAllUsersUseCase.execute({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        order: order || orderEnum.ASC,
        column: column || "name",
      });
      return res.status(200).json(result);
    } catch (e) {
      res.status(404).json(e);
    }
  }
}
