<script>
  //@ts-nocheck
  import {itemsStore} from "../store";
  import CodeTxt from './CodeTxt.svelte';
  import VerticalBtns from './VerticalBtns.svelte';
  import Table from './Table.svelte';
  import TableCode from './TableCode.svelte';
  
  export let i;
  
  $: {
    i;
      $itemsStore;
      // debugger;
      // console.log("$itemsStore[i].itemExtra.sp", $itemsStore[i].itemExtra.sp);
  }
  
  function moveUp(j) {
      if (j <= 0) return;
      
      // Create a new array to trigger reactivity
      const newSp = [...$itemsStore[i].itemExtra.sp];
      const spToMove = newSp[j];
      newSp.splice(j, 1);
      newSp.splice(j - 1, 0, spToMove);
      
      // Update the store with a new array
      $itemsStore = $itemsStore.map((item, index) => {
          if (index === i) {
              return {
                  ...item,
                  itemExtra: {
                      ...item.itemExtra,
                      sp: newSp
                  }
              };
          }
          return item;
      });
  }
  
  function moveDown(j) {
      if (j == $itemsStore[i].itemExtra.sp.length - 1) return;
      
      const newSp = [...$itemsStore[i].itemExtra.sp];
      const spToMove = newSp[j];
      newSp.splice(j, 1);
      newSp.splice(j + 1, 0, spToMove);
      
      $itemsStore = $itemsStore.map((item, index) => {
          if (index === i) {
              return {
                  ...item,
                  itemExtra: {
                      ...item.itemExtra,
                      sp: newSp
                  }
              };
          }
          return item;
      });
  }
  
  function del(j) {
      const newSp = [...$itemsStore[i].itemExtra.sp];
      newSp.splice(j, 1);
      
      $itemsStore = $itemsStore.map((item, index) => {
          if (index === i) {
              return {
                  ...item,
                  itemExtra: {
                      ...item.itemExtra,
                      sp: newSp
                  }
              };
          }
          return item;
      });
  }
  
  function updateTableData(j, data) {
      const newSp = [...$itemsStore[i].itemExtra.sp];
      newSp[j].code = data;
      
      $itemsStore = $itemsStore.map((item, index) => {
          if (index === i) {
              return {
                  ...item,
                  itemExtra: {
                      ...item.itemExtra,
                      sp: newSp
                  }
              };
          }
          return item;
      });
  }
  </script>
  
  <div id={`eqPart`} class={`w-full bg-yellow-900 text-center rounded-md justify-center p-2`}>
      {#each $itemsStore[i].itemExtra.sp as sp, j}
          {#if (sp.type == 'code')}
              <div class="flex justify-center bg-stone-600 rounded-md w-8/12 mx-auto mb-4 mt-2 gap-1">
                  <textarea class="bg-stone-900 rounded-md w-5/12 mx-auto"
                      bind:value={sp.code}></textarea>
                  <div class="bg-stone-900 rounded-md w-5/12 mx-auto">
                      <CodeTxt eq={sp}/>
                  </div>
                  <div class='w-2/12'>
                      <VerticalBtns {moveUp} {moveDown} {del} {j}/>
                  </div>
              </div>
          {/if}
        
                  {#if (sp.type == 'text' || sp.type == 'txt')}
          <div class="flex justify-center rounded-md w-8/12 mx-auto mb-4 mt-2 gap-1">
            <textarea class="bg-stone-900 rounded-md w-10/12 mx-auto" bind:value={sp.code}></textarea>
            <div class='w-2/12'>
              <VerticalBtns {moveUp} {moveDown} {del} {j}/>
            </div>
          </div>
        {/if}
    
        {#if (sp.type == 'heading' || sp.type == 'hdg')}
          <div class="flex justify-center rounded-md w-8/12 mx-auto mb-4 mt-2 gap-1">
            <input class="bg-stone-900 rounded-md w-10/12 mx-auto" bind:value={sp.code} />
            <div class='w-2/12'>
              <VerticalBtns {moveUp} {moveDown} {del} {j}/>
            </div>
          </div>
        {/if}
    
        {#if (sp.type == 'img' || sp.type == 'image')}
          <div class="flex justify-center rounded-md w-8/12 mx-auto mb-4 mt-2 gap-1">
            <input type="text" class="bg-stone-900 rounded-md w-10/12 mx-auto" bind:value={sp.code}/>
            <div class='w-2/12'>
              <VerticalBtns {moveUp} {moveDown} {del} {j}/>
            </div>
          </div>
        {/if}
    
        {#if (sp.type == 'table' || sp.type == 'tbl')}
          <div class="flex justify-center rounded-md w-full mx-auto mb-4 mt-2 gap-1">
            <Table bind:item={sp.code} {moveUp} {moveDown} {del} {j}/>
          </div>
        {/if}
    
        {#if (sp.type == 'tableCode')}
          <TableCode bind:item={sp.code} {moveUp} {moveDown} {del} {redraw} {j}/>
        {/if}

      {/each}
  </div>