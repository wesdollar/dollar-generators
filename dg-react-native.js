#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { kebabCase, camelCase, upperFirst } = require("lodash");
const chalk = require("chalk");
const log = console.log;
const fs = require("fs");
const { cwd } = require("process");

const generateComponent = (componentName) => {
  return `import * as React from "react";
import { View } from "react-native";

interface ${componentName}Props {
  children: React.ReactNode;
}

export const ${componentName} = ({ children }: ${componentName}Props) => {
  return <View testID={\`${componentName}-container\`}>{children}</View>;
};
`;
};

const generateTest = (componentName) => {
  const fileName = kebabCase(componentName);

  return `import * as React from "react";
import { Basic${componentName} } from "./${fileName}.composition";
import { render } from "@testing-library/react-native";

it("should render", () => {
  const { getByTestId } = render(<Basic${componentName} />);
  const component = getByTestId("${componentName}-container");
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

export const Basic${componentName} = () => <${componentName} />;`;
};

const generateIndex = (componentName) => {
  const fileName = kebabCase(componentName);

  return `export { ${componentName} } from "./${fileName}";
  `;
};

const generateConstants = (componentName) => {
  const lcName = camelCase(componentName);

  return `export const ${lcName}Constants = {
  testID: "componentName",
};
`;
};

const writeFile = (file, generateFunc) => {
  const content = generateFunc();

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
  .action((name) => {
    name = upperFirst(camelCase(name));
    const fileName = kebabCase(name);
    const installPath = `${cwd()}/${fileName}`;

    fs.mkdirSync(installPath, { recursive: true });
    writeFile(`${installPath}/${fileName}.tsx`, () => generateComponent(name));
    writeFile(`${installPath}/${fileName}.composition.tsx`, () =>
      generateComp(name)
    );
    writeFile(`${installPath}/${fileName}.spec.tsx`, () => generateTest(name));
    writeFile(`${installPath}/${fileName}.constants.tsx`, () =>
      generateConstants(name)
    );
    writeFile(`${installPath}/index.ts`, () => generateIndex(name));
  });

program.parse();
