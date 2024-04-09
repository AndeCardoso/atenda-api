export interface IPaginationParams<T> extends Partial<IUserRequest> {
  page?: number;
  limit?: number;
  order?: TOrderTypes;
  column?: T;
  search?: string;
}

export interface IUserRequest {
  userId: number;
}

export type TOrderTypes = "asc" | "desc";

export enum orderEnum {
  ASC = "asc",
  DESC = "desc",
}
