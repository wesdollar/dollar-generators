#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const process_1 = require("process");
const lodash_1 = require("lodash");
const fs = __importStar(require("fs"));
const write_file_1 = require("./helpers/write-file");
const get_component_filename_1 = require("./helpers/get-component-filename");
const program = new commander_1.Command();
const generateComponent = (componentName) => {
    const constantsName = `${(0, lodash_1.camelCase)(componentName)}Constants`;
    return `import * as React from "react";
import { View } from "react-native";
import { ${constantsName} } from "./${(0, lodash_1.kebabCase)(componentName)}.constants";

interface ${componentName}Props {
  children: string;
}

export const ${componentName} = ({ children }: ${componentName}Props) => {
  return <View testID={${constantsName}.testID}>{children}</View>;
};
`;
};
const generateTest = (componentName) => {
    const fileName = (0, lodash_1.kebabCase)(componentName);
    const constantsName = `${(0, lodash_1.camelCase)(componentName)}Constants`;
    return `import * as React from "react";
import { Basic${componentName} } from "./${fileName}.composition";
import { render } from "@testing-library/react-native";
import { ${constantsName} } from "./${(0, lodash_1.kebabCase)(componentName)}.constants";

it("should render", () => {
  const { getByTestId } = render(<Basic${componentName} />);
  const component = getByTestId(${constantsName}.testID);

  expect(component).toBeTruthy();
});

it("matches snapshot", () => {
  const tree: any = render(<Basic${componentName} />);

  expect(tree).toMatchSnapshot();
});`;
};
const generateComp = (componentName) => {
    return `import * as React from "react";
import { ${componentName} } from ".";

export const Basic${componentName} = () => <${componentName}>Hello, World!</${componentName}>;`;
};
const generateIndex = (componentName) => {
    const fileName = (0, lodash_1.kebabCase)(componentName);
    return `export { ${componentName} } from "./${fileName}";
  `;
};
const generateConstants = (componentName) => {
    const lcName = (0, lodash_1.camelCase)(componentName);
    return `export const ${lcName}Constants = {
  testID: "${componentName}-container",
};
`;
};
const callWriteFile = (file, generateFunc) => {
    const content = generateFunc();
    const params = { fullCreateFilePath: file, content };
    (0, write_file_1.writeFile)(params);
    return null;
};
program
    .alias("rn")
    .argument("<componenetId>", "component id (eg: cool/story-bro)")
    .action((componenetId) => {
    const componentFilenameNoExt = (0, get_component_filename_1.getComponentFileName)(componenetId);
    const componentName = (0, lodash_1.upperFirst)((0, lodash_1.camelCase)(componentFilenameNoExt));
    const installPath = `${(0, process_1.cwd)()}/${componenetId}`;
    fs.mkdirSync(installPath, { recursive: true });
    callWriteFile(`${installPath}/${componentFilenameNoExt}.tsx`, () => generateComponent(componentName));
    callWriteFile(`${installPath}/${componentFilenameNoExt}.composition.tsx`, () => generateComp(componentName));
    callWriteFile(`${installPath}/${componentFilenameNoExt}.spec.tsx`, () => generateTest(componentName));
    callWriteFile(`${installPath}/${componentFilenameNoExt}.constants.ts`, () => generateConstants(componentName));
    callWriteFile(`${installPath}/index.ts`, () => generateIndex(componentName));
});
program.parse();
