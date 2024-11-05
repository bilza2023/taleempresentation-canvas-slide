<script>
  //@ts-nocheck
  import { onMount,onDestroy } from "svelte";
  import checkHandles from "./fn/checkHandles.js";
  import itemToObject from "./componentObjects/itemToObject";
  import setHandlesForEachItem from "./handleObject/setHandlesForEachItem"; //?
  import DrawLib from "../drawLib/drawLib";
 
//Props 
  export let currentTime; //why not pulse.
  export let spriteImages; // images for this slide
  export let handleClickParent; //??
  export let bgImages; // images for slide background
  export let slideExtra; // this is slideExtra renamed here from extra
  export let itemObjects; // 
  export let selectedItem;


  let canvas;
  let ctx;
  let orignalExtra;
 let drawLib;
  function gameLoop() {
    try {
      if (itemObjects) {
        debugger;
      
        if(!slideExtra.bgGlobalAlpha){slideExtra.bgGlobalAlpha=1;}

          drawLib.clear(slideExtra.backgroundColor);

if(slideExtra.bgImg !== "null"){
    for (let i = 0; i < bgImages.length; i++) {
        const element = bgImages[i];
        if(element.name == slideExtra.bgImg){
            // debugger;
            drawLib.bgImage(element.img,slideExtra.bgGlobalAlpha || 1);
            break;
        }
    }
}         

if(slideExtra.showGrid){
    drawLib.grid(slideExtra.cellWidth, slideExtra.cellHeight, slideExtra.gridLineWidth, slideExtra.gridLineColor);
}
        ///////////////////////////////////////////////////////////////////////////
        

    for (let i = 0; i < itemObjects.length; i++) {
      // debugger;
        const item = itemObjects[i];
        // console.log("item" , item);
        if(item.isVisible(currentTime)){
          // debugger;
            item.draw(drawLib.ctx, currentTime, slideExtra);
          }
    }
        // debugger;
        if(selectedItem){
          selectedItem.drawHandles(ctx);
        }
      }
      
    } catch (error) {
      console.error("Error in gameLoop:", error);
    }
  }
  //////////////////////////////////
  async function init() {
    if (canvas) {
      if (interval) {
        clearInterval(interval);
      }
      //////////////////////////////////////////////
      ctx = canvas.getContext("2d");
      ////////////////////////////////////////////////////////////////////////
      drawLib = new DrawLib(canvas,ctx);
      ////////////////////////////////////////////////////////////////////////
    }
    interval = setInterval(gameLoop, 20);
  }
  //////////////////////////////////
  let interval;
 
  onMount(async () => {
    await init();
  });
  onDestroy(() => {
    clearInterval(interval);
  });

  ///////////////////////////////////////////////////////UI-MOUSE-INTERACTION SECTION
  ///////////////////////////////////////////////////////UI-MOUSE-INTERACTION SECTION
  ///////////////////////////////////////////////////////UI-MOUSE-INTERACTION SECTION
  let mouseX = 0;
  let mouseY = 0;

  

  //--get canvas x,y from mouse x,y. rename setMousePosition to setCanvasXY
  function setMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mouseX = Math.round((e.clientX - rect.left) * scaleX);
    mouseY = Math.round((e.clientY - rect.top) * scaleY);
  }

  function handleMouseMove(e) {
    if (!selectedItem) return;
    setMousePosition(e);
    //update the item and update the handles as per that
    selectedItem.update(mouseX, mouseY);
  }

  function handleMouseDown(e) {
    if (!selectedItem) return;
    setMousePosition(e);
    selectedItem.selectHandlesIfHit(mouseX, mouseY);
  }

  function handleMouseUp(e) {
    if (!selectedItem) return;
    setMousePosition(e);
    selectedItem.deselect();
  }
  function handleClick(e) {
    setMousePosition(e);
    handleClickParent(e,mouseX, mouseY)
  }
 
 
</script>

<div class="flex justify-center w-full">
  <canvas
    class="w-full m-2"
    bind:this={canvas}
    width={slideExtra.canvasWidth}
    height={slideExtra.canvasHeight}
    on:mousemove={handleMouseMove}
    on:mousedown={(e) => handleMouseDown(e)}
    on:mouseup={handleMouseUp}
    on:click={handleClick}
  ></canvas>
</div>
<div class="text-xs">x:{mouseX} y:{mouseY}</div>
