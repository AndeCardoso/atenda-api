import { address } from "@shared/types/address.type";
import { customerStatusEnum } from "../constants";
import { IUserRequest } from "@shared/types/pagination.type";

export interface CreateCustomerDTO extends IUserRequest {
  name: string;
  document: string;
  phone: string;
  secondPhone?: string;
  email: string;
  status: customerStatusEnum;
  addresses: address[];
}
