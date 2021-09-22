import { httpStatusCodes } from "../constants/http-status-codes";
import { dbCreate } from "../db-helpers/db-create";
import { ErrorResponse, errorResponse } from "../responses/error-response";
import { ModelsInputs, DbModels, DbCollectionTypes } from "../types";

/** add record to provided collection collection */
export const createResource = async (
  collection: DbCollectionTypes,
  modelInput: ModelsInputs
): Promise<DbModels | ErrorResponse> => {
  try {
    const Model = await dbCreate({
      collection,
      data: modelInput,
    });

    return Model as DbModels;
  } catch (error) {
    return errorResponse({
      status: httpStatusCodes.unprocessable,
      message: "could not retrieve records",
      error,
    });
  }
};
