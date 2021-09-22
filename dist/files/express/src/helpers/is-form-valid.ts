import { ValidationResult } from "joi";
import { ErrorResponse, errorResponse } from "../responses/error-response";
import { httpStatusCodes } from "../constants/http-status-codes";

export const isFormValid = (
  validatedData: ValidationResult
): ErrorResponse | boolean => {
  const { badRequest } = httpStatusCodes;

  if (validatedData?.error || !Object.keys(validatedData.value).length) {
    return errorResponse({
      status: badRequest,
      message: `form validation failed`,
      error: validatedData?.error || null,
    });
  }

  return true;
};
