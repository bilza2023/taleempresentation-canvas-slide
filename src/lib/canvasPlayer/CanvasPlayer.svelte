<script>
  import SharedCanvasBase from '../SharedCanvasBase.svelte';

  export let items;
  export let startTime;
  export let endTime;
  export let currentTime;
  export let bgImages;
  export let spriteImgArray;
  export let slideExtra = {};
  export let slideArray = [];
</script>

<SharedCanvasBase
  {items}
  {currentTime}
  {bgImages}
  {spriteImgArray}
  {slideExtra}
  {slideArray}
  isEditorMode={false}
/>
