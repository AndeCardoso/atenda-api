import { checkSchema } from "express-validator";
import { userColumnArray } from "../useCases/getListUsers/paramsType";
import { orderEnum } from "@shared/types/pagination.type";

export const getListUsersSchema = checkSchema({
  page: {
    optional: true,
    isInt: {
      errorMessage: "Deve ser um número inteiro",
      bail: true,
    },
    custom: {
      options: (value) => value > 0,
      errorMessage: "O número deve ser maior que zero",
    },
  },
  limit: {
    optional: true,
    isInt: {
      errorMessage: "Deve ser um número inteiro",
      bail: true,
    },
    custom: {
      options: (value) => value > 0,
      errorMessage: "O número deve ser maior que zero",
    },
  },
  order: {
    optional: true,
    isString: {
      errorMessage: "Deve ser do tipo string",
      bail: true,
    },
    isIn: {
      options: [[orderEnum.ASC, orderEnum.DESC]],
      errorMessage: "Tipo de ordenação inválido, escolha entre 'asc' ou 'desc'",
    },
  },
  column: {
    optional: true,
    isString: {
      errorMessage: "Deve ser do tipo string",
      bail: true,
    },
    isIn: {
      options: [userColumnArray],
      errorMessage:
        "Nome de coluna inválida, escolha entre os campos retornados na lista de usuários",
    },
  },
});
