import { Prisma } from ".prisma/client";
import { DbCollectionTypes, ModelsAggregateArgs } from "../types";
import { prisma } from "./client";
import { dbRead } from "./db-read";

jest.mock("./client");
jest.mock("../logging/error-logger");

const collection: DbCollectionTypes = "Signature";
const whereObj: Prisma.SignatureWhereInput = {
  token: "12345",
};
const signatureWhere: ModelsAggregateArgs = { where: whereObj };

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls db findUnique", async () => {
  dbRead({ collection, where: signatureWhere });

  await expect(prisma.signature.findUnique).toBeCalled();
});

test("calls db findMany", async () => {
  dbRead({ collection, where: signatureWhere, getAllRecords: true });

  await expect(prisma.signature.findMany).toBeCalled();
});

test("Model data is returned for findUnique", async () => {
  const mockResponseObj = { hello: "world" };

  // @ts-ignore mockery
  prisma.signature.findUnique.mockResolvedValue(mockResponseObj);

  const response = await dbRead({ collection, where: signatureWhere });

  expect(response).toEqual(mockResponseObj);
});

test("Model data is returned for findMany", async () => {
  const mockResponseObj = [{ hello: "world" }, { hello: "world" }];

  // @ts-ignore mockery
  prisma.signature.findMany.mockResolvedValue(mockResponseObj);

  const response = await dbRead({
    collection,
    where: signatureWhere,
    getAllRecords: true,
  });

  expect(response).toEqual(mockResponseObj);
});

test("catches thrown error", async () => {
  // @ts-ignore mockery
  prisma.signature.findUnique.mockRejectedValue("error");

  await expect(async () => {
    await dbRead({ collection, where: signatureWhere });
  }).rejects.toThrow();
});
