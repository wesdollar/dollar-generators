import { writeFile } from "../write-file";
import { readFileSync } from "fs-extra";
import { cwd } from "process";
import { insertIntoSchema } from "./insert-into-schema";

const namespace = "dollar";

jest.mock("process", () => ({
  cwd: jest.fn().mockReturnValue(namespace),
}));

jest.mock("fs-extra", () => ({
  readFileSync: jest.fn(),
}));

jest.mock("../write-file", () => ({
  writeFile: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const resourceId = "dollars";
const props = ["name:string", "pin:number"];

(cwd as unknown as jest.Mock).mockImplementation(() => "dollar");

test("calls writeFile when model does not exist", () => {
  (readFileSync as unknown as jest.Mock).mockImplementation(
    () => "anything Anything anything"
  );

  insertIntoSchema(resourceId, props);
  // eslint-disable-next-line no-magic-numbers
  expect(writeFile).toBeCalledTimes(1);
});

test("does not call writeFile when model exists", () => {
  (readFileSync as unknown as jest.Mock).mockImplementation(
    () => "anything Dollar anything"
  );

  insertIntoSchema(resourceId, props);
  expect(writeFile).toBeCalledTimes(0);
});

test("returns the appropriate content", () => {
  const string = "anything Anything anything";

  (readFileSync as unknown as jest.Mock).mockImplementation(() => string);

  insertIntoSchema(resourceId, props);

  const newSchemaRecord = `
model Dollar {
id String @id @default(dbgenerated()) @map("_id") @db.ObjectId
name String
pin Number
}`;

  const content = `${string}

  ${newSchemaRecord}`;

  const obj = {
    fullCreateFilePath: `${namespace}/prisma/schema.prisma`,
    content,
  };

  expect(writeFile).toBeCalledWith(obj);
});
