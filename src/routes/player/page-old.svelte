
<script>
    //@ts-nocheck 
    import {SlideObject} from '$lib';
    import Player from "../../lib/presentation/players/Player.svelte";
    import {onMount} from "svelte";
    // import OpenFile from "../../lib/components/OpenFile.svelte";
    // import {Slides} from "../../lib/slides/canvas/samples/presentation"; 
    import {Slides} from "./presentation";

    let slides=[];

function change(){
  debugger;
  slides = Slides;
  // slides = [...slides];
  slides = JSON.parse(JSON.stringify(Slides));
}
// function openFileCallback(incommingSlides){
//   // slides = [...incommingSlides];
//   const s = SlideObject.Canvas.getDemoSlide();
//   slides = [ ...s];
//   // debugger;
// }    

 
    onMount(async()=>{
        const demoCanvasSlide = SlideObject.Canvas.getDemoSlide();
        const demoEqSlide = SlideObject.Eqs.getDemoSlide();
        slides = [demoCanvasSlide ];
        // slides = [demoCanvasSlide ,demoEqSlide ];
        // slides = [SlideObject.Canvas.getNewSlide('canvas')];
    });

</script> 
   
<!-- <div class='w-full p-1 bg-stone-600 text-white'>
  <OpenFile callback={openFileCallback}/>
</div>    -->
 <button on:click={change}>
  click
 </button>

<!-- <OpenFileButton bind:content={slides}/> -->

    <div class='bg-gray-800 text-white w-full' >
      {#if slides}
        <div class="flex justify-center w-full   border-white border-2 text-center  rounded-lg  ">
              <Player
                isBlob = {false}
                slides={slides} 
                audioData= "/music1.opus"    
              />
        </div>
      {/if}
    </div>
    
    