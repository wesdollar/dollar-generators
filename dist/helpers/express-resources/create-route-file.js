"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouteFile = void 0;
const process_1 = require("process");
const get_component_filename_1 = require("../get-component-filename");
const get_component_root_1 = require("../get-component-root");
const make_directory_1 = require("../make-directory");
const write_file_1 = require("../write-file");
const lodash_1 = require("lodash");
const createRouteFile = (routeId, method, extension) => {
  const routeFileName = `${(0, lodash_1.camelCase)(
    (0, get_component_filename_1.getComponentFileName)(routeId, "", method)
  )}Route`;
  const content = `import { Request, Response } from "express";

export const ${routeFileName} = (req: Request, res: Response): Response => {
  return res.json({});
};
`;
  const filename = extension
    ? (0, get_component_filename_1.getComponentFileName)(
        routeId,
        extension,
        method
      )
    : (0, get_component_filename_1.getComponentFileName)(
        routeId,
        ".ts",
        method
      );
  const directoryPath = `${(0, get_component_root_1.getComponentRoot)(
    `${routeId}/${routeId}`
  )}`;
  const installDirectory = `${(0,
  process_1.cwd)()}/src/routes/${directoryPath}`;
  (0, make_directory_1.makeDirectory)(installDirectory);
  (0, write_file_1.writeFile)({
    fullCreateFilePath: `${installDirectory}/${filename}`,
    content,
  });
};
exports.createRouteFile = createRouteFile;
