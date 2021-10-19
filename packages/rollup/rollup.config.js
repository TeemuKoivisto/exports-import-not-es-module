import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-ts'
import alias from '@rollup/plugin-alias'
import nodeResolve from '@rollup/plugin-node-resolve'

import { resolve } from 'path'

import pkg from './package.json'

export default {
  input: ['src/index.ts'],
  output: [
    {
      file: 'bundled/rollup.cjs',
      format: 'cjs',
    },
    {
      file: 'bundled/rollup.es.js',
      format: 'es',
    },
  ],
  external: [
    // ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    commonjs(),
    alias({
      entries: [
        { find: '$lib', replacement: resolve('src/lib') },
      ]
    }),
    typescript(),
    nodeResolve({
      browser: true,
    })
  ],
}
