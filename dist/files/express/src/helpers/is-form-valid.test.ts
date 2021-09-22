import { ValidationResult } from "joi";
import { httpStatusCodes } from "../constants/http-status-codes";
import { isFormValid } from "./is-form-valid";

const errorString = "brand new error";
const validatedData = {
  error: errorString as unknown as ValidationResult,
};

const expectedResponse = {
  status: httpStatusCodes.badRequest,
  message: `form validation failed`,
  error: errorString,
};

test("returns error response on error", () => {
  const response = isFormValid(validatedData as unknown as ValidationResult);

  expect(response).toEqual(expectedResponse);
});

test("returns true on valid form", () => {
  const response = isFormValid({ value: "something" });

  expect(response).toBeTruthy();
});
