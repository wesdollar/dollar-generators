import pluralize from "pluralize";

export type FileExt = ".tsx" | ".ts" | "-route.ts" | ".md" | ".mdx" | "";

/** get the filename from the component id */
export const getComponentFileName = (
  compId: string,
  ext?: FileExt,
  method?: string
): string => {
  const _ext = ext || "";

  const split = compId.split("/");
  let path = split[split.length - 1];

  if (method) {
    path = `${method}-${pluralize.singular(path)}`;
  }

  return `${path}${_ext}`;
};
