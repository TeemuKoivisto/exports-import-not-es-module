<script lang="ts">
  import { EditorView } from 'prosemirror-view'
  import { EditorState, Transaction } from 'prosemirror-state'
  import { onDestroy } from 'svelte'

  import { plugins } from './plugins'
  import { schema } from './schema'

  import type { EditorProps } from './typings/editor'

  import './styles/prosemirror-example-setup.css'
  import './styles/menu.css'

  export let onEditorReady: ((view: EditorView) => void) | undefined = undefined,
    onEdit: ((state: EditorState) => void) | undefined = undefined

  let editorView: EditorView | undefined = undefined
  let rootElement: HTMLElement | undefined = undefined
  let editorProps: EditorProps = {
    onEditorReady,
    onEdit
  }
  $: {
    editorProps = {
      onEditorReady,
      onEdit
    }
    if (rootElement) {
      editorView = init(rootElement, editorProps, editorView)
    }
  }

  function createEditorState() {
    return EditorState.create({
      schema,
      plugins: plugins()
    })
  }

  function createEditorView(element: HTMLElement, state: EditorState, props: EditorProps) {
    return new EditorView(
      { mount: element },
      {
        state,
        dispatchTransaction(tr: Transaction) {
          const oldEditorState = this.state
          const newState = oldEditorState.apply(tr)
          this.updateState(newState)
          props.onEdit && props.onEdit(newState)
        }
      }
    )
  }

  function init(element: HTMLElement, props: EditorProps, oldView?: EditorView) {
    const state = createEditorState()
    const view = oldView || createEditorView(element, state, props)
    if (oldView) {
      view.setProps({
        state,
        dispatchTransaction(tr: Transaction) {
          const oldEditorState = this.state
          const newState = oldEditorState.apply(tr)
          this.updateState(newState)
          props.onEdit && props.onEdit(newState)
        }
      })
    }
    props.onEditorReady && props.onEditorReady(view)
    return view
  }

  onDestroy(() => {
    editorView?.destroy()
  })
</script>

<section class={`${$$props.class || ''}`}  bind:this={rootElement} >
</section>

<style lang="scss">
  :global(.ProseMirror) {
    min-height: 140px;
    overflow-wrap: break-word;
    outline: none;
    padding: 10px;
    white-space: pre-wrap;
    max-width: 600px;
    width: 100%;
  }
</style>
