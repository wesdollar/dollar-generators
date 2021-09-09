"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const static_files_directory_1 = require("./constants/static-files-directory");
const middleware = (app) => {
    app.use(express_1.default.static(static_files_directory_1.staticFilesDirectory));
    /**
     * allow cors for all routes
     * http://expressjs.com/en/resources/middleware/cors.html
     */
    app.use((0, cors_1.default)());
    return;
};
exports.middleware = middleware;
