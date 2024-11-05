<script>
  import {CanvasEditor}  from "../../lib";
  import {onMount} from "svelte";
  import audioData from "./audioData.js";
  import {slides as defualtSlide} from "./slides.js";
  import icons from "../../lib/icons.js";
  import loadAssets from "./assets/loadAssets";
  let currentTime=0;

  import AppToolbar from "./AppToolbar.svelte";
  let slides = defualtSlide;
  let canvasSlide = slides[0];
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

<div class="w-full bg-gray-700 text-white p-4 min-h-screen ">

{#if slides && assets}
  <CanvasEditor
   bind:startTime = {canvasSlide.startTime}
   bind:endTime = {canvasSlide.endTime}
   bind:items = {canvasSlide.items}
   extra = {canvasSlide.extra}
   currentSlide={canvasSlide}
   icons={assets.icons}
   bgImages={assets.bgImages}
   spriteImages={assets.spriteImages}
   {currentTime}
   selectedItemIndex={0}
  />

{/if}

</div>