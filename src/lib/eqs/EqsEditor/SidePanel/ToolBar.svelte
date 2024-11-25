<script>
  //@ts-nocheck
  export let item;
  
  const addTable = () => {
    const tblData = { code: `[["",""],["",""]]`, type: 'table' };
    
    item = {
      ...item,
      itemExtra: {
        ...item.itemExtra,
        sp: [...item.itemExtra.sp, tblData]
      }
    };
  }
  
  const addTableCode = () => {
    const tblData = { code: `[["",""],["",""]]`, type: 'tableCode' };
    
    item = {
      ...item,
      itemExtra: {
        ...item.itemExtra,
        sp: [...item.itemExtra.sp, tblData]
      }
    };
  }
  
  function addTxtCodeImg(textOrCode = "text") {
    let newItem;
    if (textOrCode == "code") {
      newItem = { code: "", type: 'code' };
    }
    if (textOrCode == "text") {
      newItem = { code: "", type: 'text' };
    }
    if (textOrCode == "image") {
      newItem = { code: "wood", type: 'image' };
    }
    if (textOrCode == "heading") {
      newItem = { code: "", type: 'heading' };
    }

    item = {
      ...item,
      itemExtra: {
        ...item.itemExtra,
        sp: [...item.itemExtra.sp, newItem]
      }
    };
  }
</script>

<div class='flex justify-center gap-1 bg-green-950 p-2 rounded-md'>
  <div class="bg-stone-950 text-white rounded-xl m-1 p-1 text-xs">Side Panel</div>
  

  <button on:click={() => addTxtCodeImg("heading")} 
    class="bg-orange-600 text-white p-1 text-xs rounded-md">Heading</button>
    
  <button on:click={() => addTxtCodeImg("text")} 
    class="bg-green-700 text-white p-1 text-xs rounded-md">Text</button>
  
  <button on:click={() => addTxtCodeImg("code")} 
    class="bg-yellow-600 text-white p-1 text-xs rounded-md">Code</button>
  
  <button on:click={() => addTxtCodeImg("image")} 
    class="bg-green-600 text-white p-1 text-xs rounded-md">Image</button>
  
  <button on:click={() => addTable()} 
    class="bg-green-900 text-white p-1 text-xs rounded-md">Table</button>
  
  <button on:click={() => addTableCode()} 
    class="bg-red-900 text-white p-1 text-xs rounded-md">Code Table</button>
</div>