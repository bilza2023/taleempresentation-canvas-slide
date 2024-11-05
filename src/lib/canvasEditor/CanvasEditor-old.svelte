<script>
  /**
   * 5-Nov-2024 -merged CanvasEditor and EditorFrame.svelte
   * The main actors are currentSlide , items , itemObjects and selectedItemObject.
  */

  import { createEventDispatcher, onMount } from 'svelte';
  import { toast } from "@zerodevx/svelte-toast";
  
  import EditorToolbar from './EditorToolbar.svelte';
  import CanvasEditorPlayer from "./CanvasEditorPlayer.svelte";
  import SelectItemMenu from './json-ui/SelectItemMenu.svelte';   
  import Toolbar from "./json-ui/Toolbar.svelte";
  import CanvasCommand from "./json-ui/commands/CanvasCommand.svelte";
  // import CommandUi from './dialogueBoxModule/CommandUi.svelte';
  
  import itemToObject from "./componentObjects/itemToObject";
  
  import { addNewItem, moveUp, moveDown, copyItem, pasteItem, cloneItem, deleteItem } from './itemOperations.js';
  
  ///////////////////////////////////////////////////////////////////////////////
  
  // Props
  export let selectedItemIndex = 0; //this should not be export
  export let items; // items are currentSlide.items (it should just be slide)
  export let currentSlide;// items are currentSlide.items (it should just be slide)
  export let extra;   //this should be slideExtra not to be confused with item.extra
  export let currentTime = 0; // pulse ???

  export let spriteImages = [];
  export let bgImages = [];
  export let icons;
  
  let playerImages = [];
  const dispatch = createEventDispatcher();

  // State
  let showSideBar = 0;
  let oldSlideUuid = "";
  let itemObjects = [];

  onMount(async () => {
    currentSlide.startTime = currentSlide.startTime ?? 0;
    currentSlide.endTime = currentSlide.endTime ?? 10;
    currentTime = currentSlide.startTime;
  });
// this is not selected slide BUT selected item
  $: selectedItemObject = selectedItemIndex !== null ? itemObjects[selectedItemIndex] : null;
 
  $:{
    debugger;
    currentSlide;//every slide must have uuid
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
          del: () => handleDeleteItem(index)
        },
        spriteImages
      );
    });
  }
  
  function handleAddNewItem(newItemExtraFn) {
    items = addNewItem(items, newItemExtraFn);
  }
  
  function handleMoveUp(index) {
    items = moveUp(items, index);
  }
  
  function handleMoveDown(index) {
    items = moveDown(items, index);
  }
  
  function handleCopyItem(index) {
    copyItem(items, index);
  }
  
  function handlePasteItem() {
    items = pasteItem(items);
  }
  
  function handleCloneItem(index) {
    items = cloneItem(items, index);
  }
  
  function handleDeleteItem(index) {
    items = deleteItem(items, index);
  }
  
  function toggleShowCanvas() {
    showSideBar = (showSideBar >= 2) ? 0 : showSideBar + 1;
  }

  function handleClickParent(e, mouseX, mouseY) {
    for (let i = 0; i < itemObjects.length; i++) {
      const item = itemObjects[i];
      if (item.isHit(mouseX, mouseY)) {
        selectedItemIndex = i;
        return;
      }
    }
    selectedItemIndex = null;
  }
</script>

{#if items}
<div class='p-2 bg-stone-800 w-full min-h-screen '>
  <EditorToolbar
    bind:items={items}
    toggleShowCanvas={toggleShowCanvas}
    pasteItem={handlePasteItem}
    addNewItem={handleAddNewItem}
    {icons}
  />
     <!-- extra renamed as slideExtra inside CanvasEditorPlayer   -->
  <div class='flex justify-between gap-2 '>
      <div class='w-[75%] flex-grow'> 
        <CanvasEditorPlayer 
          {items}
          slideExtra={extra}
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
    
      <div class="w-25 max-w-[25%] min-w-[25%] bg-stone-600 rounded-md p-2">
        {#if selectedItemIndex !== null}
          <SelectItemMenu 
            {itemObjects} 
            selectedItem={selectedItemObject}
            on:select={event => selectedItemIndex = event.detail.index}
          />
          <div class="p-4 bg-gray-800 rounded-lg shadow-md">
            <Toolbar
              {selectedItemIndex}
              moveUp={handleMoveUp}
              moveDown={handleMoveDown}
              deleteItem={handleDeleteItem}
              cloneItem={handleCloneItem}
              copyItem={handleCopyItem}
            />
            <!-- <CommandUi 
              selectedItem={selectedItemObject}
              on:change={() => dispatch('itemChange')}
            /> -->
          </div>
        {:else}
          <CanvasCommand {extra} />
        {/if}
      </div>
    </div>
  </div>
</div>
{/if}