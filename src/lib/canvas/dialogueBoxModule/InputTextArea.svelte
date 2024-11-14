<!-- InputTextArea.svelte -->
<script>
    export let value;
  </script>
  
  <textarea
    bind:value
    class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500"
  ></textarea>