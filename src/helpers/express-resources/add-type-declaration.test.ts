import { addTypeDeclaration } from "./add-type-declaration";
import { cwd } from "process";
import { readFileSync } from "fs-extra";
import { writeFile } from "../write-file";

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

(writeFile as unknown as jest.Mock).mockImplementation(() => writeFileRes);
(cwd as unknown as jest.Mock).mockImplementation(() => cwdRes);

beforeEach(() => {
  jest.clearAllMocks();
});

it("should call writeFile", () => {
  (readFileSync as unknown as jest.Mock).mockImplementation(
    () => readFileSyncRes
  );
  addTypeDeclaration(resourceId);
  // eslint-disable-next-line no-magic-numbers
  expect(writeFile).toBeCalledTimes(1);
});

it("should not call writeFile", () => {
  (readFileSync as unknown as jest.Mock).mockImplementation(
    () => readFileSyncResMatch
  );
  addTypeDeclaration(resourceId);
  expect(writeFile).toBeCalledTimes(0);
});

test("readFileSync should be called with correct file path", () => {
  addTypeDeclaration(resourceId);

  expect(readFileSync).toBeCalledWith(fullPath, { encoding: "utf-8" });
});

test("writeFile should be called with correct payload", () => {
  (readFileSync as unknown as jest.Mock).mockImplementation(
    () => readFileSyncRes
  );
  addTypeDeclaration(resourceId);

  const obj = { fullCreateFilePath: fullPath, content: writeFileResult };

  expect(writeFile).toBeCalledWith(obj);
});
