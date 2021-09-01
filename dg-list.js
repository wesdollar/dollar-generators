#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const chalk = require("chalk");
const log = console.log;

program.parse();

log(chalk.inverse(`Dollar Generators`));
log("");
log(chalk.blue(`express [node express service]`));
log(chalk.blue(`react [react component]`));
log("");
