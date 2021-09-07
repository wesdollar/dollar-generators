const fs = require("fs");
const chalk = require("chalk");
const { log } = require("../dg-rn-doc");

const writeFile = (fullCreateFilePath, content) => {
  fs.writeFile(fullCreateFilePath, content, (err) => {
    if (err) {
      log(chalk.red(`could not create ${fullCreateFilePath}`));
      return log(chalk.yellow(err));
    }

    return log(chalk.blue(`created ${fullCreateFilePath}`));
  });
};
exports.writeFile = writeFile;
