<script>

 import { onMount } from "svelte";  
 import {SlideObject} from "$lib";
 import ToolbarDiv from "../../lib/components/ToolbarDiv.svelte";
 import OpenFileButton from "../../lib/components/OpenFileButton.svelte";

const CanvasPlayer = SlideObject.CanvasPlayer; 
 let slide =null;
 let assets = null;
 
 function callback(incomming){
  slide = incomming;
 }
 
onMount(async()=>{
  assets = await SlideObject.loadAssets(); 

    slide = SlideObject.Canvas.getDemoSlide();
    // slide = Slide; // this is the local slide.js 
});


// function postDraw(ctx) {
//   ctx.fillStyle = 'red';
//   ctx.font = '60px Arial';
//   ctx.textBaseline = 'top';
//   ctx.globalAlpha = 1;

//   // Draw the text
//   ctx.fillText("This is a Warning..!", 100, 100);
// }
// function preDraw() {
//   // console.log("postDraw");
// }
// function eventMouseMove() {
//   console.log("eventMouseMove");
// }
// function eventMouseUp() {
//   console.log("eventMouseUp");
// }
// function eventMouseDown() {
//   console.log("eventMouseDown");
// }


</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class=" h-full w-full bg-gray-800 text-white p-2 m-0" >
{#if slide && assets}

<ToolbarDiv>
  <OpenFileButton 
    {callback}
    importAccept=".js"
    regexReplaceFilter={/export\s+const\s+\w+\s*=\s*/}
  />
  </ToolbarDiv>

<CanvasPlayer 
  items ={slide.items}        
  slideExtra={slide.slideExtra} 
  {assets}
/>

{/if}
</div>
