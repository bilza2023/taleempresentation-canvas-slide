<script>
  import EditorToolbar from './EditorToolbar.svelte'; //canvas slide toolbar 
  import { toast } from "@zerodevx/svelte-toast";
  import {getNewItem} from '../../../index.js';
  import EditorFrame from "./EditorFrame.svelte";
  // Props
  export let currentSlide;
  export let selectedItemIndex;
  export let items;
  export let extra;
  export let currentTime;
  // export let startTime; ///important
  // export let endTime; // important
  export let spriteImages;
  export let bgImages;
  export let icons;
         let playerImages;
  
  // State
  let securrentSlidelectedItemIndex = null;
  let showSideBar = 0;
  
  // Item manipulation functions
  function addNewItem(newItemExtraFn) {
    const newItemExtra = newItemExtraFn();
    const newItem = getNewItem();
    newItem.extra = newItemExtra;    
    items.unshift(newItem);      
    items = [...items];
  }
  
  function moveUp(index) {
    if (index > 0) {
      const item = items.splice(index, 1)[0];
      items.splice(index - 1, 0, item);
      items = [...items];
    }selectedItemIndex
  }
  
  function moveDown(index) {
    if (index >= 0 && index < items.length - 1) {
      const item = items.splice(index, 1)[0];
      items.splice(index + 1, 0, item);
      items = [...items];
    }
  }
  
  function copyItem(index) {
    if (index >= 0) {
      localStorage.setItem("copiedItem", JSON.stringify(items[index]));
      toast.push("item copied");
    }
  }
  
  function pasteItem() {
    const copiedItem = localStorage.getItem("copiedItem");
    if (copiedItem) {
      const item = JSON.parse(copiedItem);
      item._id = null;
      items = [...items, item];
      toast.push("item pasted");
    } else {
      toast.push("no copied item found");
    }
  }
  
  function cloneItem(index) {
    debugger;
    if (index >= 0) {
      const clonedItem = JSON.parse(JSON.stringify(items[index]));
      delete clonedItem._id;
      items.unshift(clonedItem);
      items = [...items];
    }
  }
  
  function deleteItem(index) {
    if (index >= 0) {
      items.splice(index, 1);
      items = [...items];
    }
  }
  
  function toggleShowCanvas() {
    showSideBar = (showSideBar >= 2) ? 0 : showSideBar + 1;
  }
  
  function handleSelectionChange(event) {
    selectedItemIndex = event.detail.index;
  }
  </script>
  
  {#if items}
  <div class='p-2 bg-stone-900'>
    <EditorToolbar
      bind:items={items}
      {toggleShowCanvas}
      {pasteItem}
      {addNewItem}
    />
       
    <div class='flex justify-between gap-2'>
      <EditorFrame 
      {currentSlide}
        {items}
        {extra}
        {currentTime}
        {spriteImages}
        {bgImages}
        {playerImages}
        {selectedItemIndex}
        {moveUp}
        {moveDown}
        {deleteItem}
        {cloneItem}
        {copyItem}
        on:selectionChange={handleSelectionChange}
      />
    </div>
  </div>
  {/if}