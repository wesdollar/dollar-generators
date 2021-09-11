import { splitProps } from "./split-props";

const props = ["name:string", "pin:number"];
const compiledProps = splitProps(props);

test("returns an array with length of two", () => {
  // eslint-disable-next-line no-magic-numbers
  expect(compiledProps.length).toEqual(2);
});

test("returns array of arrays matching props", () => {
  expect(compiledProps[0]).toEqual(["name", "string"]);
});

test("returns array of arrays matching props", () => {
  expect(compiledProps[1]).toEqual(["pin", "number"]);
});
