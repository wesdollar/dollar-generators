import { getExistingImports } from "./get-existing-imports";

const expectedResult = " Signature, Prospect ";
const content = `import {${expectedResult}} from "@prisma/client";`;

it("should return existing imports", () => {
  const result = getExistingImports(content);

  expect(result).toEqual(expectedResult);
});
