import { Request, Response } from "express";
import { orderEnum } from "@shared/types/pagination.type";
import { Result, validationResult } from "express-validator";
import { GetEquipmentListUseCase } from "./GetEquipmentListUseCase";
import { ParamsError } from "@errors/ParamError";
import { GetEquipmentListRequestDTO } from "@modules/equipment/dtos/GetEquipmentListRequestDTO";

export class GetEquipmentListController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    const { customerId, page, limit, order, column, search } =
      req.query as unknown as GetEquipmentListRequestDTO;

    const getAllEquipmentsUseCase = new GetEquipmentListUseCase();

    try {
      const result = await getAllEquipmentsUseCase.execute({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        order: order || orderEnum.ASC,
        column: column || "nickname",
        search: search,
        customerId: Number(customerId),
        companyId: Number(companyId),
      });

      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
