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

const doTheThings = (options, project) => {
  const installPath = options?.path
    ? `${process.cwd()}/${options.path}`
    : process.cwd();
  const modulePath = module.path;
  const expressStorage = `${modulePath}/files/express`;

  fs.mkdir(`${installPath}/${project}/.vscode`, { recursive: true }, (err) => {
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
        `${installPath}/${project}/.vscode/${vsFile}`
      );
    });
  });
};

const spawnCRA = (options, project) => {
  const cmd = spawn("npx", ["create-react-app", project]);

  log(chalk.blue(`initiating create react app`));
  log();

  cmd.stdout.on("data", (data) => {
    log(chalk.green(data));
  });

  cmd.stderr.on("data", (data) => {
    log(chalk.red(`error: ${data}`));
  });

  cmd.on("close", (code) => {
    if (code !== 0) return;

    doTheThings(options, project);
  });
};

program.argument("<project>", "project name").action((project, options) => {
  spawnCRA(options, project);
});

program.parse();
