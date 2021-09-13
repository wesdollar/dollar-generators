import { DbCollectionTypes } from "../../types";
import Joi, { PartialSchemaMap, ValidationError } from "joi";
import { httpStatusCodes } from "../../constants/http-status-codes";
import { createResource as _createResource } from "./create-resource";
import { createResource } from "../../models/create-resource";

jest.mock("../../models/create-resource", () => ({
  createResource: jest.fn(),
}));

const { badRequest } = httpStatusCodes;

const model: DbCollectionTypes = "Signature";
const validationSchema: PartialSchemaMap = {
  signature: Joi.string().required(),
  token: Joi.string().required(),
};

const getRequestBody = (isInvalid = false) => {
  const reqBody = {
    signature: "phish",
    token: "555live",
  };

  if (isInvalid) {
    reqBody.signature = "";
    reqBody.token = "";

    return reqBody;
  }

  return reqBody;
};

const successMockResponse = {
  status: 200,
  message: `resource created`,
  resource: getRequestBody(),
};

const validationErrorMockResponse = {
  status: badRequest,
  message: `form validation failed`,
  error: new ValidationError(
    `"signature" is not allowed to be empty`,
    `ValidationError`,
    ""
  ),
};

test("returns seccess response when form is valid", async () => {
  // @ts-ignore mocking
  createResource.mockReturnValue(getRequestBody());
  const response = await _createResource(
    model,
    getRequestBody(),
    validationSchema
  );

  expect(response).toEqual(successMockResponse);
});

test("returns validation error response when form is not valie", async () => {
  // @ts-ignore mocking
  createResource.mockReturnValue(successMockResponse);
  const invalidReqBody = getRequestBody(true);
  const response = await _createResource(
    model,
    invalidReqBody,
    validationSchema
  );

  expect(response).toEqual(validationErrorMockResponse);
});

test("returns error when creation fails", async () => {
  // @ts-ignore mocking
  createResource.mockRejectedValue("error");

  await expect(async () => {
    await _createResource(model, getRequestBody(), validationSchema);
  }).rejects.toThrow();
});
