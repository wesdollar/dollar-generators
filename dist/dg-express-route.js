#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_route_file_1 = require("./helpers/express-resources/create-route-file");
const program = new commander_1.Command();
program
  .argument("<routeId>", "route id (eg: users/update-user)")
  .action((routeId) => (0, create_route_file_1.createRouteFile)(routeId));
program.parse();
