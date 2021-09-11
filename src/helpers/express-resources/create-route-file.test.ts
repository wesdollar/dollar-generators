import { cwd } from "process";
import { FileExt, getComponentFileName } from "../get-component-filename";
import { getComponentRoot } from "../get-component-root";
import { makeDirectory } from "../make-directory";
import { writeFile } from "../write-file";
import { camelCase } from "lodash";
import { createRouteFile } from "./create-route-file";

jest.mock("process", () => ({
  cwd: jest.fn().mockReturnValue(""),
}));

jest.mock("../../helpers/write-file", () => ({
  writeFile: jest.fn(),
}));

jest.mock("../make-directory", () => ({
  makeDirectory: jest.fn(),
}));

const routeId = "dollars";

const modelsFullCreateFilePath = "/src/routes/dollars/create-dollar-route.ts";
const modelsContent = `import { Request, Response } from "express";

export const createDollarRoute = (req: Request, res: Response): Response => {
  return res.json({});
};
`;

test("writes models correctly", () => {
  createRouteFile(routeId, "create", "-route.ts");

  const obj = {
    fullCreateFilePath: modelsFullCreateFilePath,
    content: modelsContent,
  };

  expect(writeFile).toBeCalledWith(obj);
});
