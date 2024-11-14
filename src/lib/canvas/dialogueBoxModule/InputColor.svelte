<!-- InputColor.svelte -->
<script>
    export let value;
  </script>
  
  <input
    type="color"
    bind:value
    class="bg-gray-900 text-white rounded-md border border-gray-600 p-1 focus:ring-1 focus:ring-pink-500"
  />