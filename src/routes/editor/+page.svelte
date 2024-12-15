<script>
    //why import Editor directy ???? error -- 15-dec-2024
    import {SlideObject} from '$lib';
    import Editor  from "../../lib/presentation/editor/Editor.svelte";
    import audioData from "./audioData.js";
    import {onMount} from "svelte";
    // import SaveLoadToolbar from "$lib/components/SaveLoadToolbar.svelte";
    
    let slides;
    let showToolbar=true;

onMount(async()=>{
      const s = SlideObject.Canvas.getDemoSlide();
      slides = [s];
});

</script>
  
<!-- <SaveLoadToolbar bind:slides /> -->
<!-- <SaveLoadToolbar 
  bind:content={slides} 
  fileName="presentation" 
  fileExtension="js"
  importAccept=".js"
  regexReplaceFilter={/export\s+const\s+\w+\s*=\s*/}
  PreTextToAdd='export const Content'
/> -->

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