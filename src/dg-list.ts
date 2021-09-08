#!/usr/bin/env node
import { Command } from "commander";
import { inverse, blue } from "chalk";

const { log } = console;
const program = new Command();

program.parse();

log(inverse(`Dollar Generators`));
log("");
log(blue(`express [node express service]`));
log(blue(`react native [react native component w/ TS]`));
log(blue(`rn-doc [generate RN docs for Docusaurus]`));
log(blue(`react [react component]`));
log(blue(`vscode [configure vscode]`));
log(blue(`cra [new project using Create React Act]`));
log("");
