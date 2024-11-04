<script>
  //@ts-nocheck

  import { onMount } from 'svelte';
  import inspect from "../diagnose/inspect.js";
 

  import SlideRegistry  from '../code/slideRegistery/SlideRegistry.js';
  const registry = SlideRegistry.getInstance();
  
  export let currentSlide;
  export let spriteImages  = []; 
  export let icons  = []; 
  export let bgImages  = []; 

  let ready = false;
  
$:{
  currentSlide;
  inspect(currentSlide);
}   
 
onMount(async()=>{
ready = true;
}) ; 

$:{
//--14 sep 2024 :: so every time a slide changes we load the images required by it. We go over each item and if that item is "command.image" we load the inage in it    
  currentSlide;
  loadImages();
}

async function loadImage(src) {
return new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = (err) => reject(err);
  img.src = src;
});
}

// We go over each item and if that item is "command.image" we load the inage in it
async function loadImages() {
//   debugger;
for (let i = 0; i < currentSlide.items.length; i++) {
  const item = currentSlide.items[i];

  if (item.extra.command == 'image' || item.extra.command == 'image2') {
    try {
        const url =  item.extra.src + '.' + item.extra.ext;
        const img = await loadImage( url);
        item.extra.image = img;
        
    }   catch (err) {
      // console.error('Error loading image:', err);
      // do nothing 
    }
  }
}
}

</script>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div tabindex="0">
  {#if currentSlide && ready}
      <!-- svelte-ignore missing-declaration -->
      <svelte:component 
          this={registry.getEditorComponent(currentSlide.type)}
                   
          {currentSlide}
          bind:items={currentSlide.items}
      
          bind:startTime={currentSlide.startTime}
          bind:endTime={currentSlide.endTime}
          
          bind:slideExtra={currentSlide.slideExtra}
          bind:extra={currentSlide.extra}
  
          {spriteImages}
          {bgImages}
          {icons}
      />
  {/if}
  <!-- slideExtra and extra names are changed -->
</div>
