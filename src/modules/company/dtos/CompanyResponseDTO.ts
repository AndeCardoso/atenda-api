import { UserResponseDTO } from "@modules/user/dtos/UserResponseDTO";

export interface CompanyResponseDTO extends UserResponseDTO {
  companyName: string;
}
