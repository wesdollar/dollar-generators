import { dbCreate } from "./db-create";
import { prisma } from "./client";
import { DbCollectionTypes } from "../types";

jest.mock("../logging/error-logger");
jest.mock("./client");

const collection: DbCollectionTypes = "Signature";
const data = {
  signature: "rwd",
  token: "ldskjf93573fjsf93",
};

const paramObj = { collection, data };

beforeEach(() => {
  jest.clearAllMocks();
});

// @ts-expect-error prisma types don't like the dyanmic collection, no easy workaround
const createMethod: jest.MockInstance = prisma.signature.create;

test("calls create method", async () => {
  createMethod.mockReturnValueOnce(data);

  await dbCreate(paramObj);
  await expect(createMethod).toHaveBeenCalled();
});

test("returns true on create new collection", async () => {
  createMethod.mockReturnValueOnce(data);
  const result = await dbCreate(paramObj);

  expect(result).toBeTruthy();
});

test("returns false if no record from creation", async () => {
  createMethod.mockReturnValueOnce(null);
  const result = await dbCreate(paramObj);

  expect(result).toBeFalsy();
});

test("returns false on exception", async () => {
  createMethod.mockRejectedValue("error");

  await expect(async () => {
    await dbCreate(paramObj);
  }).rejects.toThrow();
});
