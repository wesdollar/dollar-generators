import Joi, { PartialSchemaMap } from "joi";

export const signatureValidationSchema: PartialSchemaMap = {
  signature: Joi.string().required(),
  token: Joi.string().required(),
};
