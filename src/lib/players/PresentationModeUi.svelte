
<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import SlideRegistry  from '../code/slideRegistery/SlideRegistry';
    const registry = SlideRegistry.getInstance();
    
  import loadBgImages from "../code/assets/loadBgImages.js";
  import loadSprites from "../code/assets/loadSprites";
  
  import inspect from "../diagnose/inspect";
    

    export let  presentationObj;
    export let currentTime;
    export let pulse;
    export let pause=()=>{};
    export let setPulse = () => {};
    
    let spriteImgArray  = []; 
    let bgImages  = []; 
    let currentSlide;

    let ready = false;
$:{//first load
  if(presentationObj){
     currentSlide =  presentationObj.getCurrentSlide();
  }
}

$:{
    if(currentSlide){
      inspect(currentSlide);
    }
}   
  
onMount(async()=>{
  try {
  bgImages = await loadBgImages();
  console.log('Loaded images:', bgImages.length);
} catch (error) {
  console.error('Failed to load background images:', error);
}

try {
  spriteImgArray = await loadSprites();
  console.log('Loaded sprites:', spriteImgArray.length);
} catch (error) {
  console.error('Failed to load sprite images:', error);
}
//////////////////////////////////////////////////////////////////////
ready = true;
}) ; 

$:{
//--14 sep 2024 :: so every time a slide changes we load the images required by it. We go over each item and if that item is "command.image" we load the inage in it    
    if(currentSlide){
      loadImages();
    }
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
          const url = 'https://taleem-media.blr1.cdn.digitaloceanspaces.com/bucket/'+ item.extra.src + '.' + item.extra.ext;
          const img = await loadImage( url);
          item.extra.image = img;
          
      }   catch (err) {
        // console.error('Error loading image:', err);
        // do nothing 
      }
    }
  }
}
$:{
  if(pulse  && presentationObj){
    // console.log("pulse");
    currentSlide =  presentationObj.getCurrentSlide();
  }
} 
function handleKeyUp(event) {
  if (event.code === 'Space') {
      pause();
  }
}

function handleClick() {
    pause();
}

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div on:keyup={handleKeyUp} on:click={handleClick} tabindex="0">
  {#if currentSlide && ready}
      <!-- svelte-ignore missing-declaration -->
      <svelte:component 
          this={registry.getPlayerComponent(currentSlide.type)}
          
          {currentTime}
          {pulse}
          
          items={currentSlide.items}
          
          startTime={currentSlide.startTime}
          endTime={currentSlide.endTime}
          
          slideExtra={currentSlide.slideExtra}
          extra={currentSlide.extra}
  
          spriteImgArray={currentSlide.type === 'canvas' ? spriteImgArray : undefined}
          bgImages={currentSlide.type === 'canvas' ? bgImages : undefined}
          
          {setPulse}
  
      />
  {/if}
</div>
