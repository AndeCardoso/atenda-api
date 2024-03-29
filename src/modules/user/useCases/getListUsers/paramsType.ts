export interface IGetListUsersParams {
  page?: number;
  limit?: number;
  order?: TOrderTypes;
  column?: TColumnTypes;
}

export type TOrderTypes = "asc" | "desc";

export enum orderEnum {
  ASC = "asc",
  DESC = "desc",
}

export type TColumnTypes = "id" | "name" | "email" | "updated_at";

export enum columnTypesEnum {
  ID = "id",
  NAME = "name",
  EMAIL = "email",
  UPDATED_AT = "updated_at",
}
