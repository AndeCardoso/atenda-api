import { address } from "@shared/types/address.type";
import { customerStatusEnum } from "../constants";

export interface CustomerResponseDTO {
  id: number;
  name: string;
  document: string;
  phone: string;
  secondPhone?: string | null;
  email: string;
  status: customerStatusEnum;
  addresses: address[];
  created_at?: Date;
  updated_at?: Date;
}
