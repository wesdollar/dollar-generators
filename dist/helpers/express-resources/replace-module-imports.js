"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceModuleImports = void 0;
const get_existing_imports_1 = require("./get-existing-imports");
const update_module_imports_1 = require("./update-module-imports");
/**
 * Replaces module imports, returning content with updated imports.
 * Expects a PascalCase, singular noun.
 */
const replaceModuleImports = (
  content,
  /* PascalCase, singular (eg: Dollar) */
  newModule
) => {
  const existingImports = (0, get_existing_imports_1.getExistingImports)(
    content
  );
  const updatedContent = (0, update_module_imports_1.updateModuleImports)(
    content,
    existingImports,
    newModule
  );
  return updatedContent;
};
exports.replaceModuleImports = replaceModuleImports;
