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
- Generate Docusaurus docs

**Express**

| option | shortcut | description                  |
| ------ | -------- | ---------------------------- |
| --path | -p       | installation path (relative) |

<br />

`dg express my-project`<br />
Installs Express service with TypeScript. The above example would install in the directory `./my-project`.

`dg express my-project -p test`<br />
Installs Express in `test` directory. The above example would install in the directory `./tests/my-project`.

**React Native**

`dg rn cool/story/bro-component` or `dg react-native cool/story/bro-component`
Scaffolds out a React Native with TypeScript. Command must be ran from the root directory of your project src for all of the magic to happen properly.

The file structure matches the expectations and conventions of Bit.dev.

Running the example command above with create the following files:

- ./cool/story/bro-component/index.ts
- ./cool/story/bro-component/bro-component.tsx
- ./cool/story/bro-component/bro-component.spec.tsx
- ./cool/story/bro-component/bro-component.composition.tsx
- ./cool/story/bro-component/bro-component.constants.ts

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

**Docusaurus Docs**

`dg rn-doc cool/story/bro-component`
Generates doc file for React components that are using TypeScript. The generator assumes Docusaurus is installed in a `docs` directory right off project root. There is currently no config that allows the use of a different directory.

The doc generator also assumes you're following the naming convention outlined in the React Native section, which is to say you must have the following two files:

- `bro-component.tsx`
- `bro-component.composition.tsx`

If you're unfamiliar with the composition pattern, run the React Native command just to see the file structure and how the composition file is implemented and used in the spec file. As an added bonus, composition files help to self-document the code by clearly showing how the component should be used.

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
