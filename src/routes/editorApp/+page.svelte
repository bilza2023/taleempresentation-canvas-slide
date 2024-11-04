<script>
  import { Editor,samples } from "$lib";
  import audioData from "./audioData.js";

  import AppToolbar from "./AppToolbar.svelte";
  let slides = samples.blankCanvas;
  let showToolbar=true;

function newPresentation(){
slides = samples.blankCanvas;
}

</script>

<div class="w-full bg-gray-800">

{#if slides}

    <AppToolbar 
    bind:slides={slides}
    {newPresentation}
    />
  
  <Editor
    isBlob={true}
    {showToolbar}
    bind:slides={slides}
    {audioData}

  />

{/if}

</div>