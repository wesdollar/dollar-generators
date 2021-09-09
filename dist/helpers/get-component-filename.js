"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentFileName = void 0;
/** get the filename from the component id */
const getComponentFileName = (compId, ext) => {
    const _ext = ext || "";
    const split = compId.split("/");
    const path = split[split.length - 1];
    return `${path}${_ext}`;
};
exports.getComponentFileName = getComponentFileName;
