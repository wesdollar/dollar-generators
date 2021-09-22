"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentFileName = void 0;
const pluralize_1 = __importDefault(require("pluralize"));
/** get the filename from the component id */
const getComponentFileName = (compId, ext, method) => {
    const _ext = ext || "";
    const split = compId.split("/");
    let path = split[split.length - 1];
    if (method) {
        path = `${method}-${pluralize_1.default.singular(path)}`;
    }
    return `${path}${_ext}`;
};
exports.getComponentFileName = getComponentFileName;
