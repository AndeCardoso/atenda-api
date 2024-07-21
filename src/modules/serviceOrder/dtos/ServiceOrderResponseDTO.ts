import { address } from "@shared/types/address.type";
import { serviceOrderStatusEnum } from "../constants";
import { TechnicianResponseDTO } from "@modules/technician/dtos/TechnicianResponseDTO";
import { CustomerResponseDTO } from "@modules/customer/dtos/CustomerResponseDTO";
import { EquipmentResponseDTO } from "@modules/equipment/dtos/EquipmentResponseDTO";
import { Decimal } from "@prisma/client/runtime/library";

export interface ServiceOrderResponseDTO {
  id: number;
  selectedVoltage: string;
  reportedDefect: string;
  foundDefect?: string | null;
  orderedServices: string;
  executedServices?: string | null;
  observations?: string | null;
  opened_at: Date;
  closed_at?: Date | null;
  totalValue?: number | Decimal | null;
  signatureUrl?: string | null;
  status: serviceOrderStatusEnum;
  technician: Partial<CustomerResponseDTO>;
  customer: Partial<TechnicianResponseDTO>;
  equipment: Partial<EquipmentResponseDTO>;
  address: Partial<address>;
  updated_at: Date;
  created_at: Date;
}
