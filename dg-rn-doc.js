#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { startCase } = require("lodash");
const util = require("util");
const docgen = require("react-docgen-typescript");
const fs = require("fs");
const log = console.log;
const chalk = require("chalk");
const { cwd } = require("process");
const path = require("path");

const generateAction = (compId) => {
  const docPath = `./docs/docs`;

  const options = {
    savePropValueAsString: true,
  };

  let comp;

  try {
    [comp] = docgen.parse(`./${compId}.tsx`, options);
  } catch (error) {
    return console.error(
      chalk.red(`could not find ${compId}. remember to run from project root!`)
    );
  }
  // TODO: remove console.log
  // console.log(util.inspect(comp, false, null, true));

  const parseTypes = (docs) => {
    let defaultValue, propDescription, propName, required, type;
    const returns = [];

    for (const [prop] of Object.entries(docs.props)) {
      defaultValue = docs.props[prop].defaultValue;
      propDescription = docs.props[prop].description;
      propName = docs.props[prop].name;
      required = docs.props[prop].required;
      type = docs.props[prop].type.name;

      returns.push(
        // prettier-ignore
        `| \`${propName}\`  | \`${type}\` | ${propDescription} | ${defaultValue} |
`
      );
    }

    return returns.map((print) => print).join("");
  };

  const getComponentDescription = (docs) => docs.description;
  const componentName = comp.displayName;

  const fileName = `${compId}.md`;
  const file = `${docPath}/${fileName}`;
  let [directory] = file.split(fileName);
  directory = `./docs/docs`;

  const docsSrc = path.relative(directory, "docs/src");
  const componentPath = path.relative(compId, docsSrc);

  const content = `---
sidebar_label: "${startCase(componentName)}"
sidebar_position: 1
title: ${startCase(componentName)}
---

import {PropBlock} from "${docsSrc}/components/PropBlock"
import {RenderTypes} from "${docsSrc}/components/RenderTypes"
import {SectionHeader} from "${docsSrc}/components/SectionHeader"
import {Space} from "@wesdollar/dollar-ui.ui.space"
import CodeBlock from '@theme/CodeBlock';
import ${componentName} from '!!raw-loader!${componentPath}/${compId}';

${getComponentDescription(comp)}

<SectionHeader height="0">Props</SectionHeader>

| Prop Name  | Type           | Description | Default |
| ---------- | -------------- | ----------- | ------- |
${parseTypes(comp)}

<SectionHeader>Example</SectionHeader>

\`\`\`jsx
<${componentName}>Button Label</${componentName}>
\`\`\`

<SectionHeader>Code Behind</SectionHeader>
<CodeBlock className="language-jsx">{${componentName}}</CodeBlock>
`;

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFile(file, content, (err) => {
    if (err) {
      log(chalk.red(`could not create file`));
      return log(chalk.yellow(err));
    }

    return log(chalk.blue(`created ${file}`));
  });
};

program
  .alias("rn")
  .argument("<compId>", "component id")
  .action((compId) => generateAction(compId));

program.parse();
