"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDirectory = void 0;
const fs_1 = require("fs");
const log_1 = require("./log");
const makeDirectory = (directoryPath) => {
    if (!(0, fs_1.existsSync)(`${directoryPath}`)) {
        try {
            (0, fs_1.mkdirSync)(directoryPath, { recursive: true });
            (0, log_1.log)(`directory create ${directoryPath}`, "success");
        }
        catch (error) {
            (0, log_1.log)(`could not create directory ${directoryPath}`, "error");
            return null;
        }
        return null;
    }
    return null;
};
exports.makeDirectory = makeDirectory;
