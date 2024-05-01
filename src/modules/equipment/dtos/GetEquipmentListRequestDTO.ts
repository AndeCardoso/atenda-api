import { IPaginationParams } from "@shared/types/pagination.type";
import { TEquipmentColumnTypes } from "../constants/paramsType";

export interface GetEquipmentListRequestDTO
  extends IPaginationParams<TEquipmentColumnTypes> {
  customerId: number;
}
