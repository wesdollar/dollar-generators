<div>

![Dollar Generators](icon-144.png)

</div>

### Dollar Generators

Scaffolds for things we do everyday as devs.

`npm i -g @dollarcode/dollar-generators`

* Generate an Express service
* Create React component

__Express__

option | shortcut | description
---|--- | ---
--path | -p | installation path (relative)

<br />

`dg express`<br />
Installs in current working directory (`./`)

`dg express -p test`<br />
Installs in `test` directory inside current working directory (`./tests`)

__React__

`dg cra project-name`<br />
Creates a React project using Create React App. Like CRA, this installs your project in a directory of the same name as the argument provided ("project-name" in the example above).

`dg react my-component -p test/component`<br />
Creates React component without TypeScript

option | shortcut | description
---|--- | ---
--path | -p | installation path (relative)

<br />

Pass desired component name as second argument.

---
More generators coming soon!
