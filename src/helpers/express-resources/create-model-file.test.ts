import { writeFile } from "../../helpers/write-file";
// eslint-disable-next-line no-unused-vars
import { cwd } from "process";
import { createModelFile } from "./create-model-file";

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
  createModelFile("dollars", "create", props);

  const obj = {
    fullCreateFilePath: `dollar/src/${resourceId}/${method}-${resourceId}.ts`,
    content,
  };

  expect(writeFile).toBeCalledWith(obj);
});
