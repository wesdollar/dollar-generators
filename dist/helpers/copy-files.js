"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFiles = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const child_process_1 = require("child_process");
const chalk_1 = require("chalk");
const log_1 = require("./log");
/** recursively copies file from source to destination */
const copyFiles = (
/** directory to copy  */
sourceRoot, 
/** location to copy to */
installPath, 
/** run npm i after copying files */
npmInstall) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_extra_1.default.copy(`${sourceRoot}`, installPath);
        // eslint-disable-next-line no-console
        console.info((0, chalk_1.blue)(`copied files to ${installPath}`));
        if (npmInstall) {
            (0, child_process_1.exec)("npm i", { cwd: installPath }, (err) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    (0, log_1.log)((0, chalk_1.red)("npm i failed"));
                }
                else {
                    // eslint-disable-next-line no-console
                    (0, log_1.log)((0, chalk_1.blue)("npm packages installed"));
                }
            });
        }
        return true;
    }
    catch (error) {
        // eslint-disable-next-line no-console
        (0, log_1.log)((0, chalk_1.red)(`copy failed with error: ${error}`));
        return false;
    }
});
exports.copyFiles = copyFiles;
