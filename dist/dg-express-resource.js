#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = require("chalk");
const createRouteFile_1 = require("./createRouteFile");
const pluralize = __importStar(require("pluralize"));
const lodash_1 = require("lodash");
const write_file_1 = require("./helpers/write-file");
const fs_extra_1 = require("fs-extra");
const shelljs_1 = require("shelljs");
const process_1 = require("process");
const { log } = console;
const program = new commander_1.Command();
/**
 * (done) create route file
 * (done) create model file
 * (done) add types to ./types.ts
 * (done) update routes.ts
 * (done) update prisma schema
 * run schema generator
 */
/** snag just the comma separated props without types */
const getPropString = (compiledProps) => {
    const string = compiledProps.forEach((prop) => {
        const array = [];
        prop.forEach((item) => {
            array.push(item[0]);
        });
        return array.join(", ");
    });
    return string;
};
/** get model name in PascalCase */
const getModelName = (resourceId) => (0, lodash_1.upperCase)((0, lodash_1.camelCase)(pluralize.singular(resourceId)));
const getExistingImports = (content) => {
    const regex = /{(.*?)\}/;
    const split = content.split(regex);
    // eslint-disable-next-line prefer-destructuring, no-magic-numbers
    const existingImports = split[1];
    return existingImports;
};
const splitProps = (props) => {
    const compiledProps = [];
    props.forEach((prop) => compiledProps.push(prop.split(":")));
    return compiledProps;
};
const insertIntoSchema = (resourceId, props) => {
    const modelName = getModelName(resourceId);
    const schemaPath = `${(0, process_1.cwd)()}/prisma/schema.prisma`;
    const schemaContent = (0, fs_extra_1.readFileSync)(schemaPath, { encoding: "utf-8" });
    const newSchemaRecord = `model ${modelName} {
id String @id @default(dbgenerated()) @map("_id") @db.ObjectId
${props.forEach((prop) => {
        const splits = prop.split(":");
        // eslint-disable-next-line no-magic-numbers
        const string = `${splits[0]} ${(0, lodash_1.upperFirst)(splits[1])}`;
        return string;
    })}
}`;
    if (!schemaContent.includes(modelName)) {
        const content = `${schemaPath}

${newSchemaRecord}
`;
        (0, write_file_1.writeFile)({ fullCreateFilePath: schemaPath, content });
    }
};
const updateModuleImports = (content, existingImports) => {
    const importRegex = /import(.*?);/;
    const [importString] = content.split(importRegex);
    const newImportString = `import {${existingImports}${"ModeName"}} from "@prisma/client";`;
    const updatedContent = content.replace(importString, newImportString);
    return updatedContent;
};
/** replaces module imports, returning content with updated imports */
const replaceModuleImports = (content) => {
    const existingImports = getExistingImports(content);
    const updatedContent = updateModuleImports(content, existingImports);
    return updatedContent;
};
const createModelFile = (resourceId, method, props) => {
    /** PascalCase Model name */
    const modelName = getModelName(resourceId);
    const modelPath = `${(0, process_1.cwd)()}/src/${resourceId}`;
    const dbMethod = (0, lodash_1.upperFirst)(method);
    const compiledProps = splitProps(props);
    const propsString = getPropString(compiledProps);
    const content = `import { db${dbMethod} } from "../db-helpers/db-${method}";
import { ${modelName}Input } from "../types";

export const ${`${method}${modelName}`} = async ({ ${propsString} }: ${modelName}Input): Promise<boolean> => {
  const ${modelName} = await db${dbMethod}({
    collection: "${(0, lodash_1.lowerCase)(modelName)}",
    data: { ${propsString} },
  });

  return ${modelName} ? true : false;
};
`;
    (0, write_file_1.writeFile)({
        fullCreateFilePath: `${modelPath}/${method}-${resourceId}.ts`,
        content,
    });
};
/** adds ResourceInput, stripping id, to the global types file */
const addTypeDeclaration = (resourceId) => {
    const modelName = getModelName(resourceId);
    const typesFile = `${(0, process_1.cwd)()}/src/types.ts`;
    const typeName = `${modelName}Input`;
    const existingContent = (0, fs_extra_1.readFileSync)(typesFile, { encoding: "utf-8" });
    if (!existingContent.includes(typeName)) {
        const newContent = `${replaceModuleImports(existingContent)}
export type ${typeName} = Omit<${modelName}, "id">;
`;
        (0, write_file_1.writeFile)({ fullCreateFilePath: typesFile, content: newContent });
    }
};
const addRoute = (resourceId, method) => {
    const routesSearchString = "/** end crud routes */";
    const routesPath = `${(0, process_1.cwd)()}/src/routes.ts`;
    const routeContent = `router.post(
  \`/\${apiVersion}/${resourceId}/${method}-${resourceId}\`,
  async (req: Request, res: Response) => createProspectRoute(req, res)
);
${routesSearchString}
`;
    const existingContent = (0, fs_extra_1.readFileSync)(routesPath, { encoding: "utf-8" });
    const updatedContent = existingContent.replace(routesSearchString, routeContent);
    (0, write_file_1.writeFile)({ fullCreateFilePath: routesPath, content: updatedContent });
};
program
    .argument("<resourceId>", "resource id (plural, eg: users)")
    .requiredOption("-p, --props <props...>", "model props (-p name:string pin:number)")
    .action((resourceId, props) => {
    const methods = ["create", "read", "update", "delete"];
    methods.forEach((method) => {
        (0, createRouteFile_1.createRouteFile)(`${method}-${resourceId}`, "-route.ts");
        createModelFile(resourceId, method, props);
        addTypeDeclaration(resourceId);
        addRoute(resourceId, method);
        insertIntoSchema(resourceId, props);
    });
    (0, shelljs_1.exec)("npm run update-db-schema", (err) => {
        if (err) {
            // eslint-disable-next-line no-console
            log((0, chalk_1.red)("updating schema failed"));
        }
        else {
            // eslint-disable-next-line no-console
            log((0, chalk_1.blue)("schema updated"));
        }
    });
    log((0, chalk_1.blue)(`created resource ${resourceId}`));
});
program.parse();
// dg express-resource users -p=user,
