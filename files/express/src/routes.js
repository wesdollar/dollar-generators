"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const static_files_directory_1 = require("./constants/static-files-directory");
const get_demo_1 = require("./routes/get-demo");
/** route declarations */
const routes = () => {
    const router = express_1.default.Router();
    router.get(`/`, (req, res) => {
        return res.sendFile(`${__dirname}/${static_files_directory_1.staticFilesDirectory}/index.html`);
    });
    router.get("/demo-route", (req, res) => (0, get_demo_1.getDemo)(req, res));
    return router;
};
exports.routes = routes;
