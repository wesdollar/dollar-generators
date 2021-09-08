#!/usr/bin/env node
import { Command } from "commander";
import { exec } from "child_process";
import { red, yellow, blue, white } from "chalk";
import { copyFile as _copyFile, mkdir, readdirSync } from "fs";
import { chdir } from "process";

const { log } = console;
const program = new Command();

program.option("-p, --path <path>", "install path");
program.parse(process.argv);

const options = program.opts();

const rootDirectories = [
  "constants",
  "data-transformers",
  "helpers",
  "middleware",
  "routes",
  "public",
];

const publicDirectories = ["public/icons", "public/img", "public/svg"];

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

const makeDirectories = (array, installPath) => {
  array.map((directory) => {
    mkdir(`${installPath}/${directory}`, { recursive: true }, (err) => {
      if (err) {
        log("");
        log(red(err));

        return log(red(`could not create directory ${directory}`));
      }

      return log(blue(`created ${installPath}/${directory}`));
    });
  });
};

const createServer = () => {
  const installPath = options.path
    ? `${process.cwd()}/${options.path}`
    : process.cwd();
  let modulePath = module.path;

  chdir(modulePath);
  chdir("../");

  modulePath = process.cwd();

  const expressStorage = `${modulePath}/files/express`;

  const files = readdirSync(`${expressStorage}`);

  mkdir(`${installPath}/.vscode`, { recursive: true }, (err) => {
    if (err) {
      log("");
      log(red("could not create directory"));
      log(yellow(err));

      return;
    }

    log("");
    log(blue("install destination created"));

    files.forEach((file) => {
      if (file === ".vscode") {
        const vsFiles = readdirSync(`${expressStorage}/.vscode`);

        vsFiles.forEach((vsFile) => {
          copyFile(
            `${expressStorage}/.vscode/${vsFile}`,
            `${installPath}/.vscode/${vsFile}`
          );
        });
      } else {
        if (file === "package.json") {
          _copyFile(
            `${expressStorage}/${file}`,
            `${installPath}/${file}`,
            (err) => {
              if (err) {
                log(red("could not create package.json"));
              }

              log("");
              log(white(`installing node packages...`));
              log("");

              exec(
                "npm i",
                {
                  cwd: installPath,
                },
                (err) => {
                  if (err) {
                    log(red("could not install packages"));
                  }

                  log(blue("npm packages installed successfully"));
                }
              );
            }
          );
        }

        copyFile(`${expressStorage}/${file}`, `${installPath}/${file}`);
      }
    });
  });

  makeDirectories(rootDirectories, installPath);
  makeDirectories(publicDirectories, installPath);
};

createServer();
