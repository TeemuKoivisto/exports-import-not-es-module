import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-ts'
import svelte from 'rollup-plugin-svelte'
import autoPreprocess from 'svelte-preprocess'
import scss from 'rollup-plugin-scss'
import alias from '@rollup/plugin-alias'

import svelteConfig from './svelte.config'

import { resolve } from 'path'

import pkg from './package.json'

const isProduction = !process.env.ROLLUP_WATCH

export default {
  input: './src/lib/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'library',
      sourcemap: isProduction
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: isProduction
    }
  ],
  external: [
    ...Object.keys(!isProduction ? pkg.dependencies : {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    alias({
      entries: [
        { find: '$lib', replacement: resolve(__dirname, 'src/lib') }
      ]
    }),
    nodeResolve({
      browser: true,
      dedupe: ['svelte']
    }),
    typescript(),
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: true
      },
      preprocess: autoPreprocess(svelteConfig.preprocessOptions)
    }),
    scss(),
    commonjs()
  ]
}
