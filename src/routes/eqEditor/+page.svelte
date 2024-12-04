
<script>
import {onMount} from "svelte"    
import EqEditor from "../../lib/eqs/EqsEditor/EqsEditor.svelte";
import {Slide} from "../../lib/eqs/testData/baseEqSlide.js";
import StartStopToolbar from "./StartStopToolbar.svelte";

// import {loadAssets} from "$lib";

let currentTime = 0;
let slide;
let interval;

onMount(async () => {
    slide = Slide;
    
});

function stop(){
        currentTime=0;
        clearInterval(interval);
}
function start(){
        interval =setInterval( ()=>{
                currentTime += 1;
        }, 1000);
}
</script>

<StartStopToolbar   {currentTime}  {slide} {start} {stop} />


{#if slide}
<EqEditor  
bind:items={slide.items}  
{currentTime}
bind:slideExtra={slide.slideExtra}
/>
{/if}

