<script>

 import { onMount } from "svelte";  
 import CanvasPlayer from "../../lib/canvas/CanvasPlayer/CanvasPlayer.svelte";
 import loadAssets from "../assets/loadAssets";
 import AppToolbar from "./AppToolbar.svelte";
 import {Slide}  from "../../lib/canvas/samples/2.js";
  
 let slide =null;
 let assets = null;
 
 
onMount(async()=>{
//  debugger;
  assets = await loadAssets();
  slide = Slide; 
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

async function importFile(event) {
  
  const file = event.target.files[0];
  if (file) {
    try {
      const text = await file.text();
      // Remove any export/import statements and get the object
      const cleanedText = text.replace(/export\s+const\s+\w+\s*=\s*/, '');
      // Using Function constructor to safely evaluate the JS object
      const slideData = (new Function(`return ${cleanedText}`))();
      // debugger;
      // const slideData = JSON.parse(cleanedText);
      slide = slideData;
      // console.log("slide", slide);
    } catch (error) {
      console.error('Error loading JS file:', error);
      alert('Error loading file. Please ensure it is a valid JS file with a slide object.');
    }
  }
}

</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class=" h-full w-full bg-gray-800 text-white p-2 m-0" >
{#if slide && assets}

<AppToolbar 
  {importFile} 
/>

<CanvasPlayer 
  items ={slide.items}        
  slideExtra={slide.slideExtra} 
  {assets}
/>

{/if}
</div>
