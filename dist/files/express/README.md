# Express Service

### Installation

After cloning repo,

- Add `@gritbit` as a registry `npm config set '@gritbit:registry' https://node.bit.dev`

- Run `yarn install` inside project root to install all dependencies.
- Run `yarn run develop` to launch server with a watcher that will automatically recompile changes on save

### Start the Server

During development, simple run the following command to launch the server with a watcher that recompiles on save.

`yarn run develop`

### Build Scripts

There are a few different ways to build this project depending on what you're looking to accomplish.

`yarnnpm run develop`

> Fastest option. Watches `src` files and rebuilds on changes. No files are deleted from `dist` and files are not copied from `./public/` to `./dist/public`. Restarts the server after successful build.

`yarn run dev`

> Watches `src` files and rebuilds on changes. The build process deletes all files in `dist` before building the changed files. It then copies all of the files in `./public` to the `dist` folder. Restarts the server after successful build.

`yarn run build`

> Deletes all files in the `dist` directory and rebuilds the entire project, including copying files from `./public` to `./dist/public`. This build script is useful for CI/CD or other "release" needs.

### Configuration

Environment variables are stored in `.env` files. For more information, see the docs on [dotenv-flow](https://github.com/kerimdzhanov/dotenv-flow).
