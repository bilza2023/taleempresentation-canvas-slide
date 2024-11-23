<svelt:head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
</svelt:head>
<script>
//@ts-nocheck
import TopToolbar from './TopToolbar.svelte';
import Row from './Row.svelte';
import getNewItem from "./getNewItem";


export let items;
export let currentTime=0;
//////////////////////////////////////////
function setEqType(i,typ) {
  items = items.map((item, index) =>
    index === i
      ? { ...item, itemExtra: { ...item.itemExtra, type: typ } }
      : item
  );
 
}
function moveUpEq(index) {
  if (index > 0) {
    const eqToMove = items[index];
    items = [
      ...items.slice(0, index - 1),
      eqToMove,
      items[index - 1],
      ...items.slice(index + 1),
    ];
  }
}

function moveDownEq(index) {
  if (index < items.length - 1) {
    const eqToMove = items[index];
    items = [
      ...items.slice(0, index),
      items[index + 1],
      eqToMove,
      ...items.slice(index + 2),
    ];
  }
}


function delEq(index) {
  items = [...items.slice(0, index), ...items.slice(index + 1)];
}


function addEq(i) {
  const newItem = getNewItem();
  items = [...items.slice(0, i + 1), newItem, ...items.slice(i + 1)];
}

//////////////////////////////////////////
</script>

<div class="bg-gray-800 w-full  text-white min-h-screen p-4 m-0 ">

  <TopToolbar />
  <!-- title bar -->
  <div class="flex w-full bg-stone-700  justify-center text-lg rounded-md  ">
    <!-- <div class="w-1/12  text-center">Step</div> -->
    <div class="w-1/12  text-center">Start Time</div>
    <div class="w-6/12  text-center">Editor</div>
    <div class="w-4/12  text-center">Display</div>
    <div class="w-1/12  text-center">Side Panel</div>
</div>
<!-- title bar Ends -->


<!-- Rows -->

  <div class="flex flex-col gap-2 my-1 p-1 ">
    {#each items  as item, i}

    <Row   {i} bind:item={item} 
    {currentTime}  
    {addEq} {delEq}
     {moveUpEq} 
    {moveDownEq}
     {setEqType}  
    />

    {/each}
  </div>
    

  <!-- oage end -->
</div>
