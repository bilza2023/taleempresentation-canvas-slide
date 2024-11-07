<script>

  import { createEventDispatcher, onMount } from 'svelte';  
  import EditorToolbar from './EditorToolbar.svelte';
  import CanvasPlayer from "../canvasPlayer/CanvasPlayer.svelte";
  
  import { addNewItem, moveUp, moveDown, copyItem, pasteItem, cloneItem, deleteItem } from './itemOperations.js';
  
  ///////////////////////////////////////////////////////////////////////////////
  // Props
  export let currentTime = 0; // pulse ???
  export let items; // items are currentSlide.items (it should just be slide)
  export let slideData; // items are currentSlide.items (it should just be slide)
  export let slideExtra;   //this should be slideExtra not to be confused with item.slideExtra
  export let assets;
  
  let selectedItemIndex = 0; //this should not be export
 
  
  onMount(async () => {
   
    
  });


</script>

{#if items}
<div class='p-2 bg-stone-900'>
  <!-- <EditorToolbar
    bind:items={items}
    toggleShowCanvas={toggleShowCanvas}
    pasteItem={handlePasteItem}
    addNewItem={handleAddNewItem}
    icons={assets.icons}
  /> -->

  <CanvasPlayer   
  {currentTime}
  slideData={slideData} 
  {items}        
  slideExtra={slideExtra} 
  {assets}
  />
    
</div>

{/if}