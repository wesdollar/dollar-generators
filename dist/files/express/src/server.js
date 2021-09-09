"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenvFlow = __importStar(require("dotenv-flow"));
const cors_1 = __importDefault(require("cors"));
const static_files_directory_1 = require("./constants/static-files-directory");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
dotenvFlow.config();
const router = express_1.default.Router();
const port = process.env.PORT;
/** middleware */
app.use(express_1.default.static(static_files_directory_1.staticFilesDirectory));
/**
 * allow cors for all routes
 * http://expressjs.com/en/resources/middleware/cors.html
 */
app.use((0, cors_1.default)());
/** routes */
app.use((0, routes_1.routes)());
/** instantiate router */
app.use("/", router);
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`service listening at http://localhost:${port}`);
});
