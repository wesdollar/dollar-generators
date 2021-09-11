#!/usr/bin/env node
import { Command } from "commander";
import { blue, red } from "chalk";
import { createRouteFile } from "./helpers/create-route-file";
import { exec } from "shelljs";
import { insertIntoSchema } from "./helpers/express-resources/insert-into-schema";
import { createModelFile } from "./helpers/express-resources/create-model-file";
import { addTypeDeclaration } from "./helpers/express-resources/add-type-declaration";
import { addRoute } from "./helpers/express-resources/add-route";

const { log } = console;
const program = new Command();

program
  .argument("<resourceId>", "resource id (plural, eg: users)")
  .requiredOption(
    "-p, --props <props...>",
    "model props (-p name:string pin:number)"
  )
  .action((resourceId, { props }) => {
    const methods = ["create", "read", "update", "delete"];

    methods.forEach((method) => {
      createRouteFile(`${method}-${resourceId}`, "-route.ts");
      createModelFile(resourceId, method, props);
      addTypeDeclaration(resourceId);
      addRoute(resourceId, method);
      insertIntoSchema(resourceId, props);
    });

    exec("npm run update-db-schema", (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        log(red("updating schema failed"));
      } else {
        // eslint-disable-next-line no-console
        log(blue("schema updated"));
      }
    });

    log(blue(`created resource ${resourceId}`));
  });

program.parse();
// dg express-resource users -p=user,
