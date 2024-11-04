<script>
    //@ts-nocheck
    import {Icons} from '../../../../util';
 export let selectedItemIndex;
 export let moveUp;
 export let moveDown;
 export let cloneItem;
 export let deleteItem;
 export let copyItem;


</script>

<div class="flex w-full justify-around  text-white  ">

    <div class="flex  justify-end  gap-1">
    
        <button 
        on:click={()=>moveUp(selectedItemIndex)}
        class=" p-1 m-1 text-xs rounded-md hover:bg-slate-700">&#9650;</button>
        
        <button 
        on:click={()=>moveDown(selectedItemIndex)}
        class=" p-1 m-1 text-xs rounded-md hover:bg-slate-700">&#9660;</button>
        

        <button 
        on:click={()=>cloneItem(selectedItemIndex)}
        class=" p-1 m-1 text-xs rounded-md hover:bg-slate-700">🐑</button>

        <button 
        on:click={()=>copyItem(selectedItemIndex)}
        class=" p-1 m-1 text-xs rounded-md hover:bg-slate-700">📃</button>
        
        <button 
        on:click={()=>deleteItem(selectedItemIndex)}
        class=" p-1 m-1 text-xs rounded-md hover:bg-slate-700">{Icons.DEL}</button>
    
    </div>
</div>
