#!/usr/bin/env node
import { Command } from "commander";
import { spawn } from "child_process";
import { red, yellow, blue, green } from "chalk";
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

const doTheThings = (options, project) => {
  const installPath = options?.path
    ? `${process.cwd()}/${options.path}`
    : process.cwd();
  const modulePath = module.path;
  const expressStorage = `${modulePath}/files/express`;

  mkdir(`${installPath}/${project}/.vscode`, { recursive: true }, (err) => {
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
        `${installPath}/${project}/.vscode/${vsFile}`
      );
    });
  });
};

const spawnCRA = (options, project) => {
  const cmd = spawn("npx", ["create-react-app", project]);

  log(blue(`initiating create react app`));
  log();

  cmd.stdout.on("data", (data) => {
    log(green(data));
  });

  cmd.stderr.on("data", (data) => {
    log(red(`error: ${data}`));
  });

  cmd.on("close", (code) => {
    if (code !== 0) {
      return;
    }

    doTheThings(options, project);
  });
};

program.argument("<project>", "project name").action((project, options) => {
  spawnCRA(options, project);
});

program.parse();
