import { writeFile } from "../write-file";
import { readFileSync } from "fs-extra";
import { cwd } from "process";

export const addRoute = (resourceId: string, method: string): void => {
  const routesSearchString = "/** end crud routes */";
  const routesPath = `${cwd()}/src/routes.ts`;
  const routeContent = `router.post(
  \`/\${apiVersion}/${resourceId}/${method}-${resourceId}\`,
  async (req: Request, res: Response) => createProspectRoute(req, res)
);
${routesSearchString}
`;

  const existingContent = readFileSync(routesPath, { encoding: "utf-8" });
  const updatedContent = existingContent.replace(
    routesSearchString,
    routeContent
  );

  writeFile({ fullCreateFilePath: routesPath, content: updatedContent });
};
