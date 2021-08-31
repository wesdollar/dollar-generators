#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { exec } = require("child_process");
const chalk = require("chalk");
const log = console.log;
const path = require("path");
const fs = require("fs");

program.option("-p, --path <path>", "install path");
program.parse(process.argv);

const options = program.opts();

const copyFile = (file, destinationFile) => {
  fs.copyFile(`${file}`, `${destinationFile}`, (err) => {
    if (err) {
      log("");
      log(chalk.red(`could not create ${file}`));
      log(chalk.yellow(err));

      return;
    }
    return log(chalk.blue(`created ${destinationFile}`));
  });
};

const createServer = () => {
  const installPath = options.path
    ? `${process.cwd()}/${options.path}`
    : process.cwd();
  const modulePath = module.path;
  const expressStorage = `${modulePath}/files/express`;

  const files = fs.readdirSync(`${expressStorage}`);

  fs.mkdir(`${installPath}/.vscode`, { recursive: true }, (err) => {
    if (err) {
      log("");
      log(chalk.red("could not create directory"));
      log(chalk.yellow(err));

      return;
    }

    log("");
    log(chalk.blue("install destination created"));

    files.forEach((file) => {
      if (file === ".vscode") {
        const vsFiles = fs.readdirSync(`${expressStorage}/.vscode`);

        vsFiles.forEach((vsFile) => {
          copyFile(
            `${expressStorage}/.vscode/${vsFile}`,
            `${installPath}/.vscode/${vsFile}`
          );
        });
      } else {
        if (file === "package.json") {
          fs.copyFile(
            `${expressStorage}/${file}`,
            `${installPath}/${file}`,
            (err) => {
              if (err) {
                ("could not create package.json");
              }

              exec(
                "npm i",
                {
                  cwd: installPath,
                },
                (err) => {
                  if (err) {
                    log(chalk.red("could not install packages"));
                  }

                  log(chalk.blue("packages install successfully"));
                }
              );
            }
          );
        }

        copyFile(`${expressStorage}/${file}`, `${installPath}/${file}`);
      }
    });
  });
};

createServer();
