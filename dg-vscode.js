#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { spawn } = require("child_process");
const chalk = require("chalk");
const log = console.log;
const path = require("path");
const fs = require("fs");

const copyFile = (file, destinationFile) => {
  fs.copyFile(`${file}`, `${destinationFile}`, (err) => {
    if (err) {
      log("");
      log(chalk.red(`could not create ${file}`));
      log(chalk.yellow(err));

      return false;
    }
    return log(chalk.blue(`created ${destinationFile}`));
  });
};

const doTheThings = (options) => {
  const installPath = options?.path
    ? `${process.cwd()}/${options.path}`
    : process.cwd();
  const modulePath = module.path;
  const expressStorage = `${modulePath}/files/express`;

  copyFile(`${expressStorage}/.eslintrc`, `${installPath}/.eslintrc`);

  fs.mkdir(`${installPath}/.vscode`, { recursive: true }, (err) => {
    if (err) {
      log("");
      log(chalk.red("could not create directory"));
      log(chalk.yellow(err));

      return;
    }

    log("");

    const vsFiles = fs.readdirSync(`${expressStorage}/.vscode`);

    vsFiles.forEach((vsFile) => {
      copyFile(
        `${expressStorage}/.vscode/${vsFile}`,
        `${installPath}/.vscode/${vsFile}`
      );
    });
  });
};

program.parse();

doTheThings();
