/** get the directory path from component id */
export const getComponentRoot = (compId: string): string => {
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
