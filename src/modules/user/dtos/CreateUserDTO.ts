import { ICompanyRequest } from "@shared/types/pagination.type";

export interface CreateUserDTO extends Partial<ICompanyRequest> {
  name: string;
  email: string;
  password: string;
}
