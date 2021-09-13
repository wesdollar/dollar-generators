import { successResponse } from "./success-response";

const payload = {
  message: "playing in the band",
  status: 200,
};

test("returns message & status when no resource", () => {
  expect(successResponse(payload)).toEqual(payload);
});

test("returns resource when resource provided", () => {
  const resourcePayload = { ...payload, resource: { hello: "world" } };

  // @ts-ignore good enough for testing
  expect(successResponse(resourcePayload)).toEqual(resourcePayload);
});
