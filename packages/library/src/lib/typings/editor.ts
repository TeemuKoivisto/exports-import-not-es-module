import type { EditorState, Transaction } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'

export interface EditorProps {
  class?: string
  onEditorReady?: (view: EditorView) => void
  onEdit?: (state: EditorState) => void
}

export type CommandDispatch = (tr: Transaction) => void
export type Command = (state: EditorState, dispatch?: CommandDispatch, view?: EditorView) => boolean
export type HigherOrderCommand = (command: Command) => Command
export type Commands = { [name: string]: (...args: any[]) => Command }

export interface JSONEditorState {
  doc: { [key: string]: any }
  selection: { [key: string]: any }
  plugins: { [key: string]: any }
}