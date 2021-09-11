#!/usr/bin/env node
import { Command } from "commander";
import { createRouteFile } from "./helpers/express-resources/create-route-file";

const program = new Command();

program
  .argument("<routeId>", "route id (eg: users/update-user)")
  .action((routeId) => createRouteFile(routeId));

program.parse();
