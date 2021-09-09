#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = require("chalk");
const { log } = console;
const program = new commander_1.Command();
program.parse();
log((0, chalk_1.inverse)(`Dollar Generators`));
log("");
log((0, chalk_1.blue)(`express [node express service]`));
log((0, chalk_1.blue)(`react native [react native component w/ TS]`));
log((0, chalk_1.blue)(`rn-doc [generate RN docs for Docusaurus]`));
log((0, chalk_1.blue)(`react [react component]`));
log((0, chalk_1.blue)(`vscode [configure vscode]`));
log((0, chalk_1.blue)(`cra [new project using Create React Act]`));
log("");