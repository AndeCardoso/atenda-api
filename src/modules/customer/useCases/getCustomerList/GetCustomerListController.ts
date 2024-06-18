import { Request, Response } from "express";
import { IPaginationParams, orderEnum } from "@shared/types/pagination.type";
import { TCustomerColumnTypes } from "../../constants/paramsType";
import { GetCustomerListUseCase } from "./GetCustomerListUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class GetCustomerListController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    const { page, limit, order, column, search, status } =
      req.query as IPaginationParams<TCustomerColumnTypes>;

    const getAllCustomersUseCase = new GetCustomerListUseCase();

    try {
      const result = await getAllCustomersUseCase.execute({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        order: order || orderEnum.ASC,
        column: column || "name",
        search,
        status: Number(status) ?? undefined,
        companyId: Number(companyId),
      });

      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
