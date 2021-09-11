import { addRoute } from "./add-route";
import { writeFile } from "../write-file";
import { readFileSync } from "fs-extra";
import { cwd } from "process";

jest.mock("../write-file", () => ({
  writeFile: jest.fn(),
}));

jest.mock("fs-extra", () => ({
  readFileSync: jest.fn(),
}));

jest.mock("process", () => ({
  cwd: jest.fn(),
}));

const routesSearchString = "/** end crud routes */";
const resourceId = "dollars";
const resourceMethod = "create";
const writeFileRes = ".";
const readFileSyncRes = `
something
something
/** end crud routes */
`;

const routeContent = `
something
something
router.post(
  \`/\${apiVersion}/${resourceId}/${resourceMethod}-${resourceId}\`,
  async (req: Request, res: Response) => createProspectRoute(req, res)
);
${routesSearchString}

`;

(readFileSync as unknown as jest.Mock).mockImplementation(
  () => readFileSyncRes
);
(writeFile as unknown as jest.Mock).mockImplementation(() => writeFileRes);
(cwd as unknown as jest.Mock).mockImplementation(() => "dollar");

test("should fetch users", () => {
  addRoute(resourceId, resourceMethod);

  expect(writeFile).toHaveBeenCalledWith({
    content: routeContent,
    fullCreateFilePath: "dollar/src/routes.ts",
  });
});
