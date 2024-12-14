
<script>
import {onMount} from "svelte"    
import {EqsEditor} from "$lib/slides";
// import {Slide} from "$lib/slides/eqs/samples/demoSlide.js";
import StartStopToolbar from "./StartStopToolbar.svelte";
import {SlideObject} from "../../lib/index"
// import {loadAssets} from "$lib";

let currentTime = 0;
let slide;
let interval;

onMount(async () => {
    slide = SlideObject.Eqs.getDemoSlide();
    
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
<EqsEditor  
bind:items={slide.items}  
{currentTime}
bind:slideExtra={slide.slideExtra}
/>
{/if}

