#!/usr/bin/env node
import { Command } from "commander";
import { copyFiles } from "./helpers/copy-files";

const program = new Command();

const createVscodeDir = () => {
  const installPath = `${process.cwd()}/.vscode`;
  const modulePath = __dirname;
  const expressStorage = `${modulePath}/files/express/.vscode`;

  copyFiles(expressStorage, installPath);
};

const addLinterFiles = () => {
  const files = [
    ".eslintignore",
    ".eslintrc",
    "jest.config.ts",
    "tsconfig.json",
  ];

  files.forEach((file) => {
    const installPath = `${process.cwd()}`;
    const modulePath = __dirname;
    const expressStorage = `${modulePath}/files/express/${file}`;

    copyFiles(expressStorage, `${installPath}/${file}`);
  });
};

program.parse();

createVscodeDir();
addLinterFiles();
