import { upperFirst } from "lodash";
import { writeFile } from "../../helpers/write-file";
import { cwd } from "process";
import { getPropString } from "./get-prop-string";
import { getModelName } from "./get-model-name";

export const createModelFile = (
  resourceId: string,
  method: string,
  props: string[]
): void => {
  /** PascalCase Model name */
  const modelName = getModelName(resourceId);
  const modelPath = `${cwd()}/src/${resourceId}`;
  const dbMethod = upperFirst(method);
  const propsString = getPropString(props);

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

  writeFile({
    fullCreateFilePath: `${modelPath}/${method}-${resourceId}.ts`,
    content,
  });
};
