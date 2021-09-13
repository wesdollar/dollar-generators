import { Request, Response } from "express";
import { ValidationError } from "joi";
import { httpStatusCodes } from "../../constants/http-status-codes";
import { readResource } from "../../models/read-resource";
import { errorResponse } from "../../responses/error-response";
import { DbCollectionTypes } from "../../types";
import { readSignatureRoute } from "./read-signature-route";

jest.mock("../../models/read-resource", () => ({
  readResource: jest.fn(),
}));

const { unprocessable, badRequest } = httpStatusCodes;

const req = {
  params: { token: "12345" },
  query: { getAllRecords: "false" },
};

const res = { json: (json: unknown) => json };

const collection: DbCollectionTypes = "Signature";

const responseBodyMock = {
  collection,
  getAllRecords: true,
  where: {
    token: req.params.token,
  },
};

const readResourceUniqueSuccessResponse = { token: "12345" };
const readResourceFindAllSuccessResponse = [
  { ...readResourceUniqueSuccessResponse },
  { ...readResourceUniqueSuccessResponse },
];

beforeEach(() => {
  jest.resetAllMocks();
});

test("readResources is called", async () => {
  await readSignatureRoute(req as unknown as Request, res as Response);

  expect(readResource).toBeCalled();
});

test("readResources is called with appropriate values", async () => {
  await readSignatureRoute(req as unknown as Request, res as Response);

  expect(readResource).toBeCalledWith(responseBodyMock);
});

test("returns multiple models when getAllRecords is true", async () => {
  // @ts-ignore mockery
  readResource.mockResolvedValue(readResourceFindAllSuccessResponse);

  req.query.getAllRecords = "true";
  const response = await readSignatureRoute(
    req as unknown as Request,
    res as Response
  );

  expect(response).toEqual(readResourceFindAllSuccessResponse);
});

test("responds appropriately when error is thrown", async () => {
  const _errorResponse = errorResponse({
    status: unprocessable,
    message: "could not retrieve records",
    error: { error: true },
  });

  // @ts-ignore mockery
  readResource.mockResolvedValue(_errorResponse);

  req.query.getAllRecords = "true";
  const response = await readSignatureRoute(
    req as unknown as Request,
    res as Response
  );

  expect(response).toEqual(_errorResponse);
});

it("responds with validation error if token is not a string", async () => {
  const invalidReq = {
    params: { token: 123456 },
    query: { getAllRecords: "false" },
  };

  const response = await readSignatureRoute(
    invalidReq as unknown as Request,
    res as Response
  );

  const expectedResponse = {
    status: badRequest,
    message: `form validation failed`,
    error: new ValidationError(
      `"token" must be a string`,
      "no details",
      "123456"
    ),
  };

  expect(response).toEqual(expectedResponse);
});
