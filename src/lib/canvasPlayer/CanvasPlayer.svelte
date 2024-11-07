<script>
  /**   
   * 7-Nov-2024 --Final
   * ==========
    - CanvasPlayer.svelte is for  display on the canvas and thats all.
    -  **do not add any functinality into it**.
    - All it does is draw itemObjects and thats all.
    - Mainly it draw itemObjects given in items.
    - We can also feed it itemObjects in preDraw and postDraw functions since they also get ctx as argement.
    - We also have some hooks like onMount and onDestroy to setup and teardown canvas and interval.
    - it does not concern its self with the selectedItem and drawing handles for the selectedItem since that functionality should be seperate.
    - We can manage selected item using slide.items seperately in parent file and also add Handles for selectedItem using postDraw callback.
    - it has gameLoop -- why ??? i checked chat-gpt it is good for smooth animation.mouse tracking is not here.
    - i should add functions for mouse events like click , mouse move etc.

   */
  
  import { onMount, onDestroy } from "svelte";
  import DrawLib from "../drawLib/drawLib";
  import itemToObject from "../componentObjects/itemToObject";

    // Common props
    export let currentTime;
    export let slideData={}; // ? why is this not used?? 
    export let items = []; // Optional for editor mode
    export let slideExtra = {};
    export let assets;
    export let itemObjects = []; // Can be passed directly in editor mode

    export let preDraw = () => {};   // Default empty function
    export let postDraw = () => {};  // Default empty function

    export let eventMouseMove = () => {};
    export let eventMouseDown = () => {};
    export let eventMouseUp = () => {};  
    export let eventClick = () => {};  
    export let eventDblClick = () => {};  
    // export let eventKeyDown = () => {};  
    function handleMouseMove(event) {
      eventMouseMove(event, ctx);
  }
    function handleClick(event) {
    eventClick(event, ctx);
  }
    function handleMouseDown(event) {
      eventMouseDown(event, ctx);
  }
    function handleDbClick(event) {
      eventDblClick(event, ctx);
  }
    ///////////////////////////////////////////
    
    let canvas;
    let ctx;
    let drawLib;
    let interval;
    let isInitialized = false;
    const fnList = {}; //there is no need for it it should be removed BUt itemToObject(item, fnList, assets.spriteImages) needs it and that needs to be checked 
  
    function updateItemObjects(){
      itemObjects = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const itemObj = itemToObject(item, fnList, assets.spriteImages);
          if (itemObj) {
            itemObjects.push(itemObj);
          }
        }
    }
    $: {
      items;
      updateItemObjects();
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
            preDraw(drawLib.ctx);   
            item.draw(drawLib.ctx, currentTime, slideExtra);
            postDraw(drawLib.ctx);   
          }
        }
  
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  
    async function initializeCanvas() {
      if (!canvas) return false;
      
      if (interval) { clearInterval(interval);}
      
      ctx = canvas.getContext("2d");
      drawLib = new DrawLib(canvas, ctx);//just used twice we can remove drawLib if we want
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
  
  </script>
  
  <div class="flex justify-center w-full">
    <canvas
      class="w-full m-2"
      bind:this={canvas}
      width={slideExtra.canvasWidth}
      height={slideExtra.canvasHeight}

      on:mousemove={handleMouseMove}
      on:mousedown={handleMouseDown}
      on:mouseup=  {eventMouseUp}
      on:click =  {handleClick}
      on:dblclick={handleDbClick}
    ></canvas>
  </div>
  