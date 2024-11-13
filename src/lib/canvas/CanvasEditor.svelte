<script>
    import { onMount, onDestroy } from "svelte";
    import itemToObject from "./itemObjects/itemToObject";
    import CanvasPlayer from "./canvasPlayer/CanvasPlayer.svelte";
    import SelectedItem from "./CanvasEditor/SelectedItem";
    import AddToolbar from "./CanvasEditor/AddToolbar.svelte";
    import getNewItem from "./CanvasEditor/getNewItem";
    import getMouseData from "./CanvasEditor/getMouseData";
    import SelectItemMenu from "./CanvasEditor/SelectItemMenu.svelte";
    import CommandUi from './dialogueBoxModule/CommandUi.svelte';
    
    export let items;
    export let slideData;
    export let slideExtra;
    export let assets;
    export let showAddToolbar = true;
    
    let selectedItemIndex = -1; // Instead of storing the full object, just store the index
    let interval = null;
    
    onMount(async () => {
        interval = setInterval(update, 20);
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
    }
    
    function update() {
        console.log("update");
    }
    
    function getSelectedItemObject() {
        if (selectedItemIndex === -1) return null;
        // debugger;
        const itemData = items[selectedItemIndex];
        return itemToObject(itemData, assets);
    }
    
    function deleteSelectedItem() {
        if (selectedItemIndex !== -1) {
            items.splice(selectedItemIndex, 1);
            items = [...items];
            selectedItemIndex = -1;
        }
    }
    
    function eventMouseDown(e, ctx) {
        const selectedObj = getSelectedItemObject();
        if (selectedObj) {
            const {x, y} = getMouseData(e);
            new SelectedItem(selectedObj).mouseDown(x, y);
        }
    }
    
    function eventMouseMove(e, ctx) {
        const selectedObj = getSelectedItemObject();
        if (selectedObj) {
            const {x, y} = getMouseData(e);
            new SelectedItem(selectedObj).mouseMove(x, y);
        }
    }
    
    function eventMouseUp() {
        const selectedObj = getSelectedItemObject();
        if (selectedObj) {
            new SelectedItem(selectedObj).mouseUp();
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
                return;
            }
        }
        selectedItemIndex = -1;
    }
    
    function setSelectedItemIndex(index) {
        selectedItemIndex = index;
    }
    
    function postDraw(ctx) {
        const selectedObj = getSelectedItemObject();
        if (selectedObj) {
            const selected = new SelectedItem(selectedObj);
            selected.setDeleteCallback(deleteSelectedItem);
            selected.drawHandles(ctx);
        }
    }
    </script>
    
    {#if items}
        {#if showAddToolbar}
            <div class="flex justify-center w-full p-0 m-0">
                <AddToolbar icons={assets.icons} {addNewItem} />
            </div>
        {/if}
    
        <div class="flex w-full p-0 m-0 bg-stone-900 text-white p-2 min-h-screen">
            <div class='w-9/12'>
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
            </div>
    
            <div class='w-3/12 text-center'>
                {#if selectedItemIndex !== -1}
                    <SelectItemMenu 
                        bind:items={items}
                        {selectedItemIndex}
                        {setSelectedItemIndex}
                    />
                    <CommandUi 
                    bind:item={items[selectedItemIndex]}
                    dialogueBox = {getSelectedItemObject().dialogueBox}
                    />
                {/if}
            </div>
        </div>
    {/if}