#!/usr/bin/env node
import { Command } from "commander";
import { blue } from "chalk";
import { cwd } from "process";
import { getComponentFileName } from "./helpers/get-component-filename";
import { getComponentRoot } from "./helpers/get-component-root";
import { makeDirectory } from "./helpers/make-directory";
import { writeFile } from "./helpers/write-file";
import { camelCase } from "lodash";

const { log } = console;
const program = new Command();

program
  .argument("<routeId>", "route id (eg: createSomethingRoute)")
  .action((routeId) => {
    const content = `import { Request, Response } from "express";

export const ${camelCase(
      getComponentFileName(routeId, "")
    )} = (req: Request, res: Response): Response => {
  return res.json({});
};
`;
    const filename = getComponentFileName(routeId, ".ts");
    const installDirectory = `${cwd()}/src/routes/${getComponentRoot(routeId)}`;

    makeDirectory(installDirectory);
    writeFile({
      fullCreateFilePath: `${installDirectory}/${filename}`,
      content,
    });

    return log(blue(`created route ${routeId}`));
  });

program.parse();
