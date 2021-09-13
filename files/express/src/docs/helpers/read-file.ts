import { readFileSync } from "fs";

export const readFile = (filePath: string): string => {
  const source = readFileSync(`${filePath}`, {
    encoding: "utf-8",
  });

  return source;
};
