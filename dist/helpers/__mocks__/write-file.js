"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const { log } = console;
const fs = {
  writeFile: (fullCreateFilePath, content, err) =>
    log(fullCreateFilePath, content, err),
};
const writeFile = ({ fullCreateFilePath, content }) => {
  fs.writeFile(fullCreateFilePath, content, (err) => {
    if (err) {
      log(`could not create ${fullCreateFilePath}`, "error");
      log(err, "warning");
      return null;
    }
    return log(`created ${fullCreateFilePath}`, "success");
  });
  return null;
};
exports.writeFile = writeFile;
