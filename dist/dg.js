#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_extra_1 = require("fs-extra");
function example() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { version, description } = yield (0, fs_extra_1.readJson)("package.json");
            commander_1.program
                .version(version)
                .description(description)
                .command("express", "scaffold express project")
                .command("react-native", "scaffold react native w/ TS")
                .alias("rn")
                .command("rn-doc", "generate RN docs for Docusaurus")
                .command("react", "scaffold react component")
                .command("cra", "Create React App plus goodies")
                .command("vscode", "add .vscode directory (opinionated)")
                .command("list", "list available generators", { isDefault: true });
            commander_1.program.parse(process.argv);
        }
        catch (err) {
            console.error(err);
        }
    });
}
example();
