import { upperFirst } from "lodash";
import { writeFile } from "../../helpers/write-file";
import { readFileSync } from "fs-extra";
import { cwd } from "process";
import { getModelName } from "./get-model-name";

export const insertIntoSchema = (resourceId: string, props: string[]): void => {
  const modelName = getModelName(resourceId);
  const schemaPath = `${cwd()}/prisma/schema.prisma`;
  const schemaContent = readFileSync(schemaPath, { encoding: "utf-8" });

  const newProps = (props) => {
    const result = [];

    props.forEach((prop) => {
      const split = prop.split(":");
      const string = `${split[0]} ${upperFirst(split[1])}`;

      result.push(string);
    });

    return result;
  };

  const newSchemaRecord = `
model ${modelName} {
id String @id @default(dbgenerated()) @map("_id") @db.ObjectId
${newProps(props).join("\n")}
}`;

  if (!schemaContent.includes(modelName)) {
    const content = `${schemaContent}

  ${newSchemaRecord}`;

    writeFile({ fullCreateFilePath: schemaPath, content });
  }
};
