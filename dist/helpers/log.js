"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
/* eslint-disable no-console */
const chalk_1 = __importDefault(require("chalk"));
const log = (message, type) => {
    if (type === "success") {
        console.log(chalk_1.default.blue(message));
    }
    if (type === "error") {
        console.log(chalk_1.default.blue(message));
    }
    console.log(message);
};
exports.log = log;
