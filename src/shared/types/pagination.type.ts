export interface IPaginationParams<T> extends Partial<ICompanyRequest> {
  page?: number;
  limit?: number;
  order?: TOrderTypes;
  column?: T;
  search?: string;
}

export interface ICompanyRequest {
  companyId: number;
  userId?: number;
}

export type TOrderTypes = "asc" | "desc";

export enum orderEnum {
  ASC = "asc",
  DESC = "desc",
}
