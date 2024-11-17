
<script>
    /**
    *   17-Nov-2024 This code was orginally create in Oct-2023
    */
//@ts-nocheck
import EqTypeCode from './EqTypeCode.svelte';
import EqTypeText from './EqTypeText.svelte';
import EqTypeHdg from './EqTypeHdg.svelte';
import LowerToolBar from './LowerToolBar.svelte';

export let item;
export let i; 
export let currentTime=0;
export let addEq; 
export let delEq; 
export let moveUpEq; 
export let moveDownEq; 
export let setEqType;  
export let toggleSP; 
// export let status;
function addTime(){
// remove this line later    
item.itemExtra.startTime = currentTime;
//lets also add showAt which is more in line with the app (we use showAt for display-selected) 
item.showAt = currentTime; // remember showAt is not in itemExtra
}
</script> 
 
 <div class="flex justify-centre   w-full p-0 m-1 gap-1 rounded-md ">
 
    <div class="bg-stone-700 w-1/12 p-0 m-0 rounded-md">{i+1}</div>
  
    <div  class="flex flex-col bg-stone-700 w-1/12 p-0 m-0 rounded-md" >
    <input bind:value={item.itemExtra.startTime} class="text-xs bg-gray-800 text-white"/>
    <div>{item.itemExtra.startTime}</div>
    <button class='bg-orange-800 text-xs' on:click={addTime}>Time</button>
    </div>
  
  
{#if item.itemExtra.type == undefined || item.itemExtra.type == 'code' || item.itemExtra.type == ''}
<EqTypeCode {item} {i}/>
{/if}

{#if item.itemExtra.type == 'text' || item.itemExtra.type == 'txt'}
<EqTypeText {item} {i}/>
{/if}
    
{#if item.itemExtra.type == 'heading' || item.itemExtra.type == 'hdg'}
<EqTypeHdg {item} {i}/>
{/if}
    
    
</div>

<LowerToolBar bind:item={item} {i} {addEq} {delEq} {moveUpEq} {moveDownEq} {setEqType}  {toggleSP} />
