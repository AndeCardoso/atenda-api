import { checkSchema } from "express-validator";

export const createEquipmentSchema = checkSchema({
  nickname: {
    optional: true,
    isString: true,
  },
  brand: {
    notEmpty: true,
    optional: false,
    isString: true,
    errorMessage: "Marca é obrigatório",
  },
  model: {
    notEmpty: true,
    optional: false,
    isString: true,
    errorMessage: "Modelo é obrigatório",
  },
  description: {
    optional: true,
    isString: true,
  },
  serialNumber: {
    optional: true,
    isString: true,
  },
  voltage: {
    optional: true,
    isString: true,
  },
  color: {
    optional: true,
    isString: true,
  },
  accessories: {
    optional: true,
    isString: true,
  },
  status: {
    notEmpty: true,
    optional: false,
    errorMessage: "Status é obrigatório",
  },
  customerId: {
    notEmpty: true,
    optional: false,
    isInt: {
      errorMessage: "Deve ser um número inteiro",
      bail: true,
    },
    custom: {
      options: (value) => value > 0,
      errorMessage: "O número deve ser maior que zero",
    },
  },
});
