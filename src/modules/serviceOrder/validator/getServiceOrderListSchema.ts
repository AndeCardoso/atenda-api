import { orderEnum } from "@shared/types/pagination.type";
import { checkSchema } from "express-validator";
import {
  serviceOrderColumnArray,
  serviceOrderFilterTypeArray,
} from "../constants/paramsType";

export const getServiceOrderListSchema = checkSchema({
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
      options: [serviceOrderColumnArray],
      errorMessage:
        "Nome de coluna inválida, escolha entre os campos retornados na lista de técnicos",
    },
  },
  customerId: {
    notEmpty: false,
    optional: true,
    isInt: {
      errorMessage: "O Id deve ser um número inteiro",
      bail: true,
    },
    custom: {
      options: (value) => value > 0,
      errorMessage: "O número Id deve ser maior que zero",
    },
  },
  equipmentId: {
    notEmpty: false,
    optional: true,
    isInt: {
      errorMessage: "O Id deve ser um número inteiro",
      bail: true,
    },
    custom: {
      options: (value) => value > 0,
      errorMessage: "O número Id deve ser maior que zero",
    },
  },
  technicianId: {
    notEmpty: false,
    optional: true,
    isInt: {
      errorMessage: "O Id deve ser um número inteiro",
      bail: true,
    },
    custom: {
      options: (value) => value > 0,
      errorMessage: "O número Id deve ser maior que zero",
    },
  },
});
