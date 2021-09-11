import { cwd } from "process";
import { FileExt, getComponentFileName } from "../get-component-filename";
import { getComponentRoot } from "../get-component-root";
import { makeDirectory } from "../make-directory";
import { writeFile } from "../write-file";
import { camelCase } from "lodash";

export const createRouteFile = (
  routeId: string,
  method?: string,
  extension?: FileExt
): void => {
  const routeFileName = `${camelCase(
    getComponentFileName(routeId, "", method)
  )}Route`;
  const content = `import { Request, Response } from "express";

export const ${routeFileName} = (req: Request, res: Response): Response => {
  return res.json({});
};
`;
  const filename = extension
    ? getComponentFileName(routeId, extension, method)
    : getComponentFileName(routeId, ".ts", method);

  const directoryPath = `${getComponentRoot(`${routeId}/${routeId}`)}`;

  const installDirectory = `${cwd()}/src/routes/${directoryPath}`;

  makeDirectory(installDirectory);
  writeFile({
    fullCreateFilePath: `${installDirectory}/${filename}`,
    content,
  });
};
