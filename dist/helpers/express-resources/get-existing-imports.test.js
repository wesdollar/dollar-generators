"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_existing_imports_1 = require("./get-existing-imports");
const expectedResult = " Signature, Prospect ";
const content = `import {${expectedResult}} from "@prisma/client";`;
it("should return existing imports", () => {
    const result = (0, get_existing_imports_1.getExistingImports)(content);
    expect(result).toEqual(expectedResult);
});
