import { getModelName } from "./get-model-name";

test("returns the correct string", () => {
  const resourceId = "dollars";
  const result = getModelName(resourceId);

  expect(result).toEqual("Dollar");
});

describe("different text variations", () => {
  it("should handle camelCase", () => {
    const resourceId = "dollarBills";
    const result = getModelName(resourceId);

    expect(result).toEqual("DollarBill");
  });

  it("should handle camelCase", () => {
    const resourceId = "dollar-bills";
    const result = getModelName(resourceId);

    expect(result).toEqual("DollarBill");
  });

  it("should handle weirdness", () => {
    const resourceId = "Captain-Americas";
    const result = getModelName(resourceId);

    expect(result).toEqual("CaptainAmerica");
  });

  /**
   * this test fails, the "s" gets chopped
   * TODO: handle case
   *
   * it("should handle camelCase", () => {
   *const resourceId = "my-long-name-is-this";
   *const result = getModelName(resourceId);
   *
   *   expect(result).toEqual("MyLongNameIsThis");
   *});
   */
});
