<script>
    //@ts-nocheck
    import SpriteDD from "./sprite/SpriteDD.svelte";
    import IconDD from "./icon/IconDD.svelte";
    import LinesDD from "./lines/LinesDD.svelte";

    export let item;
    export let dialogueBox;
$:{
    item;
    console.log("item" ,item);
}

</script>

{#if item}
    <div class="">
        <div class="overflow-x-auto">
            <table class="min-w-full table-auto border-collapse border border-gray-600 bg-gray-700 rounded-lg">
                <tbody>
                    <!-- Special Command Components -->
                    {#if item.itemExtra.command === 'sprite'} 
                        <tr>
                            <td><SpriteDD bind:extra={item.itemExtra}/></td>
                        </tr>
                    {/if}

                    {#if item.itemExtra.command === 'icon'} 
                        <tr>
                            <td><IconDD bind:extra={item.itemExtra}/></td>
                        </tr>
                    {/if}

                    {#if item.itemExtra.command === 'lines'} 
                        <tr>
                            <td><LinesDD bind:extra={item.itemExtra}/></td>
                        </tr>
                    {/if}

                    <!-- Dynamic Component Rows -->
                    {#each dialogueBox as dialogueItem}
                        {#if dialogueItem.componentName === 'TrPropNumber' || dialogueItem.componentName === 'TrNo'}
                            <!-- Number Input -->
                            <tr class="border-b border-gray-600">
                                <td class="border border-white p-1">{dialogueItem.title}</td>
                                <td class="border border-white p-1">
                                    <input 
                                        type="number" 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white p-1"
                                    >
                                </td>
                            </tr>
                        {:else if dialogueItem.componentName === 'TrPropText' || dialogueItem.componentName === 'TrText'}
                            <!-- Text Input -->
                            <tr class="border-b border-gray-600">
                                <td class="border border-white p-1">{dialogueItem.title}</td>
                                <td class="border border-white p-1">
                                    <input 
                                        type="text" 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white p-1"
                                    >
                                </td>
                            </tr>
                        {:else if dialogueItem.componentName === 'TrTextArea'}
                            <!-- Text Area -->
                            <tr class="border-b border-gray-600">
                                <td class="border border-white p-1">{dialogueItem.title}</td>
                                <td class="border border-white p-1">
                                    <textarea 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white p-1"
                                    ></textarea>
                                </td>
                            </tr>
                        {:else if dialogueItem.componentName === 'TrPropBoolean' || dialogueItem.componentName === 'TrTf'}
                            <!-- Boolean/Checkbox -->
                            <tr class="border-b border-gray-600">
                                <td class="border border-white p-1">
                                    <!-- svelte-ignore a11y-label-has-associated-control -->
                                    <label class="text-pink-300 hover:cursor-pointer">
                                        {dialogueItem.title}
                                    </label>
                                </td>
                                <td class="border border-white p-1">
                                    <input 
                                        type="checkbox" 
                                        bind:checked={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white p-1"
                                    >
                                </td>
                            </tr>
                        {:else if dialogueItem.componentName === 'TrPropColor' || dialogueItem.componentName === 'TrColor'}
                            <!-- Color Input -->
                            <tr class="border-b border-gray-600">
                                <td class="border border-white p-1">{dialogueItem.title}</td>
                                <td class="border border-white p-1">
                                    <input 
                                        type="color" 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white p-1"
                                    >
                                </td>
                            </tr>
                        {/if}


                        
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
{:else}
    <h6 class="text-sm text-gray-400">No item selected</h6>
{/if}