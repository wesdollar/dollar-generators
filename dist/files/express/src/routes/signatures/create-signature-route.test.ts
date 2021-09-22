import { Request, Response } from "express";
// eslint-disable-next-line jest/no-mocks-import
import { createResourceMockResponse } from "../helpers/__mocks__/create-resource";
import { createSignatureRoute } from "./create-signature-route";

jest.mock("../helpers/create-resource");

const req = { body: {} };
const res = { json: (json: unknown) => json };

test("returns response from createResource", async () => {
  const response = await createSignatureRoute(req as Request, res as Response);

  expect(response).toEqual(createResourceMockResponse);
});
