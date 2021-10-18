import { exampleSetup } from 'prosemirror-example-setup'

import { schema } from './schema'

export const plugins = () =>
  exampleSetup({ schema, history: true })
