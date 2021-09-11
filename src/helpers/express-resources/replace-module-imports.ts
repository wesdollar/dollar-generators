import { getExistingImports } from "./get-existing-imports";
import { updateModuleImports } from "./update-module-imports";

/**
 * Replaces module imports, returning content with updated imports.
 * Expects a PascalCase, singular noun.
 */
export const replaceModuleImports = (
  content: string,
  /* PascalCase, singular (eg: Dollar) */
  newModule: string
): string => {
  const existingImports = getExistingImports(content);
  const updatedContent = updateModuleImports(
    content,
    existingImports,
    newModule
  );

  return updatedContent;
};
