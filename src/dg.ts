#!/usr/bin/env node
import { program } from "commander";

program
  .version("1.0.1")
  .description("generate boilerplates")
  .command("express", "scaffold express project")
  .command("react-native", "scaffold react native w/ TS")
  .alias("rn")
  .command("rn-doc", "generate RN docs for Docusaurus")
  .command("react", "scaffold react component")
  .command("cra", "Create React App plus goodies")
  .command("vscode", "add .vscode directory (opinionated)")
  .command("list", "list available generators", { isDefault: true });

program.parse(process.argv);
