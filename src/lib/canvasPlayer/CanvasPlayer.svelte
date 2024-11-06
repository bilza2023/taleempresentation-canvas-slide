<script>
  import SharedCanvasBase from './SharedCanvasBase.svelte';

  export let currentTime;
  export let slideData;
  export let items;
  export let slideExtra;
  export let assets;
  
</script>

<SharedCanvasBase
  {currentTime}

  {slideData}
  {items}
  {slideExtra}
  
  {assets}
  
  isEditorMode={false}
/>
