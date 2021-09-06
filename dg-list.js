#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const chalk = require("chalk");
const log = console.log;

program.parse();

log(chalk.inverse(`Dollar Generators`));
log("");
log(chalk.blue(`express [node express service]`));
log(chalk.blue(`react native [react native component w/ TS]`));
log(chalk.blue(`rn-doc [generate RN docs for Docusaurus]`));
log(chalk.blue(`react [react component]`));
log(chalk.blue(`vscode [configure vscode]`));
log("");
