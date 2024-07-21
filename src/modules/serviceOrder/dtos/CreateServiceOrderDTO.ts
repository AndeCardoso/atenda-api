import { address } from "@shared/types/address.type";
import { serviceOrderStatusEnum } from "../constants";
import { ICompanyRequest } from "@shared/types/pagination.type";

export interface CreateServiceOrderDTO
  extends ICompanyRequest,
    Partial<address> {
  selectedVoltage: string;
  reportedDefect: string;
  foundDefect?: string;
  orderedServices: string;
  executedServices?: string;
  observations?: string;
  openedAt: Date;
  closedAt?: Date;
  totalValue?: number;
  signatureUrl?: string;
  status?: serviceOrderStatusEnum;
  addressId?: number;
  equipmentId: number;
  customerId: number;
  technicianId: number;
}
