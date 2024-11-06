<script>
  import { onMount, onDestroy } from "svelte";
  import DrawLib from "../drawLib/drawLib";
  import itemToObject from "./componentObjects/itemToObject";

    // Common props
    export let currentTime;
    export let slideData;
    export let items = []; // Optional for editor mode
    export let slideExtra = {};
    export let assets;

    ///////////////////////////////////////////
    export let itemObjects = []; // Can be passed directly in editor mode
    export let isEditorMode = false;
    export let selectedItem = null; // Only used in editor mode
    
    let canvas;
    let ctx;
    let drawLib;
    let interval;
    let isInitialized = false;
    
    // For editor mode mouse tracking
    let mouseX = 0;
    let mouseY = 0;
  
    const fnList = {};
  
    function updateItemObjects() {
      // debugger;
      // if (!isEditorMode && items.length > 0) {
        itemObjects = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const itemObj = itemToObject(item, fnList, assets.spriteImages);
          if (itemObj) {
            itemObjects.push(itemObj);
          }
        }
      // }
    }
  
    $: {
      // debugger;
      items;
      // if (!isEditorMode && items.length > 0 && isInitialized) {
        updateItemObjects();
      // }
    }
  
    function drawBackground() {
      if(!slideExtra.bgGlobalAlpha) {
        slideExtra.bgGlobalAlpha = 1;
      }
  
      drawLib.clear(slideExtra.backgroundColor);
  
      if(slideExtra.bgImg !== "null") {
        for (let i = 0; i < assets.bgImages.length; i++) {
          const element = assets.bgImages[i];
          if(element.name === slideExtra.bgImg) {
            drawLib.bgImage(element.img, slideExtra.bgGlobalAlpha || 1);
            break;
          }
        }
      }
  
      if(slideExtra.showGrid) {
        drawLib.grid(
          slideExtra.cellWidth, 
          slideExtra.cellHeight, 
          slideExtra.gridLineWidth, 
          slideExtra.gridLineColor
        );
      }
    }
  
    function gameLoop() {
      try {
        if (!itemObjects) return;
        
        drawBackground();
  
        for (let i = 0; i < itemObjects.length; i++) {
          const item = itemObjects[i];
          if (item.isVisible(currentTime)) {
            item.draw(drawLib.ctx, currentTime, slideExtra);
          }
        }
  
        // Only in editor mode
        if (isEditorMode && selectedItem) {
          selectedItem.drawHandles(ctx);
        }
  
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  
    async function initializeCanvas() {
      if (!canvas) return false;
      
      if (interval) {
        clearInterval(interval);
      }
      
      ctx = canvas.getContext("2d");
      // Set the canvas size to the device's pixel ratio
      // const dpr = window.devicePixelRatio || 1;
      // canvas.width =  canvas.width * dpr;
      // canvas.height = canvas.height * dpr;
      // ctx.scale(dpr, dpr);

      
      drawLib = new DrawLib(canvas, ctx);
  
      isInitialized = true;
      updateItemObjects();
      
      interval = setInterval(gameLoop, 20);
      return true;
    }
  
    onMount(async () => {
      if (canvas) {
        await initializeCanvas();
      }
    });
  
    onDestroy(() => {
      if (interval) {
        clearInterval(interval);
      }
    });
  
    // Editor mode mouse handling functions
    function setMousePosition(e) {
      if (!isEditorMode) return;
      
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
  
      mouseX = Math.round((e.clientX - rect.left) * scaleX);
      mouseY = Math.round((e.clientY - rect.top) * scaleY);
    }
  
    function handleMouseMove(e) {
      if (!isEditorMode || !selectedItem) return;
      setMousePosition(e);
      selectedItem.update(mouseX, mouseY);
    }
  
    function handleMouseDown(e) {
      if (!isEditorMode || !selectedItem) return;
      setMousePosition(e);
      selectedItem.selectHandlesIfHit(mouseX, mouseY);
    }
  
    function handleMouseUp(e) {
      if (!isEditorMode || !selectedItem) return;
      setMousePosition(e);
      selectedItem.deselect();
    }
  
    function handleClick(e) {
      if (!isEditorMode) return;
      setMousePosition(e);
    
      
    }
  </script>
  
  <div class="flex justify-center w-full">
    <canvas
      class="w-full m-2"
      bind:this={canvas}
      width={slideExtra.canvasWidth}
      height={slideExtra.canvasHeight}
      on:mousemove={handleMouseMove}
      on:mousedown={handleMouseDown}
      on:mouseup={handleMouseUp}
      on:click={handleClick}
    ></canvas>
  </div>
  {#if isEditorMode}
    <div class="text-xs">x:{mouseX} y:{mouseY}</div>
  {/if}
  