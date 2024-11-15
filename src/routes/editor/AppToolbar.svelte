<script>
    export let createNewSlide;
    export let importFile;
    export let saveSlide;
    export let fileNameToSave;
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
  