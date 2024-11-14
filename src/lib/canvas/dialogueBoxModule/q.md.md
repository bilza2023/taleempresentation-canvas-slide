                    <!-- Dynamic Component Rows -->
                    {#each dialogueBox as dialogueItem}
                        {#if dialogueItem.componentName === 'TrPropNumber' || dialogueItem.componentName === 'TrNo'}
                            <!-- Number Input -->
                            <tr class="border-b border-gray-700">
                                <td class="border border-gray-700 px-2 py-1 text-sm text-gray-200">{dialogueItem.title}</td>
                                <td class="border border-gray-700 px-2 py-1">
                                    <input 
                                        type="number" 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500 w-3/4"
                                    >
                                </td>
                            </tr>
                        {:else if dialogueItem.componentName === 'TrPropText' || dialogueItem.componentName === 'TrText'}
                            <!-- Text Input -->
                            <tr class="border-b border-gray-700">
                                <td class="border border-gray-700 px-2 py-1 text-sm text-gray-200">{dialogueItem.title}</td>
                                <td class="border border-gray-700 px-2 py-1">
                                    <input 
                                        type="text" 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500 w-3/4"
                                    >
                                </td>
                            </tr>
                        {:else if dialogueItem.componentName === 'TrTextArea'}
                            <!-- Text Area -->
                            <tr class="border-b border-gray-700">
                                <td class="border border-gray-700 px-2 py-1 text-sm text-gray-200">{dialogueItem.title}</td>
                                <td class="border border-gray-700 px-2 py-1">
                                    <textarea 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500 w-3/4"
                                    ></textarea>
                                </td>
                            </tr>
                        {:else if dialogueItem.componentName === 'TrPropBoolean' || dialogueItem.componentName === 'TrTf'}
                            <!-- Boolean/Checkbox -->
                            <tr class="border-b border-gray-700">
                                <td class="border border-gray-700 px-2 py-1 text-sm text-pink-300 hover:cursor-pointer">
                                    <label>{dialogueItem.title}</label>
                                </td>
                                <td class="border border-gray-700 px-2 py-1">
                                    <input 
                                        type="checkbox" 
                                        bind:checked={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500 w-3/4"
                                    >
                                </td>
                            </tr>
                        {:else if dialogueItem.componentName === 'TrPropColor' || dialogueItem.componentName === 'TrColor'}
                            <!-- Color Input -->
                            <tr class="border-b border-gray-700">
                                <td class="border border-gray-700 px-2 py-1 text-sm text-gray-200">{dialogueItem.title}</td>
                                <td class="border border-gray-700 px-2 py-1">
                                    <input 
                                        type="color" 
                                        bind:value={item.itemExtra[dialogueItem.title]} 
                                        class="bg-gray-900 text-white rounded-md border border-gray-600 p-1 focus:ring-1 focus:ring-pink-500 w-3/4"
                                    >
                                </td>
                            </tr>
                        {/if}
                    {/each}
                </tbody>
            </table>
        </div>
    </div>