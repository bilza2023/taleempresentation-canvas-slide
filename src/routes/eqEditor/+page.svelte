
<script>
import {onMount} from "svelte"    
import EqEditor from "../../lib/eqs/EqsEditor/EqsEditor.svelte";
import {Slide} from "./Slide";
import AppEditorToolbar from "./AppEditorToolbar.svelte";
//--we need this currentTime since we edit this using sound and the slide player will play it HERE in Editor we need currentTime so that we can sync our activty on slide with time.
let currentTime = 0;
let slide;


onMount(async () => {
    slide = Slide;
        // setInterval( ()=>{
        //         currentTime += 1;
        // }, 1000);
});


</script>


<AppEditorToolbar  bind:slide={slide} />


{#if slide}
<EqEditor  
items={slide.items}  
{currentTime}
/>
{/if}

