import { Request, Response } from "express";
import { orderEnum } from "@shared/types/pagination.type";
import { GetServiceOrderListUseCase } from "./GetServiceOrderListUseCase";
import { Result, validationResult } from "express-validator";
import { ParamsError } from "@errors/ParamError";
import { IPaginationSOParams } from "@modules/serviceOrder/dtos/ServiceOrderListDTO";

export class GetServiceOrderListController {
  async handle(req: Request, res: Response) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ParamsError(errors));
    }

    const userPayload = req.headers.user as string;
    const { companyId } = JSON.parse(userPayload!!);

    const {
      page,
      limit,
      order,
      column,
      search,
      customer,
      equipment,
      technician,
      status,
    } = req.query as IPaginationSOParams;

    const getAllServiceOrdersUseCase = new GetServiceOrderListUseCase();

    try {
      const result = await getAllServiceOrdersUseCase.execute({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        order: order || orderEnum.ASC,
        column: column || "id",
        search: search,
        status,
        companyId: Number(companyId),
        customer: customer ? Number(customer) : undefined,
        equipment: equipment ? Number(equipment) : undefined,
        technician: technician ? Number(technician) : undefined,
      });

      return res.status(result.statusCode).json(result.body);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
