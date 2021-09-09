import { Request, Response } from "express";

export const getDemo = (req: Request, res: Response): Response => {
  return res.json({ hello: "world" });
};
