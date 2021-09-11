import * as fs from "fs";
import { log } from "./log";

export interface Filename {
  /** path, filename, and ext for file to be created */
  fullCreateFilePath: string;
  /** content of file */
  content: string;
}

/** writes a file to the specific path & filename */
export const writeFile = ({ fullCreateFilePath, content }: Filename): void => {
  try {
    fs.writeFileSync(fullCreateFilePath, content);

    log(`created ${fullCreateFilePath}`, "success");
  } catch (error) {
    log(`failed to create ${fullCreateFilePath}`, "error");
  }
};
