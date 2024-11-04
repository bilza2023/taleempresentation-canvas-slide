<script>
  import { createEventDispatcher,onMount } from 'svelte';
  import CanvasEditorPlayer from "./CanvasEditorPlayer.svelte";
  import SelectItemMenu from './json-ui/SelectItemMenu.svelte';   
  import Toolbar from "./json-ui/Toolbar.svelte";
  import CommandUi from './dialogueBoxModule/CommandUi.svelte';
  import itemToObject from "./componentObjects/itemToObject";
  import CanvasCommand from "./json-ui/commands/CanvasCommand.svelte";
  const dispatch = createEventDispatcher();
  
  // Props
  export let currentSlide;
  export let items;
  export let extra;
  let currentTime = 0;
  export let spriteImages;
  export let bgImages;
  export let playerImages;
  export let selectedItemIndex;
  export let moveUp;
  export let moveDown;
  export let deleteItem;
  export let cloneItem;
  export let copyItem;

  let oldSlideUuid = "";

  onMount(async () => {
    currentSlide.startTime = currentSlide.startTime ?? 0;
    currentSlide.endTime = currentSlide.endTime ?? 10;
    currentTime = currentSlide.startTime;
  });
  // Local state
  let itemObjects = [];
  $: selectedItemObject = selectedItemIndex !== null ? itemObjects[selectedItemIndex] : null;
 
  $:{
    // debugger;
    currentSlide;
    if (currentSlide.uuid != oldSlideUuid){
    currentSlide.startTime = currentSlide.startTime ?? 0;
    currentSlide.endTime = currentSlide.endTime ?? 10;
    //here is the problem
    currentTime = currentSlide.startTime;
    oldSlideUuid = currentSlide.uuid;
    }
  }
  // Convert items to itemObjects whenever items change
  $: {
    itemObjects = items.map((item, index) => {
      return itemToObject(
        item,
        {
          // cloneComponent: () => cloneItem(index),
          cloneComponent: () => {},
          del: () => deleteItem(index)
        },
        spriteImages
      );
    });
  }

  function handleClickParent(e, mouseX, mouseY) {
    for (let i = 0; i < itemObjects.length; i++) {
      const item = itemObjects[i];
      if (item.isHit(mouseX, mouseY)) {
        dispatch('selectionChange', { index: i });
        return;
      }
    }
    dispatch('selectionChange', { index: null });
  }
  </script>
  
  <div class="flex gap-2">
    <div class='w-75'> 
      <CanvasEditorPlayer 
        {items}
        {extra}
        {currentTime}
        {spriteImages}
        {bgImages}
        {playerImages}
        {handleClickParent}
        {itemObjects}
        selectedItem={selectedItemObject}
      />
           
      <div class="w-full">
          <div class="flex gap-2">
            <div class="border-2 border-white rounded-md p-1 text-xs">Seconds:{currentTime}</div>
            <div class="border-2 border-white rounded-md p-1 text-xs">items:{items.length}</div>
          </div>
      
          
        <input 
        class="w-full" 
        type="range"  
        min={currentSlide.startTime} 
        max={currentSlide.endTime}  
        bind:value={currentTime}
        step="1.0"  
        />

      </div>
    </div>
  
    <div class="w-25 max-w-[25%] min-w-[25%] bg-stone-600 rounded-md p-2">
          {#if selectedItemIndex !== null}
            <SelectItemMenu 
              {itemObjects} 
              selectedItem={selectedItemObject}
              on:select={event => dispatch('selectionChange', { index: event.detail.index })}
            />
            <div class="p-4 bg-gray-800 rounded-lg shadow-md">
              <Toolbar
              {selectedItemIndex}
                { moveUp}
                { moveDown}
                { deleteItem}
                { cloneItem}
                { copyItem}
              />
              <CommandUi 
                selectedItem={selectedItemObject}
                on:change={() => dispatch('itemChange')}
              />
            </div>
          {:else}
            <CanvasCommand {extra} />
          {/if}
        </div>
  </div>