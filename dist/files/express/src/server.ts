import express from "express";
import * as dotenvFlow from "dotenv-flow";
import * as dotenv from "dotenv";
import cors from "cors";
import { staticFilesDirectory } from "./constants/static-files-directory";
import { routes } from "./routes";

const app = express();

dotenvFlow.config();
dotenv.config();

const router = express.Router();
const port = process.env.PORT;

/** middleware */
app.use(express.static(staticFilesDirectory));
app.use(express.json());

/**
 * allow cors for all routes
 * http://expressjs.com/en/resources/middleware/cors.html
 */
app.use(cors());

/** routes */
app.use(routes());

/** instantiate router */
app.use("/", router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`service listening at http://localhost:${port}`);
});
