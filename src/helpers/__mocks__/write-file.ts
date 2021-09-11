import { Filename } from "../write-file";

const { log } = console;

const fs = {
  writeFile: (fullCreateFilePath, content, err: unknown) =>
    log(fullCreateFilePath, content, err),
};

export const writeFile = ({ fullCreateFilePath, content }: Filename): null => {
  fs.writeFile(fullCreateFilePath, content, (err: any) => {
    if (err) {
      log(`could not create ${fullCreateFilePath}`, "error");
      log(err, "warning");

      return null;
    }

    return log(`created ${fullCreateFilePath}`, "success");
  });

  return null;
};
