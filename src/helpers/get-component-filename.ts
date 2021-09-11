export type FileExt = ".tsx" | ".ts" | "-route.ts" | ".md" | ".mdx" | "";

/** get the filename from the component id */
export const getComponentFileName = (compId: string, ext?: FileExt): string => {
  const _ext = ext || "";

  const split = compId.split("/");
  const path = split[split.length - 1];

  return `${path}${_ext}`;
};
