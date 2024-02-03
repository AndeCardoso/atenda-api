import { Request, Response } from "express";
import { GetListUsersUseCase } from "./GetListUsersUseCase";
import { IGetListUsersParams, orderEnum } from "./paramsType";
import { getListUsersParamsValidation } from "@modules/user/validator/userParamsValidations";

export class GetListUsersController {
  async handle(req: Request, res: Response) {
    const { page, limit, order, column } = req.query as IGetListUsersParams;
    const errors = getListUsersParamsValidation({ page, limit, order, column });
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const getAllUsersUseCase = new GetListUsersUseCase();

    try {
      const result = await getAllUsersUseCase.execute({
        page: Number(page),
        limit: Number(limit),
        order: order || orderEnum.ASC,
        column: column,
      });
      return res.status(200).json(result);
    } catch (e) {
      res.status(404).json(e);
    }
  }
}
