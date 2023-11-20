#!/usr/bin/env node

import { Command } from "commander";
import { cwd } from "process";
import { kebabCase, camelCase, upperFirst } from "lodash";
import * as fs from "fs";
import { writeFile, Filename } from "./helpers/write-file";
import { getComponentFileName } from "./helpers/get-component-filename";

const program = new Command();

const generateComponent = (componentName: string): string => {
  return `export const ${componentName} = () => {
  return <div data-testid={"${componentName}"}>${componentName}</div>;
};
`;
};

const generateTest = (componentName: string): string => {
  const fileName = kebabCase(componentName);

  return `import { render, screen } from "@testing-library/react";
import { ${componentName} } from "./${fileName}";

test("renders ${componentName}", () => {
  render(<${componentName} />);

  const element = screen.getByTestId("${componentName}");

  expect(element).toBeTruthy();
});
`;
};

const generateIndex = (componentName: string): string => {
  const fileName = kebabCase(componentName);

  return `export { ${componentName} } from "./${fileName}";
`;
};

const callWriteFile = (file: string, generateFunc: () => void): null => {
  const content = generateFunc() as unknown as string;
  const params: Filename = { fullCreateFilePath: file, content };

  writeFile(params);

  return null;
};

program
  .alias("react-ts")
  .argument("<componenetId>", "component id (eg: cool/story-bro)")
  .action((componenetId: string) => {
    const componentFilenameNoExt = getComponentFileName(componenetId);
    const componentName = upperFirst(camelCase(componentFilenameNoExt));
    const installPath = `${cwd()}/${componenetId}`;

    fs.mkdirSync(installPath, { recursive: true });

    callWriteFile(`${installPath}/${componentFilenameNoExt}.tsx`, () =>
      generateComponent(componentName)
    );
    callWriteFile(`${installPath}/${componentFilenameNoExt}.test.tsx`, () =>
      generateTest(componentName)
    );
    callWriteFile(`${installPath}/index.ts`, () =>
      generateIndex(componentName)
    );
  });

program.parse();
