/* eslint-disable require-await */
import express, { Request, Response, Router } from "express";
import { staticFilesDirectory } from "./constants/static-files-directory";

const apiVersion = "v1";

/** route declarations */
export const routes = (): Router => {
  const router = express.Router();

  router.get(`/`, (req: Request, res: Response) => {
    return res.sendFile(`${__dirname}/${staticFilesDirectory}/index.html`);
  });

  router.get(`/health-check`, (req: Request, res: Response) => {
    return res.json({ healthy: true });
  });

  return router;
};
