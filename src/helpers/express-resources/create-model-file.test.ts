import { writeFile } from "../../helpers/write-file";
// eslint-disable-next-line no-unused-vars
import { cwd } from "process";
import { createModelFile } from "./create-model-file";
import { makeDirectory } from "../make-directory";

jest.mock("process", () => ({
  cwd: jest.fn().mockReturnValue(""),
}));

jest.mock("../../helpers/write-file", () => ({
  writeFile: jest.fn(),
}));

jest.mock("../make-directory", () => ({
  makeDirectory: jest.fn(),
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
  createModelFile("dollars", "create", props);

  const obj = {
    fullCreateFilePath: `/src/${resourceId}/${method}-${resourceId}.ts`,
    content,
  };

  expect(writeFile).toBeCalledWith(obj);
});
