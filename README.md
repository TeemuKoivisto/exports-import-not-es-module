# Unable to import library that uses package.json exports with "." and "import" & "require" entries 

To reproduce:
1. Install `pnpm`: `npm i -g pnpm`
2. Install deps: `pnpm i -r`
3. Package library: `pnpm run build:pkg --filter @app/library`
4. Build client: `pnpm run build --filter @app/client`

Observe results.

```
> Named export 'WebsocketProvider' not found. The requested module 'y-websocket' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from 'y-websocket';
const { WebsocketProvider } = pkg;
file:///.../exports-import-not-es-module/packages/client/.svelte-kit/output/server/app.js:24
import { WebsocketProvider } from "y-websocket";
```

<img width="700" src="https://github.com/TeemuKoivisto/exports-import-not-es-module/blob/master/screenshot.png">

The package.json in question https://github.com/yjs/y-websocket/blob/master/package.json#L28

```json
  "exports": {
    "./package.json": "./package.json",
    ".": {
      "import": "./src/y-websocket.js",
      "require": "./dist/y-websocket.cjs"
    }
  },
```

You can see that Rollup and Vite perform this bundling correctly with using:
```
pnpm run vite --filter @app/rollup
pnpm run roll --filter @app/rollup
```

If you remove the exports block and let the `y-websocket` be resolved via `"main"` and `"module"` entries the build succeeds so I think there's something wrong with how SvelteKit resolves the dependencies.

There is also additional problem with importing dependencies of the library from the client. I had to add the library's dependencies to the client, otherwise the bundler (rollup?) won't find them. I think pnpm's symlinks are not resolved properly.
