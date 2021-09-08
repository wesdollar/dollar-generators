#!/usr/bin/env node
import { Command } from "commander";
import { red, yellow, blue } from "chalk";
import { copyFile as _copyFile, mkdir, readdirSync } from "fs";

const { log } = console;
const program = new Command();

const copyFile = (file, destinationFile) => {
  _copyFile(`${file}`, `${destinationFile}`, (err) => {
    if (err) {
      log("");
      log(red(`could not create ${file}`));
      log(yellow(err));

      return false;
    }

    return log(blue(`created ${destinationFile}`));
  });
};

const doTheThings = () => {
  const installPath = process.cwd();
  const modulePath = module.path;
  const expressStorage = `${modulePath}/files/express`;

  copyFile(`${expressStorage}/.eslintrc`, `${installPath}/.eslintrc`);

  mkdir(`${installPath}/.vscode`, { recursive: true }, (err) => {
    if (err) {
      log("");
      log(red("could not create directory"));
      log(yellow(err));

      return;
    }

    log("");

    const vsFiles = readdirSync(`${expressStorage}/.vscode`);

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
