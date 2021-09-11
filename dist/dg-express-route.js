#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const createRouteFile_1 = require("./createRouteFile");
const program = new commander_1.Command();
program
    .argument("<routeId>", "route id (eg: users/update-user)")
    .action((routeId) => (0, createRouteFile_1.createRouteFile)(routeId));
program.parse();
