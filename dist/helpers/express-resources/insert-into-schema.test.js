"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const write_file_1 = require("../write-file");
const fs_extra_1 = require("fs-extra");
const process_1 = require("process");
const insert_into_schema_1 = require("./insert-into-schema");
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
process_1.cwd.mockImplementation(() => "dollar");
test("calls writeFile when model does not exist", () => {
    fs_extra_1.readFileSync.mockImplementation(() => "anything Anything anything");
    (0, insert_into_schema_1.insertIntoSchema)(resourceId, props);
    // eslint-disable-next-line no-magic-numbers
    expect(write_file_1.writeFile).toBeCalledTimes(1);
});
test("does not call writeFile when model exists", () => {
    fs_extra_1.readFileSync.mockImplementation(() => "anything Dollar anything");
    (0, insert_into_schema_1.insertIntoSchema)(resourceId, props);
    expect(write_file_1.writeFile).toBeCalledTimes(0);
});
test("returns the appropriate content", () => {
    const string = "anything Anything anything";
    fs_extra_1.readFileSync.mockImplementation(() => string);
    (0, insert_into_schema_1.insertIntoSchema)(resourceId, props);
    const newSchemaRecord = `model Dollar {
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
    expect(write_file_1.writeFile).toBeCalledWith(obj);
});
