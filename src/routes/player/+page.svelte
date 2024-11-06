<script>
  import {onMount} from "svelte";  
 import {CanvasPlayer} from "../../lib";
 import loadAssets from "../assets/loadAssets";
 import {slide as slideData} from "../../lib/demoSlides/canvasSlide";
  
 let currentTime = 0;
 let slide =null;
 let assets = null;
 
 
onMount(async()=>{
  slide = slideData[0]; 
  assets = await loadAssets();
});

</script>
<!-- 
slide should have
items={slide.items}        
slideData={slide.data}
slideExtra={slide.slideExtra} 
-->

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class=" h-full w-full bg-gray-800 text-white p-0 m-0" >
{#if slide && assets}
      <CanvasPlayer 
      {currentTime} 
      
      items={slide.items}        
      slideData={slide.data}
      slideExtra={slide.slideExtra} 

      {assets}
      setPulse={()=>{}}
  />

{/if}
</div>
