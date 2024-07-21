import { IPaginationParams } from "@shared/types/pagination.type";
import { TServiceOrderColumnTypes } from "../constants/paramsType";

export interface IPaginationSOParams
  extends IPaginationParams<TServiceOrderColumnTypes> {
  customer?: number;
  equipment?: number;
  technician?: number;
}
