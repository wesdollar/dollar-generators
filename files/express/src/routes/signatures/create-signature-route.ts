import { Request, Response } from "express";
import { DbCollectionTypes } from "../../types";
import { createResource } from "../helpers/create-resource";
import { signatureValidationSchema } from "../validation-schemas/signature-validation-schema";

export const createSignatureRoute = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const model: DbCollectionTypes = "Signature";
  const validationSchema = signatureValidationSchema;

  const response = await createResource(model, req.body, validationSchema);

  return res.json(response);
};
