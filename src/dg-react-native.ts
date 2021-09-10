#!/usr/bin/env node

import { Command } from "commander";
import { cwd } from "process";
import { kebabCase, camelCase, upperFirst } from "lodash";
import * as fs from "fs";
import { writeFile, Filename } from "./helpers/write-file";
import { getComponentFileName } from "./helpers/get-component-filename";

const program = new Command();

const generateComponent = (componentName: string): string => {
  const constantsName = `${camelCase(componentName)}Constants`;

  return `import * as React from "react";
import { View } from "react-native";
import { ${constantsName} } from "./${kebabCase(componentName)}.constants";

interface ${componentName}Props {
  children: string;
}

export const ${componentName} = ({ children }: ${componentName}Props) => {
  return <View testID={${constantsName}.testID}>{children}</View>;
};
`;
};

const generateTest = (componentName: string): string => {
  const fileName = kebabCase(componentName);
  const constantsName = `${camelCase(componentName)}Constants`;

  return `import * as React from "react";
import { Basic${componentName} } from "./${fileName}.composition";
import { render } from "@testing-library/react-native";
import { ${constantsName} } from "./${kebabCase(componentName)}.constants";

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

const generateComp = (componentName: string): string => {
  return `import * as React from "react";
import { ${componentName} } from ".";

export const Basic${componentName} = () => <${componentName}>Hello, World!</${componentName}>;`;
};

const generateIndex = (componentName: string): string => {
  const fileName = kebabCase(componentName);

  return `export { ${componentName} } from "./${fileName}";
  `;
};

const generateConstants = (componentName: string): string => {
  const lcName = camelCase(componentName);

  return `export const ${lcName}Constants = {
  testID: "${componentName}-container",
};
`;
};

const callWriteFile = (file: string, generateFunc: () => void): null => {
  const content = generateFunc() as unknown as string;
  const params: Filename = { fullCreateFilePath: file, content };

  writeFile(params);

  return null;
};

program
  .alias("rn")
  .argument("<componenetId>", "component id (eg: cool/story-bro)")
  .action((componenetId: string) => {
    const componentFilenameNoExt = getComponentFileName(componenetId);
    const componentName = upperFirst(camelCase(componentFilenameNoExt));
    const installPath = `${cwd()}/${componenetId}`;

    fs.mkdirSync(installPath, { recursive: true });

    callWriteFile(`${installPath}/${componentFilenameNoExt}.tsx`, () =>
      generateComponent(componentName)
    );
    callWriteFile(
      `${installPath}/${componentFilenameNoExt}.composition.tsx`,
      () => generateComp(componentName)
    );
    callWriteFile(`${installPath}/${componentFilenameNoExt}.spec.tsx`, () =>
      generateTest(componentName)
    );
    callWriteFile(`${installPath}/${componentFilenameNoExt}.constants.ts`, () =>
      generateConstants(componentName)
    );
    callWriteFile(`${installPath}/index.ts`, () =>
      generateIndex(componentName)
    );
  });

program.parse();
