import { httpStatusCodes } from "../constants/http-status-codes";
import { dbRead } from "../db-helpers/db-read";
import { ErrorResponse, errorResponse } from "../responses/error-response";
import { DbModels, DbRead } from "../types";

/**
 * Gets resource record from passed in collection.
 * Results are filtered by the where clause passed in
 * as the "where" property. All records are retrieved
 * if getAllRecords is a string of "true". getAllRecords
 * is passed into the route as a query param.
 */
export const readResource = async ({
  collection,
  where,
  getAllRecords,
}: DbRead): Promise<DbModels | ErrorResponse> => {
  try {
    const Model = await dbRead({
      collection,
      where,
      getAllRecords,
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
