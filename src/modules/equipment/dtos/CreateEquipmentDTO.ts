import { equipmentStatusEnum } from "../constants";
import { IUserRequest } from "@shared/types/pagination.type";

export interface CreateEquipmentDTO extends IUserRequest {
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
