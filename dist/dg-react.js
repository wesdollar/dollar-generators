#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const lodash_1 = require("lodash");
const chalk_1 = require("chalk");
const fs_1 = require("fs");
const process_1 = require("process");
const { log } = console;
const program = new commander_1.Command();
program
    .argument("<name>", "component name")
    .option("-p, --path <path>", "install path")
    .action((name, options) => {
    name = (0, lodash_1.capitalize)(name);
    const content = `import React from "react";
import PropTypes from 'prop-types'

export const ${name} = ({ children }) => {
  return <div data-testid="${name}-container">{children}</div>;
};

${name}.propTypes = {};

${name}.defaultProps = {};
`;
    name = (0, lodash_1.lowerCase)(name);
    const installPath = options.path ? `${(0, process_1.cwd)()}/${options.path}` : `${(0, process_1.cwd)()}`;
    const file = `${installPath}/${name}.jsx`;
    (0, fs_1.mkdirSync)(installPath, { recursive: true });
    (0, fs_1.writeFile)(`${file}`, content, (err) => {
        if (err) {
            log((0, chalk_1.red)(`could not create component`));
            return log((0, chalk_1.yellow)(err));
        }
        return log((0, chalk_1.blue)(`created ${name}.jsx component`));
    });
});
program.parse();
