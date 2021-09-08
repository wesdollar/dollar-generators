import { existsSync, mkdirSync } from "fs";
import { log } from "./log";

const makeDirectory = (directoryPath: string): null => {
  if (!existsSync(`${directoryPath}`)) {
    try {
      mkdirSync(directoryPath, { recursive: true });
      log(`directory create ${directoryPath}`, "success");
    } catch (error) {
      log(`could not create directory ${directoryPath}`, "error");

      return null;
    }

    return null;
  }

  return null;
};

const _makeDirectory = makeDirectory;

export { _makeDirectory as makeDirectory };
