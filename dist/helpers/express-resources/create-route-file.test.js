"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const write_file_1 = require("../write-file");
const create_route_file_1 = require("./create-route-file");
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
  (0, create_route_file_1.createRouteFile)(routeId, "create", "-route.ts");
  const obj = {
    fullCreateFilePath: modelsFullCreateFilePath,
    content: modelsContent,
  };
  expect(write_file_1.writeFile).toBeCalledWith(obj);
});
