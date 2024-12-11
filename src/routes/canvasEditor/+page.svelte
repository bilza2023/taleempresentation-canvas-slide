<script>
   import AppToolbar from "./AppToolbar.svelte";
  import {CanvasEditor}  from "$lib";
  import {onMount} from "svelte";

  import {SlideObject} from "$lib";

  import {loadAssets} from "$lib";
  let slide = null;
  let showAddToolbar = true;
  let assets = null;
  
  let fileNameToSave = 'slide';

  function createNewSlide(){
    slide = SlideObject.Canvas.newSlide();
  }
  
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
    slide = SlideObject.Canvas.newSlide();
    // console.log("SlideObject.Canvas.getAllItemsExtras()",SlideObject.Canvas.getAllItemsExtras());
  });

</script>

<AppToolbar 
  {createNewSlide} 
  {importFile} 
  {saveSlide} 
  bind:fileNameToSave 
/>


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

