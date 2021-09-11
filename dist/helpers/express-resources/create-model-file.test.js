"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const write_file_1 = require("../../helpers/write-file");
const create_model_file_1 = require("./create-model-file");
jest.mock("process", () => ({
  cwd: jest.fn().mockReturnValue("dollar"),
}));
jest.mock("../../helpers/write-file", () => ({
  writeFile: jest.fn(),
}));
const resourceId = "dollars";
const dbMethod = "Create";
const modelName = "Dollar";
const method = "create";
const propsString = "name, pin";
const content = `import { db${dbMethod} } from "../db-helpers/db-${method}";
import { ${modelName}Input } from "../types";

export const ${`${method}${modelName}`} = async ({ ${propsString} }: ${modelName}Input): Promise<boolean> => {
  const ${modelName} = await db${dbMethod}({
    collection: "Dollar",
    data: { ${propsString} },
  });

  return ${modelName} ? true : false;
};
`;
const props = ["name:string", "pin:number"];
test("writes file appropriately", () => {
  (0, create_model_file_1.createModelFile)("dollars", "create", props);
  const obj = {
    fullCreateFilePath: `dollar/src/${resourceId}/${method}-${resourceId}.ts`,
    content,
  };
  expect(write_file_1.writeFile).toBeCalledWith(obj);
});
