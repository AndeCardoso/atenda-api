export type TCustomerColumnTypes =
  | "id"
  | "name"
  | "document"
  | "phone"
  | "email"
  | "status"
  | "address"
  | "updated_at";

export const customerColumnArray = [
  "id",
  "name",
  "document",
  "phone",
  "email",
  "status",
  "address",
  "updated_at",
];

export const customerFilterTypeArray = ["status"];

export enum customerColumnTypesEnum {
  ID = "id",
  NAME = "name",
  DOCUMENT = "document",
  PHONE = "phone",
  EMAIL = "email",
  STATUS = "status",
  ADDRESS = "address",
  UPDATED_AT = "updated_at",
}

export enum technicianFilterTypesEnum {
  STATUS = "status",
}
