/* eslint-disable no-console */
import chalk from "chalk";

type LogType = "success" | "error" | "warning";

export const log = (message: string, type?: LogType): void => {
  if (type === "success") {
    console.log(chalk.blue(message));
  }

  if (type === "error") {
    console.log(chalk.blue(message));
  }

  console.log(message);
};
