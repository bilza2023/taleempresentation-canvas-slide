<script>
  import SharedCanvasBase from './SharedCanvasBase.svelte';

  export let currentTime;
  
  export let spriteImages;             
  export let bgImages; 

  export let handleClickParent;
  export let slideExtra = {};
  export let slideArray = [];
  
  export let itemObjects;
  
  export let selectedItem;
</script>

<SharedCanvasBase
  {currentTime}
  spriteImgArray={spriteImages}
  {bgImages}
  {slideExtra}
  {slideArray}
  {itemObjects}
  {selectedItem}
  {handleClickParent}
  isEditorMode={true}
/>