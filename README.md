<div>

![Dollar Generators](icon-144.png)

</div>

### Dollar Generators

Scaffolds for things we do everyday as devs.

`npm i -g @dollarcode/dollar-generators`

- Generate an Express service
- Create React Native component (with TypeScript & test)
- Create React component (without TypeScript)
- Configure VS Code

**Express**

| option | shortcut | description                  |
| ------ | -------- | ---------------------------- |
| --path | -p       | installation path (relative) |

<br />

`dg express`<br />
Installs in current working directory (`./`)

`dg express -p test`<br />
Installs in `test` directory inside current working directory (`./tests`)

**React Native**

`dg rn my-component` or `dg react-native my-component`
Scaffolds out a React Native with TypeScript. The component will be created in a directory of the same name within the current working directory, so be sure to `cd` into the directory you want the new directory to be created in.

The file structure matches the expectations and conventions of Bit.dev. The following files are created:

- index.ts
- my-component.tsx
- my-component.spec.tsx
- my-component.composition.tsx

**React**

`dg cra project-name`<br />
Creates a React project using Create React App. Like CRA, this installs your project in a directory of the same name as the argument provided ("project-name" in the example above).

`dg react my-component -p test/component`<br />
Creates React component without TypeScript

| option | shortcut | description                  |
| ------ | -------- | ---------------------------- |
| --path | -p       | installation path (relative) |

<br />

Pass desired component name as second argument.

**Configure VS Code**

`dg vscode`<br />
Creates a `.vscode` directory inside the current working directory.

These files are generated:

- `extensions.json` for recommending and blocking extensions
- `launch.json` to configure node and nodemon debugging
- `settings.json` configures VS Code settings, including auto-formatting
- `spellright.dict` dictionary for spellright

Alright, now lets talk about the `settings.json`. The settings provided are fairly opinionated in terms of linting and auto-formatting. You can obviously modify these rules however you see fit, but I felt the need to give you a heads up.

Good news, though – the Prettier config used for auto-formatting is completely stock (ie: default settings). The linting rules, however, are definitely to my personal taste.

---

More generators coming soon!
