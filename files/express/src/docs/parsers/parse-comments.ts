import { parse } from "comment-parser";
import { readFileSync } from "fs-extra";

export const parseComments = (): unknown => {
  const source = readFileSync(
    `${process.cwd()}/src/responses/success-response.ts`,
    { encoding: "utf-8" }
  );

  const parsed = parse(source);

  return parsed;
};
