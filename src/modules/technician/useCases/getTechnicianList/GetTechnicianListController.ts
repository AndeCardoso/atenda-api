import { Request, Response } from "express";
import { IPaginationParams, orderEnum } from "@shared/types/pagination.type";
import { TTechnicianColumnTypes } from "../../constants/paramsType";
import { GetTechnicianListUseCase } from "./GetTechnicianListUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class GetTechnicianListController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { id } = JSON.parse(userPayload!!);

    const { page, limit, order, column, search } =
      req.query as IPaginationParams<TTechnicianColumnTypes>;

    const getAllTechniciansUseCase = new GetTechnicianListUseCase();

    try {
      const result = await getAllTechniciansUseCase.execute({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        order: order || orderEnum.ASC,
        column: column || "name",
        search: search,
        userId: Number(id),
      });

      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
