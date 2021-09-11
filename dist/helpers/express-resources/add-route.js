"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoute = void 0;
const write_file_1 = require("../write-file");
const fs_extra_1 = require("fs-extra");
const process_1 = require("process");
const addRoute = (resourceId, method) => {
  let routerMethod;
  switch (method) {
    case "create":
      routerMethod = "post";
      break;
    case "read":
      routerMethod = "get";
      break;
    case "update":
      routerMethod = "put";
      break;
    case "delete":
      routerMethod = "delete";
      break;
    default:
      routerMethod = "get";
      break;
  }
  const routesSearchString = "/** end crud routes */";
  const routesPath = `${(0, process_1.cwd)()}/src/routes.ts`;
  const routeContent = `router.${routerMethod}(
  \`/\${apiVersion}/${resourceId}/${method}-${resourceId}\`,
  async (req: Request, res: Response) => createProspectRoute(req, res)
);
${routesSearchString}
`;
  const existingContent = (0, fs_extra_1.readFileSync)(routesPath, {
    encoding: "utf-8",
  });
  const updatedContent = existingContent.replace(
    routesSearchString,
    routeContent
  );
  (0, write_file_1.writeFile)({
    fullCreateFilePath: routesPath,
    content: updatedContent,
  });
};
exports.addRoute = addRoute;
