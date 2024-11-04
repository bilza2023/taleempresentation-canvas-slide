<script>
  import { afterUpdate,onMount } from 'svelte';
  import CodeTxt from './CodeTxt.svelte';
  
  export let pulse;
  export let items;
  export let setPulse;
  
  let focusedDivId = null;
  let prevFocusedDivId = null;
  
  // Reactive statement for handling focus
  $: {
    // Reset focus if pulse is invalid
    focusedDivId = null;
    console.log("items",items);

    if (pulse != null && items?.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.extra?.startTime != null && item.extra?.endTime != null) {
          if (pulse >= parseInt(item.extra.startTime) && pulse < parseInt(item.extra.endTime) ) {
            prevFocusedDivId = focusedDivId;
            focusedDivId = i;
            break; // Exit loop once we find the matching item
          }
        }
      }
    }
  }
  
  // Handle scrolling after updates
  afterUpdate(() => {
    if (focusedDivId !== null && focusedDivId !== prevFocusedDivId) {
      const focusedElement = document.getElementById(`item-${focusedDivId}`);
      if (focusedElement) {
        focusedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

onMount(async () => {

});
  </script>
  
  <div class="flex flex-col space-y-2 w-full">
    {#each items as item, index}
      <button
        class="flex w-full items-center"
        on:click={() => setPulse(item.extra.startTime)}
      >
        <div class="m-1 p-1 rounded-2xl text-sm bg-stone-600">
          {item.extra.step + 1}
        </div>
        
        <div
          id="item-{index}"
          class={focusedDivId === index ? 'focused w-full text-center' : 'nonFocused w-full text-center'}
        >
          <CodeTxt eq={item} />
        </div>
      </button>
    {/each}
  </div>
  
  <div class="h-32"></div> <!-- Spacer for scrolling -->
  
  <style>
  .focused {
    background-color: rgb(2, 63, 2);
    color: white;
    border: 2px solid red;
    padding: 5px;
    font-size: 1.5em;
    font-weight: bold;
    line-height: 1.5em;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
  
  .nonFocused {
    background-color: grey;
    padding: 2px;
    margin: 2px;
    font-size: 1.25em;
    transition: all 0.3s ease;
  }
  </style>