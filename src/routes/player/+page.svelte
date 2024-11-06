<script>

 import { onMount } from "svelte";  
 import CanvasPlayer from "../../lib/canvasPlayer/CanvasPlayer.svelte";
 import loadAssets from "../assets/loadAssets";
 import getNewItem from "./getNewItem";
 import {slide as slideData} from "../../lib/demoSlides/canvasSlide";
  
 import Toolbar from "./Toolbar.svelte";

 let currentTime = 0;
 let slide =null;
 let items =null;
 let assets = null;
 
 
onMount(async()=>{
 
  assets = await loadAssets();
  slide = slideData[0]; 
  items = slide.items; 
});

/**
 * 
 * @param newItemExtraFn
 * newItemExtraFn is a function that is passed as argument ... it return the item.itemExtra obj.
 */
function addNewItem(newItemExtraFn) {
  // debugger;
  const newItemExtra = newItemExtraFn();
  const newItem = getNewItem(); // get an item for which we already have item.itemExtra
  newItem.itemExtra = newItemExtra;    
  items.unshift(newItem);      
  items =  [...items];

}

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
<Toolbar icons={assets.icons} {addNewItem} />

<CanvasPlayer
 
{currentTime} 
      
  {items}        
  slideData={slide.data}
  slideExtra={slide.slideExtra} 

  {assets}
  setPulse={()=>{}}

/>

{/if}
</div>
