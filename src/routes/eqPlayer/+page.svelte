
<script>
import EqPlayer from "../../lib/eqs/EqPlayer/EqPlayer.svelte";
import {Slide} from "./Slide";

import {onMount} from 'svelte';

let currentTime = 0;


onMount(async () => {
        setInterval( ()=>{
                currentTime += 1;
        }, 1000);
});

</script>
{#if Slide}
        <EqPlayer  
                items={Slide.items}  
                {currentTime}
        />
{/if}

