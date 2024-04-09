import { address } from "@shared/types/address.type";
import {
  technicianPositionEnum,
  technicianStatusEnum,
} from "./TechnicianResponseDTO";
import { IUserRequest } from "@shared/types/pagination.type";

export interface CreateTechnicianDTO extends IUserRequest, address {
  name: string;
  phone: string;
  cpf: string;
  position: technicianPositionEnum;
  status?: technicianStatusEnum;
}
