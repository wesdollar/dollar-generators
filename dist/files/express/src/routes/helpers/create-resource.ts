import { DbCollectionTypes, DbModels, ModelsInputs } from "../../types";
import Joi, { PartialSchemaMap } from "joi";
import { isFormValid } from "../../helpers/is-form-valid";
import { createResource as createModelResource } from "../../models/create-resource";
import { httpStatusCodes } from "../../constants/http-status-codes";
import { ErrorResponse, errorResponse } from "../../responses/error-response";
import {
  SuccessResponse,
  successResponse,
} from "../../responses/success-response";

const { unprocessable, badRequest } = httpStatusCodes;

/**
 * Creates resource in specified model.
 * Validates req.body based on validationSchema.
 *
 * @returns inserted record or error
 */
export const createResource = async (
  model: DbCollectionTypes,
  reqBody: ModelsInputs,
  validationSchema: PartialSchemaMap
  // eslint-disable-next-line max-params
): Promise<SuccessResponse | ErrorResponse> => {
  const validatedData = Joi.object(validationSchema).validate(reqBody);
  const joiValidation = isFormValid(validatedData) as any;

  /**
   * this check shouldn't be needed but the code
   * continues to execute when testing since jest
   * doesn't honor the res in
   * handleJoiValidationError
   */
  if (joiValidation?.status === badRequest) {
    return joiValidation;
  }

  try {
    const Model = await createModelResource(model, reqBody);

    if (!Model) {
      return errorResponse({
        status: unprocessable,
        message: `could not create resource`,
      });
    }

    return successResponse({
      message: `resource created`,
      resource: Model as DbModels,
    });
  } catch (error) {
    throw new Error();
  }
};
