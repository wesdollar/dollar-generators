import { errorLogger } from "./error-logger";

it("should call console error", () => {
  // @ts-ignore mockery
  global.console = { error: jest.fn() };

  const consoleSpy = jest.spyOn(console, "error");

  errorLogger("error, my friend", ["error1", "error2"]);

  expect(consoleSpy).toBeCalled();
});
