#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = require("chalk");
const process_1 = require("process");
const get_component_filename_1 = require("./helpers/get-component-filename");
const get_component_root_1 = require("./helpers/get-component-root");
const make_directory_1 = require("./helpers/make-directory");
const write_file_1 = require("./helpers/write-file");
const lodash_1 = require("lodash");
const { log } = console;
const program = new commander_1.Command();
program
    .argument("<routeId>", "route id (eg: createSomethingRoute)")
    .action((routeId) => {
    const content = `import { Request, Response } from "express";

export const ${(0, lodash_1.camelCase)((0, get_component_filename_1.getComponentFileName)(routeId, ""))} = (req: Request, res: Response): Response => {
  return res.json({});
};
`;
    const filename = (0, get_component_filename_1.getComponentFileName)(routeId, ".ts");
    const installDirectory = `${(0, process_1.cwd)()}/src/routes/${(0, get_component_root_1.getComponentRoot)(routeId)}`;
    (0, make_directory_1.makeDirectory)(installDirectory);
    (0, write_file_1.writeFile)({
        fullCreateFilePath: `${installDirectory}/${filename}`,
        content,
    });
    return log((0, chalk_1.blue)(`created route ${routeId}`));
});
program.parse();
