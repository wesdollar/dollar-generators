import * as fs from "fs";
import { log } from "./log";

export interface Filename {
  /** path, filename, and ext for file to be created */
  fullCreateFilePath: string;
  /** content of file */
  content: string;
}

/** writes a file to the specific path & filename */
export const writeFile = ({ fullCreateFilePath, content }: Filename): null => {
  fs.writeFile(fullCreateFilePath, content, (err: any) => {
    if (err) {
      log(`could not create ${fullCreateFilePath}`, "error");
      log(err, "warning");

      return null;
    }

    return log(`created ${fullCreateFilePath}`, "success");
  });

  return null;
};
