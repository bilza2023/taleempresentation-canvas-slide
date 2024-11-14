<script>
  import {CanvasEditor}  from "$lib";
  import {onMount} from "svelte";

  // import audioData from "./audioData.js";
  import {slides as defaultSlide} from "./slides.js";
  import loadAssets from "../assets/loadAssets";

  // import AppToolbar from "./AppToolbar.svelte";
  let slides = defaultSlide;
  let slide = slides[0];
  let showAddToolbar = true;
  let assets=null;

function newPresentation(){
slides = defaultSlide;
}
onMount(async()=>{
  assets = await loadAssets(); 

});
//--also send slideArray
</script>

<div class="w-full bg-gray-700 text-white py-2 px-1 min-h-screen ">

{#if slides && assets}
  <CanvasEditor

   bind:items = {slide.items}
   slideExtra = {slide.slideExtra}
   {assets}
   {showAddToolbar}
  />

{/if}

</div>