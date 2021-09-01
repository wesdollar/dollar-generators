<div align="center">

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
option | shortcut | description
---|--- | ---
--path | -p | installation path (relative)
<br />

Pass desired component name as second argument.

`dg react my-component -p test/component`
Creates React component without TypeScript

---
More generators coming soon!
