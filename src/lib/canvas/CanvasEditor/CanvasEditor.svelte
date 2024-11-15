<script>
    import { onMount, onDestroy } from "svelte";
    import itemToObject from "../itemObjects/itemToObject";
    import CanvasPlayer from "../canvasPlayer/CanvasPlayer.svelte";
    import SelectedItem from "./SelectedItem";
    import AddToolbar from "./AddToolbar.svelte";
    import getNewItem from "./getNewItem";
    import getMouseData from "./getMouseData";
    import SelectItemMenu from "./SelectItemMenu.svelte";
    import CommandUi from '../dialogueBoxModule/CommandUi.svelte';
    import CanvasCommand from "../dialogueBoxModule/CanvasCommand.svelte";


    export let items;
    export let slideData;
    export let slideExtra;
    export let assets;
    export let showAddToolbar = true;
    //--very important    
    let selectedItem = null;
   
    
    let showCanvasFlag = false;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let selectedItemIndex = -1; // Instead of storing the full object, just store the index
    let interval = null;
    
    onMount(async () => {

    });
    
    onDestroy(async () => {
        clearInterval(interval);
    });
    
    function addNewItem(newItemExtraFn) {
        const newItemExtra = newItemExtraFn();
        const newItem = getNewItem();
        newItem.itemExtra = newItemExtra;
        items.unshift(newItem);
        items = [...items];
        // Select the newly added item
        selectedItemIndex = 0;
        // very important or else the handles will not work
        selectedItem = new SelectedItem(getSelectedItemObject());
    }
    
    
    function eventMouseDown(e, ctx) {
        if (selectedItem) {
            const {x, y} = getMouseData(e);
            selectedItem.mouseDown(x, y);
        }
    }
    
    function eventMouseMove(e, ctx) {
        const {x, y} = getMouseData(e);
        currentMouseX = x.toFixed(0);
        currentMouseY = y.toFixed(0);
        if (selectedItem) {
            selectedItem.mouseMove(x, y);
        }
    }
    
    function eventMouseUp() {
        if (selectedItem) {
            selectedItem.mouseUp();
            items = [...items]; // this is to redraw after move or widen/heighten
        }
    }
    
    async function eventDblClick(e, ctx) {
        await checkHit(e, ctx);
    }
    
    async function checkHit(e, ctx) {
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        for (let i = 0; i < items.length; i++) {
            const itemObject = itemToObject(items[i], assets);
            if (itemObject && itemObject.isHit(x, y, ctx)) {
                selectedItemIndex = i;
                // now we use selectedItemIndex to create a new selectionedItem object
                selectedItem = new SelectedItem(getSelectedItemObject());
                return;
            }
        }
        selectedItemIndex = -1;
        selectedItem = null; // delete selectionedItem object
    }

    function getSelectedItemObject() {
        if (selectedItemIndex === -1) return null;
        // debugger;
        const itemData = items[selectedItemIndex];
        return itemToObject(itemData, assets);
    }
    
    function setSelectedItemIndex(index) {
        selectedItemIndex = index;
    }
    
    function postDraw(ctx) {
        const selectedObj = getSelectedItemObject();
        if (selectedObj) {
            const selected = new SelectedItem(selectedObj);
            selected.drawHandles(ctx);
        }
    }

function showCanvas(){
    showCanvasFlag = !showCanvasFlag;
}    
function clone() {
    if (selectedItem) {
        const clonedItem = JSON.parse(JSON.stringify(items[selectedItemIndex]));
        // Remove _id to avoid duplicates
        delete clonedItem._id;
        // Add slight offset to make it visible that it's a clone
        clonedItem.itemExtra.x = (clonedItem.itemExtra.x || 0) + 20;
        clonedItem.itemExtra.y = (clonedItem.itemExtra.y || 0) + 20;
        // Insert clone right after the selected item
        items.splice(selectedItemIndex, 0, clonedItem);
        items = [...items]; // Trigger reactivity
    }
}

function deleteFn() {
    if (selectedItemIndex !== -1) {
        items.splice(selectedItemIndex, 1);
        items = [...items]; // Trigger reactivity
        selectedItemIndex = -1; // Reset selection
        selectedItem = null; // Clear selected item
    }
}

function logSlide(){
    console.log("Slide" , items);
    console.log("slideExtra" , slideExtra);
}
function redraw(){
    items = [...items]; // Trigger reactivity
}
    </script>
    
    {#if items}
        {#if showAddToolbar}
            <div class="flex  w-full p-0 m-0">
                <AddToolbar icons={assets.icons} {addNewItem} 
                {clone} {deleteFn} {logSlide} {showCanvas} />
            </div>
        {/if}
    
        <div class="flex w-full p-0 m-0 bg-stone-900 text-white p-2  gap-1">
            <div class='mx-1'>
                <CanvasPlayer
                    {slideData}
                    {items}
                    {slideExtra}
                    {assets}
                    {postDraw}
                    {eventMouseDown}
                    {eventMouseUp}
                    {eventDblClick}
                    {eventMouseMove}
                />
                <div class=" bg-gray-900 text-yellow-900 text-sm">{`x: ${currentMouseX}, y: ${currentMouseY}`}</div>
            </div>
            <div class='w-3/12 text-center'>
              
                    
                    {#if showCanvasFlag}
                   <CanvasCommand extra={slideExtra} />
                    {:else}
                                    <SelectItemMenu 
                                        bind:items={items}
                                        {selectedItemIndex}
                                        {setSelectedItemIndex}
                                    />
                                    
                                {#if selectedItemIndex !== -1 && selectedItem}    
                                <CommandUi 
                                bind:item={items[selectedItemIndex]}
                                dialogueBox = {selectedItem.itemObject.dialogueBox}
                                {redraw}
                                />
                                {/if}
                    {/if}
            </div>
        </div>
    {/if}