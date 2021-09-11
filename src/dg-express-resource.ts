#!/usr/bin/env node
import { Command } from "commander";
import { blue } from "chalk";
import { createRouteFile } from "./helpers/express-resources/create-route-file";
import { insertIntoSchema } from "./helpers/express-resources/insert-into-schema";
import { createModelFile } from "./helpers/express-resources/create-model-file";
import { addTypeDeclaration } from "./helpers/express-resources/add-type-declaration";
import { addRoute } from "./helpers/express-resources/add-route";
import { callUpdateSchema } from "./helpers/express-resources/call-update-schema";

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
      createRouteFile(`${method}-${resourceId}`, method, "-route.ts");
      createModelFile(resourceId, method, props);
      addTypeDeclaration(resourceId);
      insertIntoSchema(resourceId, props);
      addRoute(resourceId, method);
    });

    callUpdateSchema();

    log(blue(`created resource ${resourceId}`));
  });

program.parse();
// dg express-resource users -p=user,
