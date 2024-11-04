<script>
  //@ts-nocheck
  import { onMount, onDestroy } from "svelte";
  import DrawLibInterpretor from "../drawLib/drawLibInterpretor";
  import DrawLib from "../drawLib/drawLib";
  import itemToObject from "../canvasEditor/componentObjects/itemToObject";

  export let items;
  export let currentTime;
  export let bgImages;
  export let spriteImgArray;
  export let extra;

  let canvas;
  let ctx;
  let drawLib;
  let drawLibInterpretor;
  let interval;
  let isInitialized = false;
  let itemObjects = [];

  const fnList = {};

  function updateItemObjects() {
    itemObjects = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemObj = itemToObject(item, fnList, spriteImgArray);
      if (itemObj) {
        itemObjects.push(itemObj);
      }
    }
  }

  $: {
    if (items.length > 0 && isInitialized) {
      updateItemObjects();
    }
  }

  function gameLoop() {
    try {
      if (!itemObjects || !drawLibInterpretor) return;
      drawLibInterpretor.showGrid = extra.showGrid;
      drawLibInterpretor.gridLineWidth = extra.gridLineWidth;
      drawLibInterpretor.gridLineColor = extra.gridLineColor;
      drawLibInterpretor.cellWidth = extra.cellWidth;
      drawLibInterpretor.cellHeight = extra.cellHeight;

      drawLibInterpretor.interpret(currentTime, extra);

      for (let i = 0; i < itemObjects.length; i++) {
        const item = itemObjects[i];
        try {
          if (item.isVisible(currentTime)) {
            item.draw(drawLib, currentTime, extra);
          }
        } catch (itemError) {
          console.error(`Error drawing item at index ${i}:`, itemError);
          console.error('Item object:', item);
        }
      }
    } catch (error) {
      console.error('Error in gameLoop:', error);
      console.error('Error stack trace:', error.stack);
      if (itemObjects) {
        console.error('Number of itemObjects:', itemObjects.length);
      }
      if (extra) {
        console.error('Extra object:', extra);
      }
    }
  }

  async function initializeCanvas() {
    if (!canvas) return false;
    
    if (interval) {
      clearInterval(interval);
    }

    ctx = canvas.getContext("2d");
    drawLib = new DrawLib(canvas, ctx);
    
    drawLibInterpretor = new DrawLibInterpretor(
      canvas,
      ctx,
      extra,
      spriteImgArray,
      bgImages
    );

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

  function handleMouseMove(e) {}
  function handleMouseDown(e) {}
  function handleMouseUp(e) {}
  function handleClick(e) {}
</script>

<div class="flex justify-center w-full">
  <canvas
    class="w-full m-2"
    bind:this={canvas}
    width={extra.canvasWidth}
    height={extra.canvasHeight}
    on:mousemove={handleMouseMove}
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:click={handleClick}
  ></canvas>
</div>