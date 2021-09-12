import { existsSync, mkdirSync } from "fs";
import { log } from "./log";

export const makeDirectory = (directoryPath: string): null => {
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
