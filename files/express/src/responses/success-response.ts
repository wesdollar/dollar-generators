import { httpStatusCodes } from "../constants/http-status-codes";
import { DbModels } from "../types";

/**
 * Defines structure of success messages that are
 * returned to the user via success responses.
 */
export interface SuccessResponse {
  status?: number;
  message: string;
  resource?: DbModels;
}

/**
 * Formats success response JSON payload.
 * Defaults to status code 200 if status is not provided.
 * @returns {Object} object containing response payload
 * @example successResponse({message: "", status: 401, resource: "Signatures"})
 */
export const successResponse = ({
  /** human-readable success message */
  message,
  /** http status code, default: 200 */
  status = httpStatusCodes.success,
  /** DB resource return in payload */
  resource,
}: SuccessResponse): SuccessResponse => {
  let response: SuccessResponse = { status, message };

  if (resource) {
    response = { ...response, resource: { ...resource } };
  }

  return response;
};
