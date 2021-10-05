import express from "express";
import * as dotenvFlow from "dotenv-flow";
import cors from "cors";
import * as StaticFilesConstants from "./constants/static-files-directory";
import * as Routes from "./routes";

const app = express();

app.disable("x-powered-by");

dotenvFlow.config({ silent: true });

const router = express.Router();
const port = process.env.PORT;
const urlBase = process.env.APP_URL_BASE || "";

/** middleware */
app.use(express.static(StaticFilesConstants.staticFilesDirectory));
app.use(express.json());

/**
 * allow cors for all routes
 * http://expressjs.com/en/resources/middleware/cors.html
 */
app.use(cors());

/** routes */
app.use(urlBase, Routes.routes());

/** instantiate router */
app.use("/", router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`service listening at http://localhost:${port}`);
});
