export const getExistingImports = (content: string): string => {
  const regex = /{(.*?)\}/;
  const split = content.split(regex);

  // eslint-disable-next-line prefer-destructuring, no-magic-numbers
  const existingImports = split[1];

  return existingImports;
};
