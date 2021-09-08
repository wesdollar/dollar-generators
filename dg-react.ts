#!/usr/bin/env node
import { Command } from "commander";
import { capitalize, lowerCase } from "lodash";
import { red, yellow, blue } from "chalk";
import { mkdirSync, writeFile } from "fs";
import { cwd } from "process";

const { log } = console;
const program = new Command();

program
  .argument("<name>", "component name")
  .option("-p, --path <path>", "install path")
  .action((name, options) => {
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
    const installPath = options.path ? `${cwd()}/${options.path}` : `${cwd()}`;
    const file = `${installPath}/${name}.jsx`;

    mkdirSync(installPath, { recursive: true });

    writeFile(`${file}`, content, (err) => {
      if (err) {
        log(red(`could not create component`));

        return log(yellow(err));
      }

      return log(blue(`created ${name}.jsx component`));
    });
  });

program.parse();
