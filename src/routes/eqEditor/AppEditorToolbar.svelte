<script>
    export let slide;

    export let createNewSlide=()=>{};
    let fileNameToSave='slide-1';

function saveSlide(){
   debugger;
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
  </script>
  
  <div class="flex p-0 m-0 bg-gray-900 text-white gap-2 py-1">
    <button class="text-[10px]" on:click={createNewSlide}>New 📰</button>
  
    <!-- Add file input button -->
    <label class="text-[10px] ml-2 cursor-pointer">
      Import 📂
      <input 
        type="file" 
        accept=".js"
        on:change={importFile}
        class="hidden"
      />
    </label>
    <button class="text-[10px]" on:click={saveSlide}>Save 💾</button>
    <input 
      class="text-[10px] p-0 text-white bg-gray-600 rounded-md text-center" 
      type="text" 
      bind:value={fileNameToSave} 
    />
  </div>
  