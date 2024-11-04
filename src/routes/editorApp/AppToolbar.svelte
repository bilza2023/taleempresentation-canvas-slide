<script>
    import { NavBtn2 } from 'sveltetools_bils/src/cmp';
    import SaveLoadDialogue from './SaveLoadDialogue.svelte';
    import { slide, fade } from 'svelte/transition';

    export let slides;
    export let newPresentation;

    let showToolbar = false;

    const openToolbar = () => {
        showToolbar = true;
    };

    const closeToolbar = () => {
        showToolbar = false;
    };
</script>

<style>
    .bar {
        background-color: rgb(6, 232, 51);
        height: 8px;
        width: 100%;
    }
    .toolbar-container {
        background-color: rgb(4, 33, 2);
        width: 100%;
    }
</style>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    on:click={openToolbar}
    on:dblclick ={closeToolbar}
    class="hover:cursor-pointer"
>
    {#if showToolbar}
        <!-- Toolbar container with transitions -->
        <div class="toolbar-container " in:slide={{ duration: 200 }} out:fade={{ duration: 200 }}>
            <div class="flex justify-center bg-gray-800 p-1 gap-4">
                <NavBtn2 title="New File" icon="🎉" clk={newPresentation} />
                <SaveLoadDialogue bind:slides={slides} />
            </div>
        </div>
    {:else}
        <!-- Short bar visible when toolbar is hidden -->
        <div class="bar"></div>
    {/if}
</div>