export interface UserListResponseDTO {
  data: UserResponseDTO[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export interface UserResponseDTO {
  id: number;
  name: string;
  email: string;
  updated_at: Date;
}
