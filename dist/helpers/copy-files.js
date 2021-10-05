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
const Spinnies = __importStar(require("spinnies"));
const spinnies = new Spinnies.default({ color: "blue" });
const spinnerId = { express: "express-spinner", yarn: "yarn-spinner" };
/** recursively copies file from source to destination */
const copyFiles = (
/** directory to copy  */
sourceRoot, 
/** location to copy to */
installPath, 
/** run npm i after copying files */
npmInstall) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        spinnies.add(spinnerId.express, { text: "Copying Express files..." });
        yield fs_extra_1.default.copy(`${sourceRoot}`, installPath);
        spinnies.succeed(spinnerId.express, { text: "Express files copied!" });
        if (npmInstall) {
            (0, child_process_1.exec)("yarn install", { cwd: installPath }, (err) => {
                spinnies.add(spinnerId.yarn, { text: "Running yarn install..." });
                if (err) {
                    spinnies.fail(spinnerId.yarn, { text: "yarn install failed :(" });
                }
                else {
                    spinnies.succeed(spinnerId.yarn, {
                        text: "yarn install successful!",
                    });
                }
            });
        }
        return true;
    }
    catch (error) {
        spinnies.fail(spinnerId.express, {
            text: "could not copy express files :(",
        });
        return false;
    }
});
exports.copyFiles = copyFiles;
