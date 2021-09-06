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

const generateAction = (name) => {
  const options = {
    savePropValueAsString: true,
  };

  const [comp] = docgen.parse(`${cwd()}/primary-button.tsx`, options);
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

  const componentName = name;
  const componentPascalName = upperFirst(camelCase(componentName));

  const content = `---
sidebar_label: "${startCase(componentName)}"
sidebar_position: 1
title: ${startCase(componentName)}
---

import {PropBlock} from "../../../src/components/PropBlock"
import {RenderTypes} from "../../../src/components/RenderTypes"
import {Space} from "@wesdollar/dollar-ui.ui.space"
import {SectionHeader} from "../../../src/components/SectionHeader"
import CodeBlock from '@theme/CodeBlock';
import ${componentPascalName} from '!!raw-loader!../../../../prog-anywhere/primitives/buttons/${componentName}/${componentName}';

${getComponentDescription(comp)}

<SectionHeader height="0">Props</SectionHeader>

| Prop Name  | Type           | Description | Default |
| ---------- | -------------- | ----------- | ------- |
${parseTypes(comp)}

<SectionHeader>Example</SectionHeader>

\`\`\`jsx
<${componentPascalName}>Button Label</${componentPascalName}>
\`\`\`

<SectionHeader>Code Behind</SectionHeader>
<CodeBlock className="language-jsx">{${componentPascalName}}</CodeBlock>
`;

  const file = `${cwd()}/${componentName}.md`;

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
  .argument("<name>", "component name")
  .action((name) => generateAction(name));

program.parse();
