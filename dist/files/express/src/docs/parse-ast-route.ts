import { Request, Response } from "express";
import { parsedSuccessResponse } from "./parsed/ast/parsed-success-response";
// import { parseAst } from "./parsers/parse-ast";

export const parseAstRoute = (req: Request, res: Response): Response => {
  const parsed = parsedSuccessResponse();

  return res.json(parsed);
};
