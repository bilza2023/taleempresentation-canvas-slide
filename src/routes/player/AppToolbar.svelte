<script>
    export let importFile;
  </script>
  
  <div class="flex p-0 m-0 bg-gray-900 text-white gap-2 py-1">
  
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
  </div>
  