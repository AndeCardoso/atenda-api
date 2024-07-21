import { equipmentStatusEnum } from "../constants";
import { ICompanyRequest } from "@shared/types/pagination.type";

export interface CreateEquipmentDTO extends ICompanyRequest {
  customerId: number;
  nickname?: string;
  brand: string;
  model: string;
  serialNumber?: string;
  description?: string;
  voltage?: string;
  color?: string;
  accessories?: string;
  status: equipmentStatusEnum;
}
