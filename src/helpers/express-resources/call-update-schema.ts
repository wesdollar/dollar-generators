import { blue, red } from "chalk";
import { exec } from "shelljs";

const { log } = console;

export const callUpdateSchema = () =>
  exec("npm run update-db-schema", (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      log(red("updating schema failed"));
    } else {
      // eslint-disable-next-line no-console
      log(blue("schema updated"));
    }
  });
