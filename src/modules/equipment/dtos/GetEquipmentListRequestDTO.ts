import { IPaginationParams } from "@shared/types/pagination.type";
import {
  TEquipmentColumnTypes,
  TEquipmentSearchTypes,
} from "../constants/paramsType";

export interface GetEquipmentListRequestDTO
  extends IPaginationParams<TEquipmentColumnTypes> {
  searchType: TEquipmentSearchTypes;
  customerId?: number;
}
