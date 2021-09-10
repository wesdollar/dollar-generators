import * as fs from "fs-extra";
import { writeFile } from "./src/helpers/write-file";

const replaceToken = "%%VERSION%%";
const getPackageJson = () => fs.readJSONSync("package.json");

const getPackageVersion = (): string => {
  const data = getPackageJson();

  return data.version;
};

/** update dist/dg.js with correct version number */
export const updateCmdVersion = (): void => {
  const file = "dist/dg.js";
  const version = getPackageVersion();
  const string = fs.readFileSync(file, {
    encoding: "utf-8",
  });
  const newString = string.replace(replaceToken, version);

  writeFile({ fullCreateFilePath: file, content: newString });
};

updateCmdVersion();
