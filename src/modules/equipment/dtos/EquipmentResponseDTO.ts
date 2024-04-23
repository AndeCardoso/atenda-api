import { equipmentStatusEnum } from "../constants";

export interface EquipmentResponseDTO {
  customerId: number;
  nickname?: string | null;
  brand: string;
  model: string;
  serialNumber?: string | null;
  description?: string | null;
  voltage?: string | null;
  color?: string | null;
  accessories?: string | null;
  status: equipmentStatusEnum;
  created_at?: Date | null;
  updated_at?: Date | null;
}
