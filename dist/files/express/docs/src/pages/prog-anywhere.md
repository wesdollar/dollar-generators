---
sidebar_label: "Intro"
sidebar_position: 1
---

## ProgAnywhere

React Native, Expo w/ TypeScript

#### Getting Started

- Install Expo CLI
  - `npm i -g expo-cli`
- After cloning repo, install all dependencies
  - `yarn install`
- Start Metro server
  - `expo start`

_We use yarn for package management._ Please do not use npm, as the `package-lock.json` and `yarn.lock` files will conflict.

Metro will give you the option to open the app on iOS, Android, or web. Don't bother with the web version; skip straight to your device simulator.

Be sure to read the [Expo documentation](htttp://expo.dev). It'll tell you everything you need to know about developing locally, using the simulator, and testing the app on your device.

Download Expo Go in your app store to easily get the ProgAnywhere test app on your phone.

#### Third-Party Tooling

Familiarize yourself with the docs from each of the tools we use.

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [Styled Components](https://styled-components.com/)
- [Paper](https://callstack.github.io/react-native-paper/)
- [Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)
- [Jest](https://jestjs.io)

#### Editor Setup, Linting, & Formatting

The repo includes a `.vscode` folder which will automatically configure your editor. It will also recommend extensions for you to install.

Formatting is auto-formatted on save with Prettier. Prettier also runs as part of the pre-commit hook.

Eslint is leveraged to keep the code consistent and ensure existing patterns are followed. Do not disable rules for an entire file. Be sure to use the rule name when disabling Eslint for a line or block of code.

`// eslint-disable no-magic-numbers`

Pull requests will not be accepted if all rules are disabled or if it's unclear why a line or block of code is disabled.

#### File Structure

Components are broken down into four distinct categories – primitives, components, flows, and screens. If you're familiar with atomic design systems, you'll feel right at home.

**Primitives** are you base elements, such as buttons, text inputs, checkboxes, and the like. Primitives rarely have their own state, as their state is managed by components, flows, or screens.

**Components** are reusable UI elements, often comprised of primitives. Components should never have any business logic, but they may maintain their state if needed for proper display.

**Flows** are just that – flows within the app. They're built up with components and will likely have some business logic and state management.

**Screens** are used to clearly distinguish the screens in the app. Screens are primarily used for navigation and deep-linking. They will contain business logic and state management.

- `./.vscode` – settings and extensions for VS Code
- `./app.json` – Expo app config
- `./App.tsx` – app entry
- `./assets` - houses the splash screen, icon, and adaptive-icon pngs for builds
- `./components` – reusable components
- `./constants` – global constants used throughout the app
- `./flows` – a combination of components that make up a flow within the app
- `./icons` – components that render svg icons and assets
- `./ios` – iOS build files
- `./navigation` – components and types for app navigation menu
- `./primitives` – reusable components for primitives such as buttons, inputs, cards, etc.
- `./screens` – fully-built-up screens that consist of flows and components
- `./themes` – contains themes for Paper components
- `./typography` – headers, body text, etc. for rendering text on screen

#### State Management & Business Logic

Context should be used for managing state when a particular flow requires sharing state with a number of children elements. Avoid prop-drilling your state (passing state through many children components via props), as this creates confusing code that is hard to traverse.

Business logic should be kept out of components as much as possible. Extracting functions out of the component itself makes components easier test and provides greater opportunity for code reuse. Remember that state setters can be passed as params into functions outside of the component.

#### Code of Conduct

- Don't leave broken windows – bad designs, wrong decisions, or poor code (this topic is discussed at length in the Pragmatic Programmer)
- Pull requests are essential to keeping a clean, consistent codebase; leave your ego at the door
