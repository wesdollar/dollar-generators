const chalk = require("chalk");

export const log = (message, color) => {
  if (color) {
    return console.log(chalk(message));
  }

  return console.log(message);
};
