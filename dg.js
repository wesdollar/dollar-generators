#!/usr/bin/env node
const { program } = require("commander");
const { version, description } = require("./package.json");

program
  .version(version)
  .description(description)
  .command("express", "scaffold express project")
  .command("list", "list available generators", { isDefault: true });

program.parse(process.argv);
