import express, { Express } from "express";
import cors from "cors";
import { staticFilesDirectory } from "./constants/static-files-directory";

export const middleware = (app: Express): Express => {
  app.use(express.static(staticFilesDirectory));

  /**
   * allow cors for all routes
   * http://expressjs.com/en/resources/middleware/cors.html
   */
  app.use(cors());

  return;
};
