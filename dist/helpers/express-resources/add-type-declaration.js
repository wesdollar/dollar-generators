"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTypeDeclaration = void 0;
const write_file_1 = require("../../helpers/write-file");
const fs_extra_1 = require("fs-extra");
const process_1 = require("process");
const get_model_name_1 = require("./get-model-name");
const replace_module_imports_1 = require("./replace-module-imports");
/** adds ResourceInput, stripping id, to the global types file */
const addTypeDeclaration = (resourceId) => {
    const modelName = (0, get_model_name_1.getModelName)(resourceId);
    const typesFile = `${(0, process_1.cwd)()}/src/types.ts`;
    const typeName = `${modelName}Input`;
    const existingContent = (0, fs_extra_1.readFileSync)(typesFile, { encoding: "utf-8" });
    if (!existingContent.includes(typeName)) {
        const newContent = `${(0, replace_module_imports_1.replaceModuleImports)(existingContent, modelName)}
export type ${typeName} = Omit<${modelName}, "id">;
`;
        (0, write_file_1.writeFile)({ fullCreateFilePath: typesFile, content: newContent });
    }
};
exports.addTypeDeclaration = addTypeDeclaration;
