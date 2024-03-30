import { address } from "@shared/types/address.type";
import {
  technicianPositionEnum,
  technicianStatusEnum,
} from "./TechnicianResponseDTO";

export interface CreateTechnicianDTO {
  name: string;
  phone: string;
  cpf: string;
  position: technicianPositionEnum;
  status?: technicianStatusEnum;
  address: address;
}
