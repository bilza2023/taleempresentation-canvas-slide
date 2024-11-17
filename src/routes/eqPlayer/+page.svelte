
<script>

import {onMount} from 'svelte';
import EqPlayer from "../../lib/eqs/EqPlayer/EqPlayer.svelte";
//Slide is like default_slide we start with this then edit and save
import {Slide} from "./Slide";
import AppPlayerToolbar from "./AppPlayerToolbar.svelte";
//---> currentTime is in +page.svelte since we will use slides in presentation.

let currentTime = 0;
let slide;

onMount(async () => {
        slide = Slide;

        setInterval( ()=>{
                currentTime += 1;
        }, 1000);
});
function setPulse(val){
 currentTime = val;
}   
</script>

<AppPlayerToolbar bind:slide={slide}  {currentTime} />


{#if slide}
        <EqPlayer  
                items={ slide.items}  
                {currentTime}
                {setPulse}
        />
{/if}
