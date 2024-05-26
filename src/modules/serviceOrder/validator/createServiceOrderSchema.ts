import { createAddressSchema } from "@shared/validator/createAddressSchema";
import { checkSchema, validationResult } from "express-validator";

export const createServiceOrderSchema = checkSchema({
  selectedVoltage: {
    notEmpty: true,
    optional: false,
    errorMessage: "Voltagem é obrigatório",
    isString: true,
  },
  reportedDefect: {
    notEmpty: true,
    optional: false,
    errorMessage: "Defeito reportado é obrigatório",
    isString: true,
  },
  foundDefect: {
    notEmpty: false,
    optional: true,
    isString: true,
  },
  orderedServices: {
    notEmpty: true,
    optional: false,
    errorMessage: "Serviços pedidos é obrigatório",
    isString: true,
  },
  executedServices: {
    notEmpty: false,
    optional: true,
    isString: true,
  },
  observations: {
    notEmpty: false,
    optional: true,
    isString: true,
  },
  openedAt: {
    notEmpty: {
      errorMessage: "Data de abertura é obrigatório",
    },
    optional: false,
    isDate: {
      errorMessage: "Data de finalização precisa ser do tipo Date",
    },
  },
  closedAt: {
    notEmpty: false,
    optional: true,
    isDate: true,
    errorMessage: "Data de finalização precisa ser do tipo Date",
  },
  signatureUrl: {
    notEmpty: false,
    optional: true,
    isString: true,
  },
  customerId: {
    notEmpty: true,
    optional: false,
    errorMessage: "Cliente é obrigatório",
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
    notEmpty: true,
    optional: false,
    errorMessage: "Equipamento é obrigatório",
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
    notEmpty: true,
    optional: false,
    errorMessage: "Técnico é obrigatório",
    isInt: {
      errorMessage: "O Id deve ser um número inteiro",
      bail: true,
    },
    custom: {
      options: (value) => value > 0,
      errorMessage: "O número Id deve ser maior que zero",
    },
  },
  addressId: {
    notEmpty: false,
    optional: true,
    isInt: {
      errorMessage: "O Id deve ser um número inteiro",
      bail: true,
    },
    custom: {
      options: (value, { req }) => {
        if (!value) {
          checkSchema(createAddressSchema).run(req);
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            throw new Error(
              errors
                .array()
                .map((err) => err.msg)
                .join(", ")
            );
          }
        }
        if (value <= 0) {
          throw new Error("O número Id deve ser maior que zero");
        }
        return true;
      },
    },
  },
});
