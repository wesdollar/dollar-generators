#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const copy_files_1 = require("./helpers/copy-files");
const program = new commander_1.Command();
program
    .argument("<name>", "project name (eg: my-cool-project)")
    .option("-p, --path <path>", "install path")
    .action((name, options) => {
    const installPath = options.path
        ? `${process.cwd()}/${options.path}`
        : process.cwd();
    const modulePath = __dirname;
    (0, copy_files_1.copyFiles)(`${modulePath}/files/express`, `${installPath}/${name}`, true);
});
program.parse();
