"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModelFile = void 0;
const lodash_1 = require("lodash");
const write_file_1 = require("../../helpers/write-file");
const process_1 = require("process");
const get_prop_string_1 = require("./get-prop-string");
const get_model_name_1 = require("./get-model-name");
const make_directory_1 = require("../make-directory");
const createModelFile = (resourceId, method, props) => {
  /** PascalCase Model name */
  const modelName = (0, get_model_name_1.getModelName)(resourceId);
  const modelPath = `${(0, process_1.cwd)()}/src/${resourceId}`;
  const dbMethod = (0, lodash_1.upperFirst)(method);
  const propsString = (0, get_prop_string_1.getPropString)(props);
  const content = `import { db${dbMethod} } from "../db-helpers/db-${method}";
import { ${modelName}Input } from "../types";

export const ${`${method}${modelName}`} = async ({ ${propsString} }: ${modelName}Input): Promise<boolean> => {
  const ${modelName} = await db${dbMethod}({
    collection: "${modelName}",
    data: { ${propsString} },
  });

  return ${modelName} ? true : false;
};
`;
  (0, make_directory_1.makeDirectory)(`${modelPath}`);
  (0, write_file_1.writeFile)({
    fullCreateFilePath: `${modelPath}/${method}-${resourceId}.ts`,
    content,
  });
};
exports.createModelFile = createModelFile;
