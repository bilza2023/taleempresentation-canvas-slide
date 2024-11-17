<svelt:head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
</svelt:head>
<script>
//@ts-nocheck
import Toolbar from './editor/Toolbar.svelte';
import Titlebar from './editor/Titlebar.svelte';
import EqPart from './EqPart/EqPart.svelte';
import SP from './SPPart/SP.svelte';
import FSSPToolBar from './FSSPToolBar.svelte';
import getNewItem from './getNewItem.js';
import { onMount } from 'svelte';
////////////////////////////////////////////////////////
export let items=[];
export let startTime=0;
export let endTime=10;
export let currentTime=0;
export let uiState= [];
////////////////////////////////////////////////////////

$:{
  if (uiState.length !== items.length) {
    uiState = items.map((_, index) => uiState[index] || { spVisibility: false });
  }
}

function toggleSP(index){
uiState[index].spVisibility = !uiState[index].spVisibility  
}


function setEqType(i,typ) {
  items[i].extra.type = typ;
 
}
function moveUpEq(index) {
  if (index > 0) {
    const eqToMove = items[index];
    items.splice(index, 1);
    items.splice(index - 1, 0, eqToMove);
  }
 
}
function moveDownEq(index) {
  if (index < items.length - 1) {
    const eqToMove = items[index];
    items.splice(index, 1);
    items.splice(index + 1, 0, eqToMove);
  }
  
}
function delEq(index) {
  items.splice(index, 1);
  
}
function openAllSP(){
  uiState = uiState.map((state) => ({ ...state, spVisibility: true }));
    
} 
function closeAllSP(){
  uiState = uiState.map((state) => ({ ...state, spVisibility: false }));
    
}
function addEq(i) {
   items.splice(i+1, 0, getNewItem());
}

function addFakeTimings(){
  // debugger;
const duration = 10;
let runningTime = startTime;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.itemExtra.step = i;
    item.itemExtra.startTime = runningTime;
    runningTime+=duration;
    item.itemExtra.endTime = runningTime;
  }
 endTime = items[items.length-1].extra.endTime;
 items = [...items];
}

</script>

<div class="bg-gray-800 w-full  text-white min-h-screen p-4 m-0">

<Toolbar  {addEq}  {closeAllSP} {openAllSP} {addFakeTimings} {currentTime}/>

  <Titlebar />

  {#each items  as item, i}
  
    <EqPart  bind:item={item} {i} {currentTime} {addEq} {delEq} {moveUpEq} {moveDownEq} {setEqType}  {toggleSP}  />


<!-- Side Panel -->
          <!-- {#if uiState[i].spVisibility} -->
          <FSSPToolBar  {item}  />
          <SP  {item} />
          <!-- {/if} -->
       
  {/each}


<br>
<br>
<br>
<br>


</div>
