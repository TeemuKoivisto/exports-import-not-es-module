<script lang="ts">
  import { Editor } from '@app/library'
  import { WebsocketProvider } from 'y-websocket'

  console.log(WebsocketProvider)
</script>

<main>
  <Editor class="editor"/>
</main>

<style lang="scss">
  :global(body) {
    background: #eee;
  }
  main {
    justify-content: center;
    height: 100vh;
    width: 100%;
  }
  :global(.editor) {
    background: white;
    border: 1px solid black;
    max-width: 600px;
    min-height: 400px;
    margin: 2rem;
  }
</style>
