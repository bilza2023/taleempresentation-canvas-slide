
<script>
    //@ts-nocheck 
    import {SlideObject} from '$lib';
    import Player from "../../lib/presentation/players/Player.svelte";
    import {onMount} from "svelte";

   

    let slides=[];
    onMount(async()=>{
        // slides = await upgrade2Basic(Slides);
        const demoCanvasSlide = SlideObject.Canvas.getDemoSlide();
        const demoEqSlide = SlideObject.Eqs.getDemoSlide();
        slides = [demoCanvasSlide ,demoEqSlide ];
    });
    </script> 
    
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
    
    