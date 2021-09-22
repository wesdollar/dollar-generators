"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitProps = void 0;
const splitProps = (props) => {
    const compiledProps = [];
    props.forEach((prop) => compiledProps.push(prop.split(":")));
    return compiledProps;
};
exports.splitProps = splitProps;
