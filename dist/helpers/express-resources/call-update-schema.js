"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callUpdateSchema = void 0;
const chalk_1 = require("chalk");
const shelljs_1 = require("shelljs");
const { log } = console;
const callUpdateSchema = () => (0, shelljs_1.exec)("npm run update-db-schema", (err) => {
    if (err) {
        // eslint-disable-next-line no-console
        log((0, chalk_1.red)("updating schema failed"));
    }
    else {
        // eslint-disable-next-line no-console
        log((0, chalk_1.blue)("schema updated"));
    }
});
exports.callUpdateSchema = callUpdateSchema;
