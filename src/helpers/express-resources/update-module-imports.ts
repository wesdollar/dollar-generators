import { trimEnd } from "lodash";

export const updateModuleImports = (
  content: string,
  existingImports: string,
  newModule: string
): string => {
  const newImportString = `${trimEnd(existingImports)}, ${newModule} `;
  const updatedContent = content.replace(existingImports, newImportString);

  return updatedContent;
};
