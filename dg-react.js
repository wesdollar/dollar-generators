#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { capitalize, lowerCase } = require("lodash");
const chalk = require("chalk");
const log = console.log;
const fs = require("fs");

program
  .argument("<name>", "component name")
  .option("-p, --path <path>", "install path")
  .action((name, options, command) => {
    name = capitalize(name);

    const content = `import React from "react";
import PropTypes from 'prop-types'

export const ${name} = ({ children }) => {
  return <div data-testid="${name}-container">{children}</div>;
};

${name}.propTypes = {};

${name}.defaultProps = {};
`;

    name = lowerCase(name);
    const installPath = options.path
      ? `${__dirname}/${options.path}`
      : `${__dirname}`;
    const file = `${installPath}}/${name}.jsx`;

    fs.mkdirSync(installPath, { recursive: true });

    fs.writeFile(`${file}`, content, (err) => {
      if (err) {
        log(chalk.red(`could not create component`));
        return log(chalk.yellow(err));
      }

      return log(chalk.blue(`created ${name}.jsx component`));
    });
  });

program.parse();
