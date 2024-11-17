<script>
//@ts-nocheck
import Katex from 'svelte-katex';
export let eq;

</script>

<div class='flex justify-center '>

    {#if eq.itemExtra.type == undefined || eq.itemExtra.type == 'code' || eq.itemExtra.type == ''}
        <Katex>{eq.itemExtra.code}</Katex>
    {/if}

    {#if eq.itemExtra.type == 'txt' || eq.itemExtra.type == 'text'}
        <p>{eq.itemExtra.code}</p>
    {/if}
    {#if eq.itemExtra.type == 'hdg' || eq.itemExtra.type == 'heading'}
        <h1 class='text-yellow-400'>{eq.itemExtra.code}</h1>
    {/if}

    {#if eq.itemExtra.type == 'html'}
        <div>
        {@html eq.itemExtra.code }
        </div>
    {/if}

</div>