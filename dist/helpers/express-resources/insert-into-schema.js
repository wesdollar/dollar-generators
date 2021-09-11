"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertIntoSchema = void 0;
const lodash_1 = require("lodash");
const write_file_1 = require("../../helpers/write-file");
const fs_extra_1 = require("fs-extra");
const process_1 = require("process");
const get_model_name_1 = require("./get-model-name");
const insertIntoSchema = (resourceId, props) => {
  const modelName = (0, get_model_name_1.getModelName)(resourceId);
  const schemaPath = `${(0, process_1.cwd)()}/prisma/schema.prisma`;
  const schemaContent = (0, fs_extra_1.readFileSync)(schemaPath, {
    encoding: "utf-8",
  });
  const newProps = (props) => {
    const result = [];
    props.forEach((prop) => {
      const split = prop.split(":");
      const string = `${split[0]} ${(0, lodash_1.upperFirst)(split[1])}`;
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
    (0, write_file_1.writeFile)({ fullCreateFilePath: schemaPath, content });
  }
};
exports.insertIntoSchema = insertIntoSchema;
