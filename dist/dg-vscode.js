#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const copy_files_1 = require("./helpers/copy-files");
const program = new commander_1.Command();
const createVscodeDir = () => {
    const installPath = `${process.cwd()}/.vscode`;
    const modulePath = __dirname;
    const expressStorage = `${modulePath}/files/express/.vscode`;
    (0, copy_files_1.copyFiles)(expressStorage, installPath);
};
const addLinterFiles = () => {
    const files = [".eslintignore", ".eslintrc"];
    files.forEach((file) => {
        const installPath = `${process.cwd()}`;
        const modulePath = __dirname;
        const expressStorage = `${modulePath}/files/express/${file}`;
        (0, copy_files_1.copyFiles)(expressStorage, `${installPath}/${file}`);
    });
};
program.parse();
createVscodeDir();
addLinterFiles();
