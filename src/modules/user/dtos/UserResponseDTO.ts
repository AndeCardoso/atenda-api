export interface UserResponseDTO {
  id: number;
  name?: string | null;
  email: string;
  admin?: boolean;
  updated_at: Date;
}
