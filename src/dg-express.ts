#!/usr/bin/env node
import { Command } from "commander";
import { copyFiles } from "./helpers/copy-files";

const program = new Command();

program
  .argument("<name>", "project name (eg: my-cool-project)")
  .option("-p, --path <path>", "install path")
  .action((name, options) => {
    const installPath = options.path
      ? `${process.cwd()}/${options.path}`
      : process.cwd();
    const modulePath = __dirname;

    copyFiles(`${modulePath}/files/express`, `${installPath}/${name}`, true);
  });

program.parse();
