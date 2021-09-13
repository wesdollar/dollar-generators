import { httpStatusCodes } from "../constants/http-status-codes";
import { dbRead } from "../db-helpers/db-read";
import { ErrorResponse } from "../responses/error-response";
import { DbCollectionTypes, DbRead } from "../types";
import { readResource } from "./read-resource";

jest.mock("../db-helpers/db-read", () => ({
  dbRead: jest.fn(),
}));

const collection: DbCollectionTypes = "Signature";
const readResourceReq: DbRead = {
  collection,
  where: {},
  getAllRecords: false,
};
const readResourceRes = { token: "12345abc" };
const readResourceErrorRes: ErrorResponse = {
  status: httpStatusCodes.unprocessable,
  message: "could not retrieve records",
  error: { error: true },
};

test("returns Model when resolves", async () => {
  // @ts-ignore mockery
  dbRead.mockResolvedValue(readResourceRes);

  const response = await readResource(readResourceReq);

  expect(response).toEqual(readResourceRes);
});

test("returns errorResponse when rejected", async () => {
  // @ts-ignore mockery
  dbRead.mockRejectedValue({ error: true });

  const response = await readResource(readResourceReq);

  expect(response).toEqual(readResourceErrorRes);
});
