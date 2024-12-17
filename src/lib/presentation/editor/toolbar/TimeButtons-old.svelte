<script >
//@ts-nocheck
import {NavBtn2,NavLink,Logo,NavBtn,AreYouSure} from 'sveltetools_bils/src/cmp';
import Icons from '../../icons';
  import { slide } from 'svelte/transition';
export let slides;
export let currentSlideIndex;
export let timingError=false;
export let timingErrorMessage='';


$:{
    //check the first slide
    if (slides[0].startTime !== 0){
        slides[0].startTime = 0;
    } 
    // debugger;
    if (slides[currentSlideIndex].startTime === null || 
    slides[currentSlideIndex].startTime === undefined || 
    slides[currentSlideIndex].startTime < 0) {
    timingError = true;
    timingErrorMessage = 'Missing or Invalid Start Time';
} 
    // console.log('slides[currentSlideIndex].startTime',slides[currentSlideIndex].startTime);
}



function setTimings(slideIndex, newEndTime) {
 debugger;
  
  // Adjust subsequent slides
  for (let i = slideIndex + 1; i < slides.length; i++) {
    const durationChange = slides[i].startTime - slides[i - 1].endTime;
    
    // Update start time and end time to maintain total duration
    slides[i].startTime -= durationChange;
    slides[i].endTime -= durationChange;

    // Check for overlapping timings and correct if necessary
    if (slides[i].startTime < slides[i - 1].endTime) {
      slides[i].startTime = slides[i - 1].endTime;
      slides[i].endTime = slides[i].startTime + (slides[i].endTime - slides[i].startTime);
    }
  }
//  console.log(slides); 
}

</script>

<div class='flex justify-between  bg-gray-700 m-0 p-0 items-center gap-1 pt-2 px-2 '>
 


  <div class='flex justify-end m-0 p-1 items-center gap-1 border-2 border-gray-500  rounded-md text-xs mr-1'>
  {#if slides.length > 0}

    <span class='text-xs'>Start</span> 
    <div class='bg-gray-900 text-white p-0 px-4 m-0 rounded-md border-2 border-white'  type="number" >
    {slides[currentSlideIndex].startTime}
    </div>
    
    <span class='text-xs'>End</span>
    <input class='bg-gray-500 text-white p-0 m-0 rounded-md border-2 border-white text-center '  type="number" bind:value={slides[currentSlideIndex].endTime}
      on:input={() => setTimings()}
    >

    {/if}

  </div>  
  

</div>




