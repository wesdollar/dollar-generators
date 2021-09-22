/* eslint-disable require-await */
import express, { Request, Response, Router } from "express";
import { staticFilesDirectory } from "./constants/static-files-directory";
import { parseAstRoute } from "./docs/parse-ast-route";
import { parseCommentsRoute } from "./docs/parse-comments-route";
import { createProspectRoute } from "./routes/prospects/create-prospect-route";
import { createSignatureRoute } from "./routes/signatures/create-signature-route";
import { readSignatureRoute } from "./routes/signatures/read-signature-route";

const apiVersion = "v1";

/** route declarations */
export const routes = (): Router => {
  const router = express.Router();

  router.get(`/`, (req: Request, res: Response) => {
    return res.sendFile(`${__dirname}/${staticFilesDirectory}/index.html`);
  });

  router.get(`/parse-ast`, (req: Request, res: Response) =>
    parseAstRoute(req, res)
  );

  router.get(`/parse-comments`, (req: Request, res: Response) =>
    parseCommentsRoute(req, res)
  );

  /** crud routes */
  router
    .route(`/${apiVersion}/signatures/:token?`)
    .get(async (req: Request, res: Response) => readSignatureRoute(req, res))
    .post(async (req: Request, res: Response) =>
      createSignatureRoute(req, res)
    );

  router.post(
    `/${apiVersion}/prospects/create-prospect`,
    async (req: Request, res: Response) => createProspectRoute(req, res)
  );
  /** end crud routes */

  return router;
};
