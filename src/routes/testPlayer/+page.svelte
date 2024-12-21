
<script>
    //@ts-nocheck 
    import {SlideObject,Player} from '$lib';
    import {onMount} from "svelte";
    import {Slides} from "./presentation";

    let slides=Slides;
    
    

    </script> 
    

    <div class='bg-gray-800 text-white w-full' >
      {#if slides}
        <div class="flex justify-center w-full   border-white border-2 text-center  rounded-lg  ">
             
          {#key slides}
              <Player
                isBlob = {false}
                slides={slides} 
                audioData= "/music1.opus"    
              />
          {/key}

        </div>
      {/if}
    </div>
    
    