<!-- InputCheckbox.svelte -->
<script>
    export let value;
  </script>
  
  <input
    type="checkbox"
    bind:checked={value}
    class="bg-gray-900 text-white rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500"
  />