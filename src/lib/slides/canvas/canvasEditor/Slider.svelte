<script>
    export let value; // Changed from currentTime to value since that's what we're binding to
    export let startTime;
    export let endTime;
    
    $: {
        value;  // Changed from currentTime to value
        console.log('value:', value);
        console.log('startTime:', startTime);
        console.log('endTime:', endTime);
    }    
</script>

<input 
    class="w-full" 
    type="range"  
    min={startTime} 
    max={endTime}  
    bind:value
    step="1.0"  
/>