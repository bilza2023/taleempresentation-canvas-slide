
<script>
export let currentTime;
export let startTime;
export let endTime;
export let items;

</script>

<div class="w-full">
    <div class="flex gap-2">
      <div class="border-2 border-white rounded-md p-1 text-xs">Seconds:{currentTime}</div>
      <div class="border-2 border-white rounded-md p-1 text-xs">items:{items.length}</div>
    </div>
  
    <input 
      class="w-full" 
      type="range"  
      min={startTime} 
      max={endTime}  
      bind:value={currentTime}
      step="1.0"  
    />
</div>