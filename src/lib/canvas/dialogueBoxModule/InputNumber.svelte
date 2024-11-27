<!-- InputNumber.svelte -->
<script>
  export let value;

  $: valueWithoutDecimal = value ? Math.trunc(value) : value;

  function handleInput(e) {
      value = parseInt(e.target.value);
  }
</script>

<input
  type="number"
  value={valueWithoutDecimal}
  on:input={handleInput}
  class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500 text-xs"
/>