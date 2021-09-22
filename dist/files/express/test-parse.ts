// import { parse } from "@typescript-eslint/typescript-estree";
import { parse } from "comment-parser/lib";
import { readFileSync } from "fs-extra";

const source = readFileSync(
  `${process.cwd()}/src/responses/success-response.ts`,
  { encoding: "utf-8" }
);

// eslint-disable-next-line no-unused-vars
const parsed = parse(source);
