import { address } from "@shared/types/address.type";
import { technicianPositionEnum, technicianStatusEnum } from "../constants";

export interface TechnicianResponseDTO {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  position: technicianPositionEnum;
  status: technicianStatusEnum;
  address: address;
  updated_at: Date;
}
