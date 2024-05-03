import { Request, Response } from "express";
import { IPaginationParams, orderEnum } from "@shared/types/pagination.type";
import { TServiceOrderColumnTypes } from "../../constants/paramsType";
import { GetServiceOrderListUseCase } from "./GetServiceOrderListUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class GetServiceOrderListController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    const { page, limit, order, column, search } =
      req.query as IPaginationParams<TServiceOrderColumnTypes>;

    const getAllServiceOrdersUseCase = new GetServiceOrderListUseCase();

    try {
      const result = await getAllServiceOrdersUseCase.execute({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        order: order || orderEnum.ASC,
        column: column || "id",
        search: search,
        companyId: Number(companyId),
      });

      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
