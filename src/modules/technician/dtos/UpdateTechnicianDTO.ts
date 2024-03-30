import { UpdateAddress } from "@shared/types/address.type";
import {
  technicianPositionEnum,
  technicianStatusEnum,
} from "./TechnicianResponseDTO";

export interface UpdateTechnicianDTO {
  name?: string;
  phone?: string;
  position?: technicianPositionEnum;
  status?: technicianStatusEnum;
  address?: UpdateAddress;
}
