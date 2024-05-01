export type TEquipmentColumnTypes =
  | "id"
  | "nickname"
  | "brand"
  | "model"
  | "voltage"
  | "status"
  | "updated_at";

export const equipmentColumnArray = [
  "id",
  "nickname",
  "brand",
  "model",
  "voltage",
  "status",
  "updated_at",
];

export const equipmentFilterTypeArray = ["status"];

export enum equipmentColumnTypesEnum {
  ID = "id",
  NICKNAME = "nickname",
  BRAND = "brand",
  MODEL = "model",
  VOLTAGE = "voltage",
  STATUS = "status",
  UPDATED_AT = "updated_at",
}

export enum equipmentFilterTypesEnum {
  BRAND = "brand",
  VOLTAGE = "voltage",
  STATUS = "status",
}
