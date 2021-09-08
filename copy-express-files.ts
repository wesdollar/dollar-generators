import { blue, red } from "chalk";
import fs from "fs-extra";

// Async with callbacks:
fs.copy("files", "dist/files", (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.error(red(err));
  }

  // eslint-disable-next-line no-console
  return console.log(blue("files copied successfully"));
});
