import { errorResponse } from "./error-response";

const payload = {
  status: 420,
  message: "big ol' error",
  error: { something: "weird", isHappening: "here" },
};

test("returns error response", () => {
  expect(errorResponse(payload)).toEqual(payload);
});
