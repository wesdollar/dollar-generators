#!/usr/bin/env node
import { Command } from "commander";
import { exec } from "child_process";
import { red, blue } from "chalk";
import fs from "fs-extra";

const { log } = console;
const program = new Command();

program.option("-p, --path <path>", "install path");
program.parse(process.argv);

const options = program.opts();

const copyFiles = async () => {
  const installPath = options.path
    ? `${process.cwd()}/${options.path}`
    : process.cwd();
  const modulePath = __dirname;

  try {
    const results = await fs.copy(`${modulePath}/files/express`, installPath);

    // eslint-disable-next-line no-console
    console.info(blue(`copied ${(results as any)?.length as string} files`));

    exec("npm i", { cwd: installPath }, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        log(red("npm i failed"));
      } else {
        // eslint-disable-next-line no-console
        log(blue("npm packages installed"));
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    log(red(`copy failed with error: ${error}`));
  }
};

copyFiles();
