import { defineConfig } from 'vite'

import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '$lib': resolve('src/lib'),
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    outDir: 'bundled',
    emptyOutDir: false,
    lib: {
      entry: resolve('src/index.ts'),
      name: 'Library',
      formats: ['cjs', 'es'],
      fileName: (format) => `vite.${format}.js`
    },
  },
})
