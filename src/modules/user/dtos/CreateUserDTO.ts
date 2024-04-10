import { IUserRequest } from "@shared/types/pagination.type";

export interface CreateUserDTO extends IUserRequest {
  name: string;
  email: string;
  password: string;
}
