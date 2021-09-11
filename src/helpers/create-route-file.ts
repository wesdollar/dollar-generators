import { blue } from "chalk";
import { cwd } from "process";
import { FileExt, getComponentFileName } from "./get-component-filename";
import { getComponentRoot } from "./get-component-root";
import { makeDirectory } from "./make-directory";
import { writeFile } from "./write-file";
import { camelCase } from "lodash";

const { log } = console;

export const createRouteFile = (routeId: string, extension?: FileExt): void => {
  const content = `import { Request, Response } from "express";

export const ${camelCase(
    getComponentFileName(routeId, "")
  )} = (req: Request, res: Response): Response => {
  return res.json({});
};
`;
  const filename = extension
    ? getComponentFileName(routeId, extension)
    : getComponentFileName(routeId, ".ts");
  const installDirectory = `${cwd()}/src/routes/${getComponentRoot(routeId)}`;

  makeDirectory(installDirectory);
  writeFile({
    fullCreateFilePath: `${installDirectory}/${filename}`,
    content,
  });

  log(blue(`created route ${routeId}`));
};
