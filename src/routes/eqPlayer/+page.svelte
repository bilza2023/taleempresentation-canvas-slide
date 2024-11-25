<svelt:head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
</svelt:head>
<script>

import {onMount} from 'svelte';
import EqPlayer from "../../lib/eqs/EqPlayer/EqPlayer.svelte";
//Slide is like default_slide we start with this then edit and save
import {Slide} from "../../lib/eqs/testData/baseEqSlide.js";
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
        // debugger;
 currentTime = parseInt(val);
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
