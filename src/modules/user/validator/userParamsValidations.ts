import {
  IGetListUsersParams,
  TColumnTypes,
  TOrderTypes,
} from "../useCases/getListUsers/paramsType";

const orderTypes: TOrderTypes[] = ["asc", "desc"];
const columnTypes: TColumnTypes[] = ["email", "id", "name", "updated_at"];

export const getListUsersParamsValidation = ({
  page,
  limit,
  order,
  column,
}: IGetListUsersParams) => {
  const DEFAULT_ERROR_MSG = "Parâmetro inválido";
  let errors = [];

  if (Number(page) === 0) {
    errors.push({ field: "page", errorMsg: DEFAULT_ERROR_MSG });
  }
  if (Number(limit) === 0) {
    errors.push({ field: "limit", errorMsg: DEFAULT_ERROR_MSG });
  }
  if (order && !orderTypes.includes(order)) {
    errors.push({ field: "order", errorMsg: DEFAULT_ERROR_MSG });
  }
  if (column && !columnTypes.includes(column)) {
    errors.push({ field: "column", errorMsg: DEFAULT_ERROR_MSG });
  }
  return errors;
};
