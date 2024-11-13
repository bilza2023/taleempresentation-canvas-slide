<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import TrNo from "./TrNo.svelte";
    import TrText from "./TrText.svelte";
    import TrTf from "./TrTf.svelte";
    import TrColor from "./TrColor.svelte";
    import TrTextArea from "./TrTextArea.svelte";
    import SpriteDD from "./sprite/SpriteDD.svelte";
    import IconDD from "./icon/IconDD.svelte";
    import LinesDD from "./lines/LinesDD.svelte";

    export let item;
    export let dialogueBox;

</script> 

{#if item}
    <div class="">
        <div class="overflow-x-auto">
            <table class="min-w-full table-auto border-collapse border border-gray-600 bg-gray-700 rounded-lg">
            <tbody>
<!-- //////////////////////////////////////////////////////////////////////////////// -->
{#if item.itemExtra.command === 'sprite'} 
<tr><td><SpriteDD bind:extra={item.itemExtra}/></td></tr>
{/if}

{#if item.itemExtra.command === 'icon'} 
<tr><td><IconDD bind:extra={item.itemExtra}/></td></tr>
{/if}

{#if item.itemExtra.command === 'lines'} 
<tr><td><LinesDD bind:extra={item.itemExtra}/></td></tr>
{/if}
<!-- //////////////////////////////////////////////////////////////////////////////// -->
<!-- TrPropNumber in changed with TrNo since no animation here -->

                    {#each dialogueBox as dialogueItem}
                        <tr class="border-b border-gray-600">
                            <td class="p-1 text-white text-sm">
                                {#if dialogueItem.componentName === 'TrPropNumber'}
                                    <TrNo 
                                        bind:extra={item.itemExtra}
                                        title={dialogueItem.title}
                                        {...dialogueItem.props}
                                    />
                                {:else if dialogueItem.componentName === 'SpriteDD'}
                                    <SpriteDD 
                                        bind:extra={item.itemExtra}
                                    />
                                {:else if dialogueItem.componentName === 'TrPropText'}
                                    <TrText 
                                        bind:extra={item.itemExtra}
                                        title={dialogueItem.title}
                                        {...dialogueItem.props}
                                    />
                                {:else if dialogueItem.componentName === 'TrTextArea'}
                                    <TrTextArea 
                                        bind:extra={item.itemExtra}
                                        title={dialogueItem.title}
                                        {...dialogueItem.props}
                                    />
                                {:else if dialogueItem.componentName === 'TrPropBoolean'}
                                    <TrTf 
                                        bind:extra={item.itemExtra}
                                        title={dialogueItem.title}
                                        {...dialogueItem.props}
                                    />
                                {:else if dialogueItem.componentName === 'TrText'}
                                    <TrText 
                                        bind:extra={item.itemExtra}
                                        title={dialogueItem.title}
                                        {...dialogueItem.props}
                                    />
                                {:else if dialogueItem.componentName === 'TrPropColor'}
                                    <TrColor 
                                        bind:extra={item.itemExtra}
                                        title={dialogueItem.title}
                                        {...dialogueItem.props}
                                    />
                                {:else if dialogueItem.componentName === 'TrNo'}
                                    <TrNo 
                                        bind:extra={item.itemExtra}
                                        title={dialogueItem.title}
                                        {...dialogueItem.props}
                                    />
                                {:else if dialogueItem.componentName === 'TrTf'}
                                    <TrTf 
                                        bind:extra={item.itemExtra}
                                        title={dialogueItem.title}
                                        {...dialogueItem.props}
                                    />
                                {:else if dialogueItem.componentName === 'TrColor'}
                                    <TrColor 
                                        bind:extra={item.itemExtra}
                                        title={dialogueItem.title}
                                        {...dialogueItem.props}
                                    />
                                {/if}
                            </td>
                        </tr>
                    {/each}

                    
                </tbody>
            </table>
        </div>
    </div>
{:else}
    <h6 class="text-sm text-gray-400">No item selected</h6>
{/if}