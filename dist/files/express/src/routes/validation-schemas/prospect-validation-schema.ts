import Joi, { PartialSchemaMap } from "joi";

export const prospectValidationSchema: PartialSchemaMap = {
  deviceId: Joi.string().required(),
  ip: Joi.string().required(),
  userAgent: Joi.string().required(),
  email: Joi.string().required(),
};
