#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const lodash_1 = require("lodash");
const react_docgen_typescript_1 = require("react-docgen-typescript");
const process_1 = require("process");
const path_1 = require("path");
const make_directory_1 = require("./helpers/make-directory");
const write_file_1 = require("./helpers/write-file");
const chalk_1 = require("chalk");
const program = new commander_1.Command();
const parseTypes = (docs) => {
    var _a, _b;
    let defaultValue, propDescription, propName, required, type;
    const returns = [];
    if (!Object.entries(docs.props)) {
        return null;
    }
    for (const [prop] of Object.entries(docs.props)) {
        defaultValue = ((_a = docs.props[prop].defaultValue) === null || _a === void 0 ? void 0 : _a.value)
            ? (_b = docs.props[prop].defaultValue) === null || _b === void 0 ? void 0 : _b.value
            : "";
        propDescription = docs.props[prop].description;
        propName = docs.props[prop].name;
        required = docs.props[prop].required ? "" : "?";
        type = docs.props[prop].type.name.split("|").join("\\");
        returns.push(
        // prettier-ignore
        `| \`${propName}${required}\`  | \`${type}\` | ${propDescription} | ${defaultValue} |
`);
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
    const cwd = (0, process_1.cwd)();
    const docsPath = `${cwd}/docs/docs`;
    const docsSrc = `${cwd}/docs/src`;
    const componentRoot = `${getComponentRoot(compId)}`;
    const installDirectory = `${docsPath}/${componentRoot}`;
    const options = {
        savePropValueAsString: true,
    };
    const [comp] = (0, react_docgen_typescript_1.parse)(`${compId}/${getComponentFileName(compId)}`, options);
    if (!comp) {
        return console.log((0, chalk_1.red)(`could not create doc for ${compId}/${getComponentFileName(compId)}`));
    }
    const getComponentDescription = (docs) => docs.description;
    const componentName = comp.displayName;
    (0, make_directory_1.makeDirectory)(installDirectory);
    const relativeSrcPath = (0, path_1.relative)(installDirectory, docsSrc);
    const relativeCompPath = (0, path_1.relative)(installDirectory, compId);
    const props = parseTypes(comp);
    const content = `---
sidebar_label: "${(0, lodash_1.startCase)(componentName)}"
sidebar_position: 1
title: ${(0, lodash_1.startCase)(componentName)}
---

import {SectionHeader} from "${relativeSrcPath}/components/SectionHeader"
import CodeBlock from '@theme/CodeBlock';
import ${componentName} from '!!raw-loader!${relativeCompPath}/${getComponentFileName(compId, "")}';
import Basic${componentName} from '!!raw-loader!${relativeCompPath}/${getComponentFileName(compId, ".composition")}';

${getComponentDescription(comp)}

${Boolean(props) &&
        `
  <SectionHeader height="0">Props</SectionHeader>

| Prop Name  | Type           | Description | Default |
| ---------- | -------------- | ----------- | ------- |
${props}
`}

<SectionHeader>Example Composition</SectionHeader>
<CodeBlock className="language-tsx">{Basic${componentName}}</CodeBlock>

<SectionHeader>Code Behind</SectionHeader>
<CodeBlock className="language-jsx">{${componentName}}</CodeBlock>
`;
    const fullCreateFilePath = `${installDirectory}/${getComponentFileName(compId, ".md")}`;
    (0, write_file_1.writeFile)({ fullCreateFilePath, content });
};
program
    .argument("<compId>", "component id (eg: cool/story-bro)")
    .action((compId) => generateAction(compId));
program.parse();
