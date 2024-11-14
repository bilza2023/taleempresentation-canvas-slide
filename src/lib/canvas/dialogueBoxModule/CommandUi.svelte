<script>
    import InputNumber from './InputNumber.svelte';
    import InputText from './InputText.svelte';
    import InputTextArea from './InputTextArea.svelte';
    import InputCheckbox from './InputCheckbox.svelte';
    import InputColor from './InputColor.svelte';
  
    export let item;
    export let dialogueBox;
  
    const componentMap = {
      TrPropNumber: InputNumber,
      TrNo: InputNumber,
      TrPropText: InputText,
      TrText: InputText,
      TrTextArea: InputTextArea,
      TrPropBoolean: InputCheckbox,
      TrTf: InputCheckbox,
      TrPropColor: InputColor,
      TrColor: InputColor
    };
  </script>
  
  {#if item}
    <div class="flex flex-col overflow-y-auto max-h-[70vh] rounded-lg shadow mx-2 my-2">
      {#each dialogueBox as dialogueItem}
        {#if componentMap[dialogueItem.componentName]}
          <div class="border-b border-gray-700">
            <div class="border border-gray-700 px-2 text-[10px] text-yellow-200 text-left">
              {dialogueItem.title}
            </div>
            <div class="border border-gray-700 px-2 py-1">
              <svelte:component
                this={componentMap[dialogueItem.componentName]}
                bind:value={item.itemExtra[dialogueItem.title]}
              />
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {:else}
    <h6 class="text-sm text-gray-400">No item selected</h6>
  {/if}