"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_prop_string_1 = require("./get-prop-string");
const props = ["name:string", "pin:number"];
it("should return string with comma separated list", () => {
    const result = (0, get_prop_string_1.getPropString)(props);
    expect(result).toEqual("name, pin");
});
