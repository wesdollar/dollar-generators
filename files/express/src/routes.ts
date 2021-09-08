import express, { Request, Response, Router } from "express";
import { staticFilesDirectory } from "./constants/static-files-directory";
import { getDemo } from "./routes/get-demo";

/** route declarations */
export const routes = (): Router => {
  const router = express.Router();

  router.get(`/`, (req: Request, res: Response) => {
    return res.sendFile(`${__dirname}/${staticFilesDirectory}/index.html`);
  });

  router.get("/demo-route", (req: Request, res: Response) => getDemo(req, res));

  return router;
};
