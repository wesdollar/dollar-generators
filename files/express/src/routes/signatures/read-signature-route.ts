import { Request, Response } from "express";
import Joi from "joi";
import { httpStatusCodes } from "../../constants/http-status-codes";
import { isFormValid } from "../../helpers/is-form-valid";
import { readResource } from "../../models/read-resource";
import { DbCollectionTypes, ModelsAggregateArgs } from "../../types";
import { signatureValidationSchema } from "../validation-schemas/signature-validation-schema";

/**
 * Handles req/res to get user's signature. Retrieves all
 * signatures attached to user's token. Users can have
 * multiple signatures on file through multiple leases. As such,
 * an array of all of the signatures found is returned.
 *
 * Token is passed in as route param with method GET.
 *
 * @example GET {base url}/v1/signatures/{user token, eg: 123456}
 *
 * @param req Request
 * @param res Response
 * @returns array of signatures by user token
 */
export const readSignatureRoute = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = req?.params?.token || null;

  const collection: DbCollectionTypes = "Signature";
  const whereObj: { token?: string } = {};

  if (token) {
    const validationSchema = signatureValidationSchema;

    delete validationSchema.signature;

    const validatedData = Joi.object(validationSchema).validate({ token });
    const dataIsValid = isFormValid(validatedData) as any;

    if (dataIsValid?.status === httpStatusCodes.badRequest) {
      return res.json(dataIsValid);
    }

    whereObj.token = token;
    /**
     * a user can have multiple signatures on file,
     * so we need to grab all records by token
     */
    const getAllRecords = true;

    const resource = await readResource({
      collection,
      where: whereObj as ModelsAggregateArgs,
      getAllRecords,
    });

    return res.json(resource);
  }

  const resources = await readResource({
    collection,
    where: whereObj as ModelsAggregateArgs,
    getAllRecords: true,
  });

  return res.json(resources);
};
