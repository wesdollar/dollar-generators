import { httpStatusCodes } from "../constants/http-status-codes";
import { dbCreate } from "../db-helpers/db-create";
import { ModelsInputs, DbCollectionTypes } from "../types";
import { createResource } from "./create-resource";

jest.mock("../db-helpers/db-create", () => ({
  dbCreate: jest.fn(),
}));

const collection: DbCollectionTypes = "Signature";
const modelInput: ModelsInputs = {
  token: "12345",
  signature: "base64:asdlkjf93",
};

test("returns Model when create is successful", async () => {
  const mockSuccessResponse = { token: modelInput.token };

  // @ts-ignore mockery
  dbCreate.mockResolvedValue(mockSuccessResponse);

  const response = await createResource(collection, modelInput);

  expect(response).toEqual(mockSuccessResponse);
});

test("returns errorResponse when createDb throws error", async () => {
  // @ts-ignore mockery
  dbCreate.mockRejectedValue({ error: true });

  const expectedErrorResponse = {
    status: httpStatusCodes.unprocessable,
    message: "could not retrieve records",
    error: { error: true },
  };

  const response = await createResource(collection, modelInput);

  expect(response).toEqual(expectedErrorResponse);
});
