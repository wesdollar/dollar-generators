import { writeFile } from "../../helpers/write-file";
import { readFileSync } from "fs-extra";
import { cwd } from "process";
import { getModelName } from "./get-model-name";
import { replaceModuleImports } from "./replace-module-imports";

/** adds ResourceInput, stripping id, to the global types file */
export const addTypeDeclaration = (resourceId: string): void => {
  const modelName = getModelName(resourceId);
  const typesFile = `${cwd()}/src/types.ts`;
  const typeName = `${modelName}Input`;

  const existingContent = readFileSync(typesFile, { encoding: "utf-8" });

  if (!existingContent.includes(typeName)) {
    const newContent = `${replaceModuleImports(existingContent, modelName)}
export type ${typeName} = Omit<${modelName}, "id">;
`;

    writeFile({ fullCreateFilePath: typesFile, content: newContent });
  }
};
