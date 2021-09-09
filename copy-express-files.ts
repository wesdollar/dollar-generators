import { blue, red } from "chalk";
import fs from "fs-extra";

fs.copy("files", "dist/files", (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.error(red(err));
  }

  // eslint-disable-next-line no-console
  return console.log(blue("files copied successfully"));
});

fs.copy("package.json", "dist/package.json", (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.error(red(err));
  }

  // eslint-disable-next-line no-console
  return console.log(blue("files copied successfully"));
});
