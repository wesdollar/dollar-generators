"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replace_module_imports_1 = require("./replace-module-imports");
const existing = `import { Signature, Prospect } from "@prisma/client";`;
const newModule = "Dollar";
test("should return string", () => {
    const result = (0, replace_module_imports_1.replaceModuleImports)(existing, newModule);
    const expectation = `import { Signature, Prospect, Dollar } from "@prisma/client";`;
    expect(result).toEqual(expectation);
});
