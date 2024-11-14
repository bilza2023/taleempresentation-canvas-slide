<script>
    //@ts-nocheck
    import SpriteDD from "./sprite/SpriteDD.svelte";
    import IconDD from "./icon/IconDD.svelte";
    import LinesDD from "./lines/LinesDD.svelte";

    export let item;
    export let dialogueBox;

</script>

{#if item}
<div class="">
        <div class="flex flex-col overflow-y-auto max-h-[70vh] rounded-lg shadow mx-2 my-2" >
       
                    <!-- Special Command Components -->
                    {#if item.itemExtra.command === 'sprite'} 
                            <div><SpriteDD bind:extra={item.itemExtra}/></div>
                    {/if}

                    {#if item.itemExtra.command === 'icon'} 
                            <div><IconDD bind:extra={item.itemExtra}/></div>
                    {/if}

                    {#if item.itemExtra.command === 'lines'} 
                            <div><LinesDD bind:extra={item.itemExtra}/></div>
                    {/if}

                    <!-- Dynamic Component Rows -->
                    {#each dialogueBox as dialogueItem}
                        {#if dialogueItem.componentName === 'TrPropNumber' || dialogueItem.componentName === 'TrNo'}
                            <!-- Number Input -->
                            <div class="border-b border-gray-700">
                                <div class="border border-gray-700 px-2  text-[10px] text-yellow-200 text-left">{dialogueItem.title}</div>
                                <div class="border border-gray-700 px-2 py-1 text-xs">
                                    <input 
                                        type="number" 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500 text-xs"
                                    >
                                </div>
                            </div>
                        {:else if dialogueItem.componentName === 'TrPropText' || dialogueItem.componentName === 'TrText'}
                            <!-- Text Input -->
                            <div class="border-b border-gray-700">
                                <div class="border border-gray-700 px-2  text-[10px] text-yellow-200 text-left">{dialogueItem.title}</div>
                                <div class="border border-gray-700 px-2 py-1">
                                    <input 
                                        type="text" 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500"
                                    >
                                </div>
                            </div>
                        {:else if dialogueItem.componentName === 'TrTextArea'}
                            <!-- Text Area -->
                            <div class="border-b border-gray-700">
                                <div class="border border-gray-700 px-2  text-[10px] text-yellow-200 text-left">{dialogueItem.title}</div>
                                <div class="border border-gray-700 px-2 py-1">
                                    <textarea 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500"
                                    ></textarea>
                                </div>
                            </div>
                        {:else if dialogueItem.componentName === 'TrPropBoolean' || dialogueItem.componentName === 'TrTf'}
                            <!-- Boolean/Checkbox -->
                            <div class="border-b border-gray-700">
                                <div class="border border-gray-700 px-2  text-[10px] text-yellow-200 text-left">
                                    <label>{dialogueItem.title}</label>
                                </div>
                                <div class="border border-gray-700 px-2 py-1">
                                    <input 
                                        type="checkbox" 
                                        bind:checked={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500"
                                    >
                                </div>
                            </div>
                        {:else if dialogueItem.componentName === 'TrPropColor' || dialogueItem.componentName === 'TrColor'}
                            <!-- Color Input -->
                            <div class="border-b border-gray-700">
                                <div class="border border-gray-700 px-2  text-[10px] text-yellow-200 text-left">{dialogueItem.title}</div>
                                <div class="border border-gray-700 px-2 py-1">
                                    <input 
                                        type="color" 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white rounded-md border border-gray-600 p-1 focus:ring-1 focus:ring-pink-500"
                                    >
                                </div>
                            </div>
                        {/if}
                    {/each}
            
        </div>
        </div>
{:else}
    <h6 class="text-sm text-gray-400">No item selected</h6>
{/if}
