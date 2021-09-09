#!/usr/bin/env node
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
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const chalk_1 = require("chalk");
const fs_extra_1 = __importDefault(require("fs-extra"));
const { log } = console;
const program = new commander_1.Command();
program.option("-p, --path <path>", "install path");
program.parse(process.argv);
const options = program.opts();
const copyFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const installPath = options.path
        ? `${process.cwd()}/${options.path}`
        : process.cwd();
    const modulePath = __dirname;
    try {
        const results = yield fs_extra_1.default.copy(`${modulePath}/files/express`, installPath);
        // eslint-disable-next-line no-console
        console.info((0, chalk_1.blue)(`copied ${(_a = results) === null || _a === void 0 ? void 0 : _a.length} files`));
        (0, child_process_1.exec)("npm i", { cwd: installPath }, (err) => {
            if (err) {
                // eslint-disable-next-line no-console
                log((0, chalk_1.red)("npm i failed"));
            }
            else {
                // eslint-disable-next-line no-console
                log((0, chalk_1.blue)("npm packages installed"));
            }
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        log((0, chalk_1.red)(`copy failed with error: ${error}`));
    }
});
copyFiles();
