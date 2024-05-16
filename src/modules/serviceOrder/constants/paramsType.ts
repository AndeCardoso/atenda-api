export type TServiceOrderColumnTypes =
  | "id"
  | "created_at"
  | "closed_at"
  | "status";

export const serviceOrderColumnArray = [
  "id",
  "created_at",
  "closed_at",
  "status",
];

export const serviceOrderFilterTypeArray = ["status"];

export enum serviceOrderColumnTypesEnum {
  ID = "id",
  CREATED_AT = "created_at",
  CLOSED_AT = "closed_at",
  STATUS = "status",
}

export enum serviceOrderFilterTypesEnum {
  STATUS = "status",
}
