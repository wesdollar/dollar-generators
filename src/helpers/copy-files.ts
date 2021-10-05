import fs from "fs-extra";
import { exec } from "child_process";
import * as Spinnies from "spinnies";

const spinnies = new Spinnies.default({ color: "blue" });
const spinnerId = { express: "express-spinner", yarn: "yarn-spinner" };

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
    spinnies.add(spinnerId.express, { text: "Copying Express files..." });

    await fs.copy(`${sourceRoot}`, installPath);

    spinnies.succeed(spinnerId.express, { text: "Express files copied!" });

    if (npmInstall) {
      spinnies.add(spinnerId.yarn, { text: "Running yarn install..." });

      exec("yarn install", { cwd: installPath }, (err) => {
        if (err) {
          spinnies.fail(spinnerId.yarn, { text: "yarn install failed :(" });
        } else {
          spinnies.succeed(spinnerId.yarn, {
            text: "yarn install successful!",
          });
        }
      });
    }

    return true;
  } catch (error) {
    spinnies.fail(spinnerId.express, {
      text: "could not copy express files :(",
    });

    return false;
  }
};
