
<script>
import {onMount} from 'svelte';
import {SlideObject} from "$lib";
import ToolbarDiv from "../../lib/components/ToolbarDiv.svelte";
 import OpenFileButton from "../../lib/components/OpenFileButton.svelte";
import StartStopToolbar from "./StartStopToolbar.svelte";
const EqPlayer = SlideObject.EqPlayer;

let currentTime = 0;
let slide;
let interval;


function callback(incomming){
  slide = incomming;
 }

onMount(async () => {
    slide = JSON.parse(localStorage.getItem('slide'));
});

function stop(){
        currentTime=0;
        clearInterval(interval);
}
function start(){
        interval =setInterval( ()=>{
                currentTime += 1;
        }, 1000);
}

function setPulse(val){
        // debugger;
 currentTime = parseInt(val);
}   
</script>


{#if slide}


        <ToolbarDiv>
                <OpenFileButton 
                {callback}
                importAccept=".js"
                regexReplaceFilter={/export\s+const\s+\w+\s*=\s*/}
                />
        </ToolbarDiv>


        <StartStopToolbar   {currentTime}  {slide} {start} {stop} />


        <EqPlayer  
                items={ slide.items}  
                {currentTime}
                {setPulse}
        />
{/if}
