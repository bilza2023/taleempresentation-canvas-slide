<script>
    //@ts-nocheck
    // import InputNumber from "./InputNumber.svelte";   
    // import TrText from "../dialogueBoxModule/TrText.svelte";   
    // import TrColor from "../dialogueBoxModule/TrColor.svelte";   
    // import TrTf from "../dialogueBoxModule/TrTf.svelte";   
  
    export let extra;
  
    let displayBody = true;
  
    function applyTemplate(event) {
      debugger;
      switch (event.target.value) {
        case 'coastalHarmony':
          extra.backgroundColor = "#0077be"; // Ocean Blue
          extra.gridLineColor = "#d2b48c"; // Sandstone Yellow
          break;
        // ... other template cases
      }
    }
  </script>
  
  <div class="flex w-full text-white rounded-md justify-center bg-stone-700 p-1 m-1 border-2 border-white">
    <div class="flex justify-end gap-1">
      <button on:click={() => displayBody = !displayBody} class="p-1 m-1 text-xs rounded-md hover:bg-slate-700">Canvas</button>
    </div>
  </div>
  
  {#if displayBody}
    <div class="flex flex-col w-full">
      <div class="flex justify-between items-center border border-white p-1">
        <div class="text-white">Templates</div>
        <select on:change={applyTemplate} class="bg-gray-900 text-white p-1">
          <option value="">None</option>
          <option value="blue">blue</option>
          </select>
      </div>
      <div class="flex justify-between items-center border border-white p-1">
        <div class="text-white">Bg Img</div>
        <select class="bg-gray-900 text-white p-1" bind:value={extra.bgImg}>
          <option value="null">None</option>
          <option value="system_images/bg_images/paper01.jpg">paper01</option>
          </select>
      </div>
      </div>
  {/if}