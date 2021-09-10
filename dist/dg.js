#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
commander_1.program
    .version("%%VERSION%%")
    .description("scaffold files to skip the annoying stuff")
    .command("express", "scaffold express project")
    .command("express-route", "scaffold express route")
    .command("vscode", "configures VS Code with linting, formatting, and other settings")
    .alias("express-vscode")
    .command("react-native", "scaffold react native w/ TS")
    .alias("rn")
    .command("rn-doc", "generate RN docs for Docusaurus")
    .alias("rn-docs")
    .command("react", "scaffold react component")
    .command("cra", "Create React App plus goodies")
    .command("list", "list available generators", { isDefault: true });
commander_1.program.parse(process.argv);
