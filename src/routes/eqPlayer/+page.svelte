
<script>
import EqPlayer from "../../lib/eqs/EqPlayer/EqPlayer.svelte";
import {Slide} from "./Slide";

import {onMount} from 'svelte';

//---> currentTime is in page.svelte since we will use slides in presentation.

let currentTime = 0;
let items = Slide.items;

onMount(async () => {
        setInterval( ()=>{
                currentTime += 1;
        }, 5000);
});

$:{
        currentTime;
        items[currentTime].itemExtra.selected = true;
}

</script>
{#if Slide}
        <EqPlayer  
                {items}  
                {currentTime}
        />
{/if}

{currentTime}