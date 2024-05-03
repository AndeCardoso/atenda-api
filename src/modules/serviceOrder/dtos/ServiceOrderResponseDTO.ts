import { address } from "@shared/types/address.type";
import { serviceOrderStatusEnum } from "../constants";
import { TechnicianResponseDTO } from "@modules/technician/dtos/TechnicianResponseDTO";
import { CustomerResponseDTO } from "@modules/customer/dtos/CustomerResponseDTO";
import { EquipmentResponseDTO } from "@modules/equipment/dtos/EquipmentResponseDTO";

export interface ServiceOrderResponseDTO {
  id: number;
  selectedVoltage: string;
  reportedDefect: string;
  foundDefect?: string | null;
  orderedServices: string;
  executedServices?: string | null;
  observations?: string | null;
  status: serviceOrderStatusEnum;
  technician: Partial<CustomerResponseDTO>;
  customer: Partial<TechnicianResponseDTO>;
  equipment: Partial<EquipmentResponseDTO>;
  address: Partial<address>;
  closed_at?: Date | null;
  updated_at: Date;
  created_at: Date;
}
