<script>
   
  import {SlideObject}  from "$lib";
  import CanvasEditor from "../../lib/slides/canvas/CanvasEditor/CanvasEditor.svelte";
  // import SaveLoadToolbar from "$lib/components/SaveLoadToolbar.svelte";
  import {onMount} from "svelte";

  let slide = null;
  let showAddToolbar = true;
  let assets = null;
  

  function createNewSlide(){
    slide = SlideObject.Canvas.getNewSlide();
  }
  

  onMount(async()=>{
    assets = await SlideObject.loadAssets(); 
    slide = SlideObject.Canvas.getDemoSlide();
  });

</script>

{#if SlideObject}

<!-- {#if slide}
<SaveLoadToolbar 
  bind:content={slide} 
  fileName="presentation" 
  fileExtension="js"
  importAccept=".js"
  regexReplaceFilter={/export\s+const\s+\w+\s*=\s*/}
  PreTextToAdd='export const Slide'
/>
{/if} -->

<div class="w-full bg-gray-700 text-white py-2 px-1 min-h-screen ">
  {#if slide && assets}
    <CanvasEditor
     bind:items = {slide.items}
     bind:slideExtra = {slide.slideExtra}
     {assets}
     {showAddToolbar}
    />
  {/if}
</div>



{/if}