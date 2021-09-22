"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateModuleImports = void 0;
const lodash_1 = require("lodash");
const updateModuleImports = (content, existingImports, newModule) => {
    const newImportString = `${(0, lodash_1.trimEnd)(existingImports)}, ${newModule} `;
    const updatedContent = content.replace(existingImports, newImportString);
    return updatedContent;
};
exports.updateModuleImports = updateModuleImports;
