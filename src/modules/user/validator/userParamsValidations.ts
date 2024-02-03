import {
  IGetListUsersParams,
  TColumnTypes,
  TOrderTypes,
} from "../useCases/getListUsers/paramsType";

const orderTypes: TOrderTypes[] = ["asc", "desc"];
const columnTypes: TColumnTypes[] = ["email", "id", "name"];

export const getListUsersParamsValidation = ({
  page,
  limit,
  order,
  column,
}: IGetListUsersParams) => {
  let errors = [];
  if (Number(page) === 0) {
    errors.push({ field: "page", errorMsg: "Invalid param" });
  }
  if (Number(limit) === 0) {
    errors.push({ field: "limit", errorMsg: "Invalid param" });
  }
  if (order && !orderTypes.includes(order)) {
    errors.push({ field: "order", errorMsg: "Invalid param" });
  }
  if (column && !columnTypes.includes(column)) {
    errors.push({ field: "column", errorMsg: "Invalid param" });
  }
  return errors;
};
