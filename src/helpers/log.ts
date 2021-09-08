import chalk from "chalk";

type Type = "success" | "error" | "warning";

export const log = (message: string, type?: Type): null => {
  if (type === "success") {
    console.log(chalk.blue(message));

    return null;
  }

  if (type === "error") {
    console.log(chalk.blue(message));

    return null;
  }

  console.log(message);

  return null;
};
