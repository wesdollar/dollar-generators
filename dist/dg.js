#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
commander_1.program
    .version("1.0.1")
    .description("generate boilerplates")
    .command("express", "scaffold express project")
    .command("react-native", "scaffold react native w/ TS")
    .alias("rn")
    .command("rn-doc", "generate RN docs for Docusaurus")
    .command("react", "scaffold react component")
    .command("cra", "Create React App plus goodies")
    .command("vscode", "add .vscode directory (opinionated)")
    .command("list", "list available generators", { isDefault: true });
commander_1.program.parse(process.argv);
