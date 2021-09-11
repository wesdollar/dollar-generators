#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = require("chalk");
const create_route_file_1 = require("./helpers/create-route-file");
const insert_into_schema_1 = require("./helpers/express-resources/insert-into-schema");
const create_model_file_1 = require("./helpers/express-resources/create-model-file");
const add_type_declaration_1 = require("./helpers/express-resources/add-type-declaration");
const add_route_1 = require("./helpers/express-resources/add-route");
const call_update_schema_1 = require("./helpers/express-resources/call-update-schema");
const { log } = console;
const program = new commander_1.Command();
program
  .argument("<resourceId>", "resource id (plural, eg: users)")
  .requiredOption(
    "-p, --props <props...>",
    "model props (-p name:string pin:number)"
  )
  .action((resourceId, { props }) => {
    const methods = ["create", "read", "update", "delete"];
    methods.forEach((method) => {
      (0, create_route_file_1.createRouteFile)(
        `${method}-${resourceId}`,
        "-route.ts"
      );
      (0, create_model_file_1.createModelFile)(resourceId, method, props);
      (0, add_type_declaration_1.addTypeDeclaration)(resourceId);
      (0, add_route_1.addRoute)(resourceId, method);
      (0, insert_into_schema_1.insertIntoSchema)(resourceId, props);
    });
    (0, call_update_schema_1.callUpdateSchema)();
    log((0, chalk_1.blue)(`created resource ${resourceId}`));
  });
program.parse();
// dg express-resource users -p=user,
