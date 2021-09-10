#!/usr/bin/env node
import { Command } from "commander";
import { inverse, blue, green } from "chalk";

const { log } = console;
const program = new Command();

program.parse();

log("");
log(inverse(`Dollar Generators`));
log("");
log(green("add the --help flag to any command for more details"));
log("");
log(blue(`express [node express service]`));
log(blue(`express-route [create express route file]`));
log(blue(`express-vscode [configure vscode]`));
log(blue(`react native [react native component w/ TS]`));
log(blue(`rn-doc [generate RN docs for Docusaurus]`));
log(blue(`react [react component]`));
log(blue(`cra [new project using Create React Act]`));
log("");
