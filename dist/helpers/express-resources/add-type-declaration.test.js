"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_type_declaration_1 = require("./add-type-declaration");
const process_1 = require("process");
const fs_extra_1 = require("fs-extra");
const write_file_1 = require("../write-file");
jest.mock("process", () => ({
    cwd: jest.fn(),
}));
jest.mock("fs-extra", () => ({
    readFileSync: jest.fn(),
}));
jest.mock("../write-file", () => ({
    writeFile: jest.fn(),
}));
const resourceId = "dollars";
const readFileSyncResMatch = "DollarInput";
const writeFileRes = "whatever";
const cwdRes = "dollar";
const fullPath = `${cwdRes}/src/types.ts`;
const readFileSyncRes = `import { Signature, Prospect } from "@prisma/client";

export type SignatureInput = Omit<Signature, "id">;
export type ProspectInput = Omit<Prospect, "id" | "completedRegistration">;`;
const writeFileResult = `import { Signature, Prospect, Dollar } from "@prisma/client";

export type SignatureInput = Omit<Signature, "id">;
export type ProspectInput = Omit<Prospect, "id" | "completedRegistration">;
export type DollarInput = Omit<Dollar, "id">;
`;
write_file_1.writeFile.mockImplementation(() => writeFileRes);
process_1.cwd.mockImplementation(() => cwdRes);
beforeEach(() => {
    jest.clearAllMocks();
});
it("should call writeFile", () => {
    fs_extra_1.readFileSync.mockImplementation(() => readFileSyncRes);
    (0, add_type_declaration_1.addTypeDeclaration)(resourceId);
    // eslint-disable-next-line no-magic-numbers
    expect(write_file_1.writeFile).toBeCalledTimes(1);
});
it("should not call writeFile", () => {
    fs_extra_1.readFileSync.mockImplementation(() => readFileSyncResMatch);
    (0, add_type_declaration_1.addTypeDeclaration)(resourceId);
    expect(write_file_1.writeFile).toBeCalledTimes(0);
});
test("readFileSync should be called with correct file path", () => {
    (0, add_type_declaration_1.addTypeDeclaration)(resourceId);
    expect(fs_extra_1.readFileSync).toBeCalledWith(fullPath, { encoding: "utf-8" });
});
test("writeFile should be called with correct payload", () => {
    fs_extra_1.readFileSync.mockImplementation(() => readFileSyncRes);
    (0, add_type_declaration_1.addTypeDeclaration)(resourceId);
    const obj = { fullCreateFilePath: fullPath, content: writeFileResult };
    expect(write_file_1.writeFile).toBeCalledWith(obj);
});
