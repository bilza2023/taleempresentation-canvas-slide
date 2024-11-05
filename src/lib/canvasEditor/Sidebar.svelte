<script>
    import SelectItemMenu from './SelectItemMenu.svelte';
    import Toolbar from './Toolbar.svelte';
    import CanvasCommand from './CanvasCommand.svelte';
    
    export let itemObjects;
    export let selectedItemIndex;
    export let selectedItemObject;
    export let slideExtra;
  </script>
  
  <div class="w-25 max-w-[25%] min-w-[25%] bg-stone-600 rounded-md p-2">
    {#if selectedItemIndex !== null}
      <SelectItemMenu 
        {itemObjects} 
        selectedItem={selectedItemObject}
        on:select
      />
      <div class="p-4 bg-gray-800 rounded-lg shadow-md">
        <Toolbar
          {selectedItemIndex}
          on:moveUp
          on:moveDown
          on:deleteItem
          on:cloneItem
          on:copyItem
        />
      </div>
    {:else}
      <CanvasCommand extra={slideExtra} />
    {/if}
  </div>