import { CreateAddress } from "@shared/types/address.type";

export interface TechnicianResponseDTO {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  position: technicianPositionEnum;
  status: technicianStatusEnum;
  address: CreateAddress;
  updated_at: Date;
}

export enum technicianStatusEnum {
  AVAILABLE = 1,
  OCCUPIED = 2,
  ATTENDIND = 3,
  OFF = 4,
  EXONERATED = 5,
}

export enum technicianPositionEnum {
  FIELD = 1,
  LAB = 2,
  FIELD_LAB = 3,
}
