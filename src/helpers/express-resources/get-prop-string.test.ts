import { getPropString } from "./get-prop-string";

const props = ["name:string", "pin:number"];

it("should return string with comma separated list", () => {
  const result = getPropString(props);

  expect(result).toEqual("name, pin");
});
