<script>
    import { onMount, onDestroy } from "svelte";
    import { 
        ctxStore, 
        items, 
        selectedItemIndex, 
        assets as assetsStore,
        itemObjects,
        selectedItem,
        addItem,
        deleteSelectedItem,
        cloneSelectedItem
    } from "../store";
    import {CanvasPlayer} from "../../index";
    import getNewItem from "./getNewItem";
    import getMouseData from "./getMouseData";

    // Props
    export let assets; // We receive assets as prop and set it to store
    export let slideExtra;
    export let logSlide;
    export let showAddToolbar = true;

    // Local state
    let showCanvasFlag = false;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let interval = null;
    
    onMount(async () => {
        // Initialize stores with props
        assetsStore.set(assets);
        if (!$items) {
            items.set([]); // Initialize items if empty
        }
    });
    
    onDestroy(async () => {
        if (interval) {
            clearInterval(interval);
        }
    });
    
    // Item Management Functions
    function addNewItem(newItemExtraFn) {
        const newItemExtra = newItemExtraFn();
        const newItem = getNewItem();
        newItem.itemExtra = newItemExtra;
        addItem(newItem);
    }

    // Event Handlers
    function eventMouseDown(e, ctx) {
        if ($selectedItem) {
            const {x, y} = getMouseData(e);
            $selectedItem.mouseDown(x, y);
        }
    }

    function eventMouseMove(e, ctx) {
        const {x, y} = getMouseData(e);
        currentMouseX = x.toFixed(0);
        currentMouseY = y.toFixed(0);
        if ($selectedItem) {
            $selectedItem.mouseMove(x, y);
        }
    }

    function eventMouseUp() {
        if ($selectedItem) {
            $selectedItem.mouseUp();
            items.update(items => [...items]); // Trigger reactivity
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

        for (let i = 0; i < $items.length; i++) {
            const itemObject = $itemObjects[i];
            if (itemObject && itemObject.isHit(x, y, ctx)) {
                selectedItemIndex.set(i);
                return;
            }
        }
        selectedItemIndex.set(-1);
    }

    // Drawing Functions
    function postDraw(ctx) {
        if ($selectedItem) {
            $selectedItem.drawHandles(ctx);
        }
    }

    // UI Functions
    function showCanvas() {
        showCanvasFlag = !showCanvasFlag;
    }    

    function clone() {
        cloneSelectedItem();
    }

    function deleteFn() {
        deleteSelectedItem();
    }

    function logSlideLocal() {
        logSlide($items, slideExtra);
    }

    function redraw() {
        items.update(items => [...items]); // Trigger reactivity
    }
</script>

{#if $items !== undefined}
    {#if showAddToolbar}
        <div class="flex w-full p-0 m-0">
            <!-- <AddToolbar icons={$assets.icons} {addNewItem}  -->
            <!-- {clone} {deleteFn} {logSlideLocal} {showCanvas} /> -->
        </div>
    {/if}

    <div class="flex w-full p-0 m-0 bg-stone-900 text-white p-2 gap-1">
        <div class='mx-1'>
            <CanvasPlayer
                {slideExtra}
                {postDraw}
                {eventMouseDown}
                {eventMouseUp}
                {eventDblClick}
                {eventMouseMove}
            />

            <div class="bg-gray-900 text-[10px] text-yellow-600">
                <span class="bg-stone-700 rounded-md p-1">{`x: ${currentMouseX} y: ${currentMouseY}`}</span>
                <span class="bg-stone-700 rounded-md p-1">{`Total Items = ${$items?.length || 0}`}</span>
                {#if $selectedItem}    
                    <span class="bg-stone-700 rounded-md p-1">
                        {`Selected Item = ${$selectedItem.itemObject.itemData.itemExtra.name}`}
                    </span>
                {/if}
            </div>
        </div>

        <div class='w-3/12 text-center'>
            {#if showCanvasFlag}
                <!-- <CanvasCommand extra={slideExtra} /> -->
            {:else}
                <!-- <SelectItemMenu 
                    bind:items={$items}
                    selectedItemIndex={$selectedItemIndex}
                    setSelectedItemIndex={(i) => selectedItemIndex.set(i)}
                /> -->
                
                {#if $selectedItem}    
                    <!-- <CommandUi 
                    bind:item={$items[$selectedItemIndex]}
                    dialogueBox={$selectedItem.itemObject.dialogueBox}
                    {redraw}
                    /> -->
                {/if}
            {/if}
        </div>
    </div>
{/if}