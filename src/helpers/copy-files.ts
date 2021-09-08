import fs from "fs-extra";
import { exec } from "child_process";
import { red, blue } from "chalk";
import { log } from "./log";

/** recursively copies file from source to destination */
export const copyFiles = async (
  /** directory to copy  */
  sourceRoot: string,
  /** location to copy to */
  installPath: string,
  /** run npm i after copying files */
  npmInstall?: boolean
): Promise<boolean> => {
  try {
    await fs.copy(`${sourceRoot}`, installPath);

    // eslint-disable-next-line no-console
    console.info(blue(`copied files to ${installPath}`));

    if (npmInstall) {
      exec("npm i", { cwd: installPath }, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          log(red("npm i failed"));
        } else {
          // eslint-disable-next-line no-console
          log(blue("npm packages installed"));
        }
      });
    }

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    log(red(`copy failed with error: ${error}`));

    return false;
  }
};
