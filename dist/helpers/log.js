"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log = (message, type) => {
    if (type === "success") {
        console.log(chalk_1.default.blue(message));
        return null;
    }
    if (type === "error") {
        console.log(chalk_1.default.blue(message));
        return null;
    }
    console.log(message);
    return null;
};
exports.log = log;
