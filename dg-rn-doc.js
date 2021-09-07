#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { startCase } = require("lodash");
const util = require("util");
const docgen = require("react-docgen-typescript");
const fs = require("fs");
const log = console.log;
const chalk = require("chalk");
const { cwd: processCWD } = require("process");
const path = require("path");

const parseTypes = (docs) => {
  let defaultValue, propDescription, propName, required, type;
  const returns = [];

  for (const [prop] of Object.entries(docs.props)) {
    defaultValue = docs.props[prop].defaultValue?.value
      ? docs.props[prop].defaultValue?.value
      : "";
    propDescription = docs.props[prop].description;
    propName = docs.props[prop].name;
    required = docs.props[prop].required ? "" : "?";
    type = docs.props[prop].type.name.replace("|", "\\");

    returns.push(
      // prettier-ignore
      `| \`${propName}${required}\`  | \`${type}\` | ${propDescription} | ${defaultValue} |
`
    );
  }

  return returns.map((print) => print).join("");
};

const getComponentFileName = (compId, ext = ".tsx") => {
  const split = compId.split("/");
  const path = split[split.length - 1];

  return `${path}${ext}`;
};

const getComponentRoot = (compId) => {
  const split = compId.split("/");
  const splitLength = split.length;
  const pathArray = [];

  split.forEach((path, index) => {
    if (index + 1 < splitLength) {
      pathArray.push(path);
    }
  });

  return pathArray.join("/");
};

const generateAction = (compId) => {
  const cwd = processCWD();
  const docsPath = `${cwd}/docs/docs`;
  const docsSrc = `${cwd}/docs/src`;
  const componentRoot = `${getComponentRoot(compId)}`;
  const installDirectory = `${docsPath}/${componentRoot}`;

  const options = {
    savePropValueAsString: true,
  };

  const [comp] = docgen.parse(
    `${compId}/${getComponentFileName(compId)}`,
    options
  );

  // TODO: remove console.log
  // console.log(util.inspect(comp, false, null, true));

  const getComponentDescription = (docs) => docs.description;
  const componentName = comp.displayName;

  if (!fs.existsSync(`${installDirectory}`)) {
    fs.mkdirSync(installDirectory, { recursive: true }, (err) => {
      if (err) {
        return console.error("could not create directory ", installDirectory);
      }

      log(chalk.blue(`created ${directory}`));
    });
  }

  const relativeSrcPath = path.relative(installDirectory, docsSrc);
  const relativeCompPath = path.relative(installDirectory, compId);

  const content = `---
sidebar_label: "${startCase(componentName)}"
sidebar_position: 1
title: ${startCase(componentName)}
---

import {SectionHeader} from "${relativeSrcPath}/components/SectionHeader"
import CodeBlock from '@theme/CodeBlock';
import ${componentName} from '!!raw-loader!${relativeCompPath}/${getComponentFileName(
    compId,
    ""
  )}';
import Basic${componentName} from '!!raw-loader!${relativeCompPath}/${getComponentFileName(
    compId,
    ".composition"
  )}';

${getComponentDescription(comp)}

<SectionHeader height="0">Props</SectionHeader>

| Prop Name  | Type           | Description | Default |
| ---------- | -------------- | ----------- | ------- |
${parseTypes(comp)}

<SectionHeader>Example Composition</SectionHeader>
<CodeBlock className="language-tsx">{Basic${componentName}}</CodeBlock>

<SectionHeader>Code Behind</SectionHeader>
<CodeBlock className="language-jsx">{${componentName}}</CodeBlock>
`;

  const fullCreateFilePath = `${installDirectory}/${getComponentFileName(
    compId,
    ".md"
  )}`;

  fs.writeFile(fullCreateFilePath, content, (err) => {
    if (err) {
      log(chalk.red(`could not create ${fullCreateFilePath}`));
      return log(chalk.yellow(err));
    }

    return log(chalk.blue(`created ${fullCreateFilePath}`));
  });
};

program
  .argument("<compId>", "component id")
  .action((compId) => generateAction(compId));

program.parse();
