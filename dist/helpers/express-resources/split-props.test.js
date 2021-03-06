"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const split_props_1 = require("./split-props");
const props = ["name:string", "pin:number"];
const compiledProps = (0, split_props_1.splitProps)(props);
test("returns an array with length of two", () => {
    // eslint-disable-next-line no-magic-numbers
    expect(compiledProps.length).toEqual(2);
});
test("returns array of arrays matching props", () => {
    expect(compiledProps[0]).toEqual(["name", "string"]);
});
test("returns array of arrays matching props", () => {
    // eslint-disable-next-line no-magic-numbers
    expect(compiledProps[1]).toEqual(["pin", "number"]);
});
