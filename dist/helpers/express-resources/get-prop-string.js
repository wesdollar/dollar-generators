"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropString = void 0;
/** snag just the comma separated props without types */
const getPropString = (compiledProps) => {
    const array = [];
    compiledProps.forEach((prop) => {
        const split = prop.split(":");
        array.push(split[0]);
    });
    return array.join(", ");
};
exports.getPropString = getPropString;
