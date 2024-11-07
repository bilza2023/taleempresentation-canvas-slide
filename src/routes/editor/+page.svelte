<script>
  import CanvasEditorPlayer  from "../../lib/CanvasEditor/CanvasEditorPlayer.svelte";
  import {onMount} from "svelte";
  
  // import audioData from "./audioData.js";
  import {slides as defualtSlide} from "../slides/slides.js";
  import loadAssets from "../assets/loadAssets";
  let currentTime=0;

  // import AppToolbar from "./AppToolbar.svelte";
  let slides = defualtSlide;
  let slide = slides[0];
  let showToolbar=true;
 let assets=null;

function newPresentation(){
slides = defualtSlide;
}
onMount(async()=>{
  assets = await loadAssets(); 

});
//--also send slideArray
</script>

<div class="w-full bg-gray-700 text-white p-2 min-h-screen ">

{#if slides && assets}
  <CanvasEditorPlayer

   {currentTime}
   bind:items = {slide.items}
   slideExtra = {slide.slideExtra}
   {assets}

  />

{/if}

</div>