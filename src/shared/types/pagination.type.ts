export interface IPaginationParams<T> {
  page?: number;
  limit?: number;
  order?: TOrderTypes;
  column?: T;
  search?: string;
}

export type TOrderTypes = "asc" | "desc";

export enum orderEnum {
  ASC = "asc",
  DESC = "desc",
}
