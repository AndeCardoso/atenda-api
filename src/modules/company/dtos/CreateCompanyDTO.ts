import { CreateUserDTO } from "@modules/user/dtos/CreateUserDTO";

export interface CreateCompanyDTO extends Omit<CreateUserDTO, "userId"> {
  companyName: string;
}
