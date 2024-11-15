<script>
   import AppToolbar from "./AppToolbar.svelte";
  import {CanvasEditor}  from "$lib";
  import {onMount} from "svelte";
  import {Slide} from "../../lib/canvas/samples/demo";
  import {slide as NewSlide} from "./slide.js";
  import loadAssets from "../assets/loadAssets";
  import getNewCanvasSlide from "../../lib/canvas/CanvasEditor/getNewCanvasSlide.js";
  
  let slide = null;
  let showAddToolbar = true;
  let assets = null;
  
  let fileNameToSave = 'slide';

  function createNewSlide(){
    slide = NewSlide;
  }

  async function importFile(event) {
  
    const file = event.target.files[0];
    if (file) {
      try {
        const text = await file.text();
        // Remove any export/import statements and get the object
        const cleanedText = text.replace(/export\s+const\s+\w+\s*=\s*/, '');
        // Using Function constructor to safely evaluate the JS object
        const slideData = (new Function(`return ${cleanedText}`))();
        // debugger;
        // const slideData = JSON.parse(cleanedText);
        slide = slideData;
        // console.log("slide", slide);
      } catch (error) {
        console.error('Error loading JS file:', error);
        alert('Error loading file. Please ensure it is a valid JS file with a slide object.');
      }
    }
  }

  onMount(async()=>{
    assets = await loadAssets(); 
    slide = Slide;
  });

  function saveSlide(){
    const jsonString = `export const Slide = ${JSON.stringify(slide, null, 2)}`;
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileNameToSave}.js`;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<AppToolbar 
  {createNewSlide} 
  {importFile} 
  {saveSlide} 
  bind:fileNameToSave 
/>

<!-- <div class="flex p-0 m-0 bg-gray-900 text-white gap-2 py-1">
  <button class="text-[10px]" on:click={newPresentation}>New 📰</button>
   

  <label class="text-[10px] ml-2 cursor-pointer">
    Import 📂
    <input 
      type="file" 
      accept=".js"
      on:change={importFile}
      class="hidden"
    />
  </label>
  <button class="text-[10px] " on:click={saveSlide}>Save 💾</button>
  <input class='text-[10px] p-0 text-white bg-gray-600 rounded-md text-center' type='text' bind:value={fileNameToSave} />
 
</div> -->

<div class="w-full bg-gray-700 text-white py-2 px-1 min-h-screen ">
  {#if slide && assets}
    <CanvasEditor
     bind:items = {slide.items}
     bind:slideExtra = {slide.slideExtra}
     {assets}
     {showAddToolbar}
    />
  {/if}
</div>