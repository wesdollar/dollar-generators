---
sidebar_label: "Generators"
sidebar_position: 2
---

# Generators

import { CommandWithDescription } from "../src/components/CommandWithDescription"
import { Space } from "@wesdollar/dollar-ui.ui.space"

We leverage DG CLI to scaffold files. This helps enforce naming conventions across projects and provides a better, faster developer experience. Please use DG CLI when creating components and associate doc file.

### Install DG CLI

<CommandWithDescription command="npm i -g @dollarcode/dollar-generators" description="Readme for DG CLI is available in the <a href='https://github.com/wesdollar/dollar-generators'>GitHub repo</a> or on <a href='https://www.npmjs.com/package/@dollarcode/dollar-generators'>NPM registry</a>." />

### List All Commands

<CommandWithDescription command="dg list" description="Lists all commands" />

### Generate Docs

<CommandWithDescription command="dg rn-doc component/id" description="Generates the documentation markdown file for the component based on the component ID." />
