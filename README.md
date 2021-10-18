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

[screenshot](./screenshot.png)