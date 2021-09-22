import { Request, Response } from "express";
import { parse } from "comment-parser";
import { readFileSync } from "fs-extra";

export const parseCommentsRoute = (req: Request, res: Response): Response => {
  const source = readFileSync(
    `${process.cwd()}/src/responses/success-response.ts`,
    { encoding: "utf-8" }
  );

  const parsed = parse(source);

  return res.json(parsed);
};
