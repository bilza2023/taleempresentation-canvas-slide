<script>
  import {CanvasPlayer}  from "../../lib";
  import {onMount} from "svelte";
  import audioData from "./audioData.js";
  import {slides as defualtSlide} from "./slides.js";
  import loadAssets from "../assets/loadAssets";
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

{#if slides && assets}
  <CanvasPlayer
    startTime = {canvasSlide.startTime}
    endTime = {canvasSlide.endTime}
    items = {canvasSlide.items}
   extra = {canvasSlide.extra}
   currentSlide={canvasSlide}
   icons={assets.icons}
   bgImages={assets.bgImages}
   spriteImages={assets.spriteImages}
   {currentTime}
   selectedItemIndex={0}
  />

{/if}
