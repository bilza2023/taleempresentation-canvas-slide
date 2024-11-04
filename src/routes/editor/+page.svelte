<script>
  import { Editor } from "$lib";
  import audioData from "./audioData.js";
  import {slides} from "../slides/slides.js";

  let showToolbar=true;

</script>

<div class="w-full bg-gray-800">

{#if slides}

  <Editor
    isBlob={true}
    {showToolbar}
    {slides}
    {audioData}
   
  />

{/if}

</div>