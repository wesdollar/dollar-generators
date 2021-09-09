"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentRoot = void 0;
/** get the directory path from component id */
const getComponentRoot = (compId) => {
    const split = compId.split("/");
    const splitLength = split.length;
    const pathArray = [];
    split.forEach((path, index) => {
        if (index + 1 < splitLength) {
            pathArray.push(path);
        }
    });
    return pathArray.join("/");
};
exports.getComponentRoot = getComponentRoot;
