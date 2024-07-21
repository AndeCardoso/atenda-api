import { address } from "@shared/types/address.type";
import { technicianPositionEnum, technicianStatusEnum } from "../constants";
import { ICompanyRequest } from "@shared/types/pagination.type";

export interface CreateTechnicianDTO extends ICompanyRequest, address {
  name: string;
  phone: string;
  cpf: string;
  position: technicianPositionEnum;
  status?: technicianStatusEnum;
}
