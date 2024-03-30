import { Request, Response } from "express";
import { IPaginationParams, orderEnum } from "@shared/types/pagination.type";
import { TTechnicianColumnTypes } from "./paramsType";
import { GetTechnicianListUseCase } from "./GetTechnicianListUseCase";
import { validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";

export class GetTechnicianListController {
  async handle(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

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
      });

      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
