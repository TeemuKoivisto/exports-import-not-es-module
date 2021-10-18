import autoPreprocess from 'svelte-preprocess'
import { resolve } from 'path'

const preprocessOptions = {
  scss: {}
}

export default {
  preprocess: autoPreprocess(preprocessOptions),
  preprocessOptions,
  kit: {
    vite: {
      resolve: {
        alias: {
          $lib: resolve('./src/lib')
        }
      }
    },
  }
}
