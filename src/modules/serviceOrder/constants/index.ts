import { equipmentStatusEnum } from "@modules/equipment/constants";

export enum serviceOrderStatusEnum {
  OPENED = 1,
  EXECUTING = 2,
  DONE = 3,
  CLOSED = 4,
}

export const equipmentsStatusBySoStatus = {
  [serviceOrderStatusEnum.OPENED]: equipmentStatusEnum.IN_LINE,
  [serviceOrderStatusEnum.EXECUTING]: equipmentStatusEnum.ON_BENCH,
  [serviceOrderStatusEnum.DONE]: equipmentStatusEnum.DONE,
  [serviceOrderStatusEnum.CLOSED]: equipmentStatusEnum.WITHDRAWN,
};
