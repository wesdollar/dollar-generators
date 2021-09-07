const fs = require("fs");
const chalk = require("chalk");
const { log } = require("../dg-rn-doc");

const makeDirectory = (directoryPath) => {
  if (!fs.existsSync(`${directoryPath}`)) {
    fs.mkdirSync(directoryPath, { recursive: true }, (err) => {
      if (err) {
        return console.error("could not create directory ", directoryPath);
      }

      log(chalk.blue(`created ${directoryPath}`));
    });
  }
};

exports.makeDirectory = makeDirectory;
