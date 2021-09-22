"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExistingImports = void 0;
const getExistingImports = (content) => {
    const regex = /{(.*?)\}/;
    const split = content.split(regex);
    // eslint-disable-next-line prefer-destructuring, no-magic-numbers
    const existingImports = split[1];
    return existingImports;
};
exports.getExistingImports = getExistingImports;
