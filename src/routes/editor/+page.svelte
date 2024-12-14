<script>
    import Editor  from "../../lib/presentation/editor/Editor.svelte";
    import audioData from "./audioData.js";
    // import {Slide} from "./slide.js";
    import {onMount} from "svelte";
    import SlideObject from '$lib/slides';
    
    let slides;
    let showToolbar=true;

onMount(async()=>{
      const s = SlideObject.Canvas.getDemoSlide();
      slides = [s];
});

</script>
  
  <div class="w-full bg-gray-800">
  


  {#if slides}
<!-- <SaveLoadDialogue bind:slides={slides} />   -->
<!-- src/lib/editor/slides.js -->
    <Editor
      isBlob={true}
      {showToolbar}
      {slides}
      {audioData}
    />
  
  {/if}
  
  </div>