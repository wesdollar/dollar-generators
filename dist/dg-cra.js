#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const chalk_1 = require("chalk");
const fs_1 = require("fs");
const { log } = console;
const program = new commander_1.Command();
const copyFile = (file, destinationFile) => {
    (0, fs_1.copyFile)(`${file}`, `${destinationFile}`, (err) => {
        if (err) {
            log("");
            log((0, chalk_1.red)(`could not create ${file}`));
            log((0, chalk_1.yellow)(err));
            return false;
        }
        return log((0, chalk_1.blue)(`created ${destinationFile}`));
    });
};
const doTheThings = (options, project) => {
    const installPath = (options === null || options === void 0 ? void 0 : options.path)
        ? `${process.cwd()}/${options.path}`
        : process.cwd();
    const modulePath = module.path;
    const expressStorage = `${modulePath}/files/express`;
    (0, fs_1.mkdir)(`${installPath}/${project}/.vscode`, { recursive: true }, (err) => {
        if (err) {
            log("");
            log((0, chalk_1.red)("could not create directory"));
            log((0, chalk_1.yellow)(err));
            return;
        }
        log("");
        const vsFiles = (0, fs_1.readdirSync)(`${expressStorage}/.vscode`);
        vsFiles.forEach((vsFile) => {
            copyFile(`${expressStorage}/.vscode/${vsFile}`, `${installPath}/${project}/.vscode/${vsFile}`);
        });
    });
};
const spawnCRA = (options, project) => {
    const cmd = (0, child_process_1.spawn)("npx", ["create-react-app", project]);
    log((0, chalk_1.blue)(`initiating create react app`));
    log();
    cmd.stdout.on("data", (data) => {
        log((0, chalk_1.green)(data));
    });
    cmd.stderr.on("data", (data) => {
        log((0, chalk_1.red)(`error: ${data}`));
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
