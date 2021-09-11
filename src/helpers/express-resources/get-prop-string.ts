/** snag just the comma separated props without types */
export const getPropString = (compiledProps: string[]): string => {
  const array = [];

  compiledProps.forEach((prop: string) => {
    const split = prop.split(":");

    array.push(split[0]);
  });

  return array.join(", ");
};
