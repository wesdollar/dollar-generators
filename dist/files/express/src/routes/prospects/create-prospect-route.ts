import { Request, Response } from "express";
import { DbCollectionTypes } from "../../types";
import { createResource } from "../helpers/create-resource";
import { prospectValidationSchema } from "../validation-schemas/prospect-validation-schema";

export const createProspectRoute = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const model: DbCollectionTypes = "Prospect";
  const validationSchema = prospectValidationSchema;

  const response = await createResource(model, req.body, validationSchema);

  return res.json(response);
};
