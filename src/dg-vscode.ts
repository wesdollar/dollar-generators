#!/usr/bin/env node
import { Command } from "commander";
import { copyFiles } from "./helpers/copy-files";

const program = new Command();

const doTheThings = () => {
  const installPath = process.cwd();
  const modulePath = __dirname;
  const expressStorage = `${modulePath}/files/express/.vscode`;

  copyFiles(expressStorage, installPath);
};

program.parse();

doTheThings();
