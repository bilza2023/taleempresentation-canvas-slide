
<script>
import {onMount} from 'svelte';
import EqPlayer from "../../lib/eqs/EqPlayer/EqPlayer.svelte";
// import {Slide} from "../../lib/eqs/testData/baseEqSlide.js";
import StartStopToolbar from "./StartStopToolbar.svelte";

// import {loadAssets} from "$lib";

let currentTime = 0;
let slide;
let interval;

onMount(async () => {
    slide = JSON.parse(localStorage.getItem('slide'));
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

function setPulse(val){
        // debugger;
 currentTime = parseInt(val);
}   
</script>

<StartStopToolbar   {currentTime}  {slide} {start} {stop} />


{#if slide}
        <EqPlayer  
                items={ slide.items}  
                {currentTime}
                {setPulse}
        />
{/if}
