<script>
    // @ts-nocheck
    
    export let items;
    export let selectedItemIndex;
    export let setSelectedItemIndex;
    
    // Function to handle change event
    function handleChange(event) {
        const selectedIndex = parseInt(event.target.value);
        setSelectedItemIndex(selectedIndex);
    }
  
    </script>
    
    
    <select
    class="bg-stone-700 text-white m-1 p-2 rounded-md border-2 border-white"
    on:change={handleChange}
    value={selectedItemIndex}
    >
    {#each items as item, index}
        <option value={index}>
        {item.itemExtra.name}
        </option>
    {/each}
    </select>