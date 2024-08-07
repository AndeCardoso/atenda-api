import { Request, Response } from "express";
import { IPaginationParams, orderEnum } from "@shared/types/pagination.type";
import { GetListUsersUseCase } from "./GetListUsersUseCase";
import { TUserColumnTypes } from "./paramsType";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class GetListUsersController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const { page, limit, order, column, search } =
      req.query as IPaginationParams<TUserColumnTypes>;

    const userPayload = req.headers.user as string;
    const { id } = JSON.parse(userPayload!!);

    const getAllUsersUseCase = new GetListUsersUseCase();

    try {
      const result = await getAllUsersUseCase.execute({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        order: order || orderEnum.ASC,
        column: column || "name",
        search,
        userId: id,
      });
      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
