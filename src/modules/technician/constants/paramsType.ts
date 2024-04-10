export type TTechnicianColumnTypes =
  | "id"
  | "name"
  | "phone"
  | "cpf"
  | "position"
  | "status"
  | "address"
  | "updated_at";

export const technicianColumnArray = [
  "id",
  "name",
  "phone",
  "cpf",
  "position",
  "status",
  "address",
  "updated_at",
];

export const technicianFilterTypeArray = ["position", "status"];

export enum technicianColumnTypesEnum {
  ID = "id",
  NAME = "name",
  PHONE = "phone",
  CPF = "cpf",
  POSITION = "position",
  STATUS = "status",
  ADDRESS = "address",
  UPDATED_AT = "updated_at",
}

export enum technicianFilterTypesEnum {
  POSITION = "position",
  STATUS = "status",
}
