#!/usr/bin/env node
import { Command } from "commander";
import { startCase } from "lodash";
import { parse } from "react-docgen-typescript";
import { cwd as processCWD } from "process";
import { relative } from "path";
import { makeDirectory } from "./helpers/make-directory";
import { writeFile } from "./helpers/write-file";

const program = new Command();

const parseTypes = (docs) => {
  let defaultValue, propDescription, propName, required, type;
  const returns = [];

  if (!Object.entries(docs.props)) {
    return null;
  }

  for (const [prop] of Object.entries(docs.props)) {
    defaultValue = docs.props[prop].defaultValue?.value
      ? docs.props[prop].defaultValue?.value
      : "";
    propDescription = docs.props[prop].description;
    propName = docs.props[prop].name;
    required = docs.props[prop].required ? "" : "?";
    type = docs.props[prop].type.name.split("|").join("\\");

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

  const [comp] = parse(`${compId}/${getComponentFileName(compId)}`, options);
  const getComponentDescription = (docs) => docs.description;
  const componentName = comp.displayName;

  makeDirectory(installDirectory);

  const relativeSrcPath = relative(installDirectory, docsSrc);
  const relativeCompPath = relative(installDirectory, compId);
  const props = parseTypes(comp);

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

${
  Boolean(props) &&
  `
  <SectionHeader height="0">Props</SectionHeader>

| Prop Name  | Type           | Description | Default |
| ---------- | -------------- | ----------- | ------- |
${props}
`
}

<SectionHeader>Example Composition</SectionHeader>
<CodeBlock className="language-tsx">{Basic${componentName}}</CodeBlock>

<SectionHeader>Code Behind</SectionHeader>
<CodeBlock className="language-jsx">{${componentName}}</CodeBlock>
`;

  const fullCreateFilePath = `${installDirectory}/${getComponentFileName(
    compId,
    ".md"
  )}`;

  writeFile({ fullCreateFilePath, content });
};

program
  .argument("<compId>", "component id (eg: cool/story-bro)")
  .action((compId) => generateAction(compId));

program.parse();
