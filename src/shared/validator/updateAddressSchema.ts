import { Schema } from "express-validator";

export const updateAddressSchema: Schema = {
  nickname: {
    optional: true,
  },
  cep: {
    notEmpty: true,
    optional: true,
    errorMessage: "Cep é obrigatório",
  },
  street: {
    notEmpty: true,
    optional: true,
    errorMessage: "Rua é obrigatório",
  },
  number: {
    notEmpty: true,
    optional: true,
    errorMessage: "Número é obrigatório",
  },
  complement: {
    optional: true,
  },
  district: {
    notEmpty: true,
    optional: true,
    errorMessage: "Bairro é obrigatório",
  },
  state: {
    notEmpty: true,
    optional: true,
    errorMessage: "Estado é obrigatório",
  },
  city: {
    notEmpty: true,
    optional: false,
    errorMessage: "Cidade é obrigatório",
  },
};
