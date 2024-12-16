
<script>
    //@ts-nocheck 
    import {SlideObject} from '$lib';
    import Player from "../../lib/presentation/players/Player.svelte";
    import {onMount} from "svelte";
    import ToolbarDiv from "../../lib/components/ToolbarDiv.svelte";
    import OpenFileButton from "../../lib/components/OpenFileButton.svelte";


    let slides=[];
    
    
 function callback(incomming){
  // debugger;
  if(typeof(incomming) !== 'object'){
    alert("The imported slide is not an object");
  }
  // the [ and ] are very important ...
  slides = [...incomming];
  // console.log("slides" , slides);
 }
    
    onMount(async()=>{
        // slides = await upgrade2Basic(Slides);
        const demoCanvasSlide = SlideObject.Canvas.getDemoSlide();
        const demoEqSlide = SlideObject.Eqs.getDemoSlide();
        slides = [demoCanvasSlide ,demoEqSlide ];
    });


    </script> 
    
<ToolbarDiv>
  <OpenFileButton 
    {callback}
    importAccept=".js"
    regexReplaceFilter={/export\s+const\s+\w+\s*=\s*/}
  />
  </ToolbarDiv>

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
    
    