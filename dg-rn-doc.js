#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { startCase, camelCase, upperFirst, escape } = require("lodash");
const util = require("util");
const docgen = require("react-docgen-typescript");
const fs = require("fs");
const log = console.log;
const chalk = require("chalk");
const { cwd } = require("process");

const generateAction = (compId) => {
  const docPath = `${cwd()}/docs`;

  const options = {
    savePropValueAsString: true,
  };

  let comp;

  try {
    [comp] = docgen.parse(`${cwd()}/${compId}.tsx`, options);
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
  const componentName = docs.displayName;

  const content = `---
sidebar_label: "${startCase(componentName)}"
sidebar_position: 1
title: ${startCase(componentName)}
---

import {PropBlock} from "${docPath}/src/components/PropBlock"
import {RenderTypes} from "${docPath}/src/components/RenderTypes"
import {SectionHeader} from "${docPath}/src/components/SectionHeader"
import {Space} from "@wesdollar/dollar-ui.ui.space"
import CodeBlock from '@theme/CodeBlock';
import ${componentPascalName} from '!!raw-loader!${cwd()}/${compId}';

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

  const file = `${docPath}/${compId}.md`;

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
