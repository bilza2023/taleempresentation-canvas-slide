<svelt:head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
</svelt:head>

<script>
import {onMount} from "svelte"    
import EqEditor from "../../lib/eqs/EqsEditor/EqsEditor.svelte";
import {Slide} from "../../lib/eqs/testData/baseEqSlide.js";
import AppEditorToolbar from "./AppEditorToolbar.svelte";
//--we need this currentTime since we edit this using sound and the slide player will play it HERE in Editor we need currentTime so that we can sync our activty on slide with time.
let currentTime = 0;
let slide;


onMount(async () => {
    slide = Slide;
        setInterval( ()=>{
                currentTime += 1;
        }, 1000);
});


</script>


<AppEditorToolbar   {currentTime}  bind:slide={slide} />


{#if slide}
<EqEditor  
items={slide.items}  
{currentTime}
/>
{/if}

