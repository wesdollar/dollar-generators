import { replaceModuleImports } from "./replace-module-imports";

const existing = `import { Signature, Prospect } from "@prisma/client";`;
const newModule = "Dollar";

test("should return string", () => {
  const result = replaceModuleImports(existing, newModule);
  const expectation = `import { Signature, Prospect, Dollar } from "@prisma/client";`;

  expect(result).toEqual(expectation);
});
