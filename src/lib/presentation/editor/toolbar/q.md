<script>
  //@ts-nocheck
  import { NavBtn2, NavLink, Logo, NavBtn, AreYouSure } from 'sveltetools_bils/src/cmp';
  import Icons from '../../icons';
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  export let slides;
  export let currentSlideIndex;
  export let timingError = false;
  export let timingErrorMessage = '';

  onMount(async()=>{
    for (let i = 0; i < slides.length; i++) {
      const slide =   slides[i];

      if (!('startTime' in slide)) {
        slide.startTime = 0;
      }
      if (!('endTime' in slide)) {
        slide.endTime = 10;
      }

    }
    if (slides[0].startTime !== 0) {
      slides[0].startTime = 0;
    }

  });

  function shiftTime() {
        for (let i = 1; i < slides.length; i++) {
            slides[i].startTime = slides[i - 1].endTime;
        }
  }

</script>

<div class="flex justify-between bg-gray-700 m-0 p-0 items-center gap-1 pt-2 px-2">
  <div class="flex justify-end m-0 p-1 items-center gap-1 border-2 border-gray-500 rounded-md text-xs mr-1">
    {#if slides.length > 0}
      <span class="text-xs">Start</span>
      <div
        class="bg-gray-900 text-white p-0 px-4 m-0 rounded-md border-2 border-white"
        type="number"
      >
        {slides[currentSlideIndex]?.startTime || 0}
      </div>

       
      <span class='text-xs'>End</span>
      <input class='bg-gray-500 text-white p-0 m-0 rounded-md border-2 border-white text-center '  type="number" bind:value={slides[currentSlideIndex].endTime}
        on:input={() => shiftTime()}
      >

    {/if}
  </div>
</div>