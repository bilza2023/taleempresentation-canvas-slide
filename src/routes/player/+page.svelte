<script>
//@ts-nocheck 
import {slides} from "../slides/slides.js";
import {Player} from "$lib";
</script> 

<div class='bg-gray-800 text-white w-full' >
  {#if slides}
    <div class="flex justify-center w-full   border-white border-2 text-center  rounded-lg  ">
          <Player
            isBlob = {false}
            {slides} 
            audioData= "/music1.opus"    
          />
    </div>
  {/if}
</div>


