"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_route_1 = require("./add-route");
const write_file_1 = require("../write-file");
const fs_extra_1 = require("fs-extra");
const process_1 = require("process");
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
fs_extra_1.readFileSync.mockImplementation(() => readFileSyncRes);
write_file_1.writeFile.mockImplementation(() => writeFileRes);
process_1.cwd.mockImplementation(() => "dollar");
test("should fetch users", () => {
    (0, add_route_1.addRoute)(resourceId, resourceMethod);
    expect(write_file_1.writeFile).toHaveBeenCalledWith({
        content: routeContent,
        fullCreateFilePath: "dollar/src/routes.ts",
    });
});
