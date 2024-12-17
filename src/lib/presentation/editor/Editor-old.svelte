<script>
  import {SlideObject} from "$lib";
import { onMount } from 'svelte';
  // import Toolbar from './toolbar/Toolbar.svelte';
  import TimeButtons from './toolbar/TimeButtons.svelte';
  import PresentationModeEditor from "./PresentationModeEditor.svelte";
  import PresentationObject from "../presentationObject/PresentationObject";
  import {moveSlide,deleteSlide,copySlide,pasteSlide,cloneSlide} from '../../code/sliderServices';
  import registerSlideTypes from "../../code/slideRegistery/registerSlideTypes";
  import StackPanel from './StackPanel.svelte';

  // Initialize slide types
  registerSlideTypes();

  // Props with defaults
  export let slides;
  export let isBlob = false;
  export let showToolbar = true;
  export let audioData = '';

  // Local state
  let currentTime = 0;
  let timingError = false;
  let timingErrorMessage = '';
  let currentSlideIndex = 0;
  let showSidePanel = false;
  let show = false;
  let ready = false;
  let assets = null; //starts here 

  $: currentSlide = slides?.[currentSlideIndex] || null;

  $:{
    debugger;
    console.log("slides[0].startTime" , slides[0].startTime);
    console.log("slides[0].endTime" , slides[0].endTime);
  }
  // Slide navigation
  function setCurrentSlideIndex(index) {
    if (index >= 0 && index < slides.length) {
      currentSlideIndex = index;
    } else {
      console.warn(`Invalid slide index: ${index}`);
    }
  }

  function setNewSlideTimings(newSlide) {
  if (slides.length === 0) {
    newSlide.startTime = 0; 
    newSlide.endTime = 10; 
  } else {
    const lastSlide = slides[slides.length - 1];
    newSlide.startTime = lastSlide.endTime;
    newSlide.endTime = newSlide.startTime + 10;
  }
}

  
  function handleAddNew(slideType) {
  try {
    const newSlide = SlideObject.getNewSlide(slideType);
    setNewSlideTimings(newSlide); 

    slides = [...slides, newSlide];
    setCurrentSlideIndex(slides.length - 1);
    show = false;
  } catch (error) {
    console.error('Failed to add new slide:', error);
  }
}
  function handleMoveSlide(index, direction) {
    try {
      const updatedSlides = moveSlide(slides, index, direction);
      if (updatedSlides !== slides) {
        slides = updatedSlides;
        setCurrentSlideIndex(direction === 'up' ? index - 1 : index + 1);
      }
    } catch (error) {
      console.error('Failed to move slide:', error);
    }
  }

  function handleDeleteSlide() {
    try {
      const { slides: updatedSlides, newIndex } = deleteSlide(slides, currentSlideIndex);
      slides = updatedSlides;
      currentSlideIndex = newIndex;
    } catch (error) {
      console.error('Failed to delete slide:', error);
    }
  }

  function handleCopySlide() {
    try {
      if (currentSlide && copySlide(currentSlide)) {
        // Optionally show success message
        console.log('Slide copied successfully');
      }
    } catch (error) {
      console.error('Failed to copy slide:', error);
    }
  }

  function handlePasteSlide() {
    try {
      const result = pasteSlide(slides);
      if (result.success) {
        slides = result.newSlides;
        setCurrentSlideIndex(slides.length - 1);
      }
    } catch (error) {
      console.error('Failed to paste slide:', error);
    }
  }

  function handleCloneSlide() {
    try {
      const result = cloneSlide(currentSlide, slides);
      if (result.success) {
        slides = result.newSlides;
        setCurrentSlideIndex(slides.length - 1);
      }
    } catch (error) {
      console.error('Failed to clone slide:', error);
    }
  }

  onMount(async()=>{
    // assets injected with loadAssets functions nothing else required. just call the loadAssets function and on this layer of the app you get assets bundle. 
    assets =  await PresentationObject.loadAssets();
    // slides = slides;
    ready = true;
  });
</script>

{#if timingError == true}
<div 
    class="bg-red-800 p-1 text-center text-yellow-300 
    text-shadow-['0px' '0px' '5px' 'rgba(255, 255, 0, 0.5)'] 
    font-bold" 
>
    Timing Error --> {timingErrorMessage}
</div>
{/if}

<div class="bg-gray-800 overflow-x-auto w-full text-white min-h-screen">
  {#if showToolbar}

  <div class='flex gap-4'>
    <button on:click={()=>showSidePanel = !showSidePanel}>showSidePanel</button>
    <button on:click={()=>handleAddNew('canvas')}>handleAddNew</button>
  </div>

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
        <input class='bg-gray-500 text-white p-0 m-0 rounded-md border-2 border-white text-center '  type="number" value={slides[currentSlideIndex].endTime}
        >
  
      {/if}
    </div>
  </div>

<!-- <TimeButtons />   --> 
    <!-- <TimeButtons 
      bind:slides
      {currentSlideIndex}
      bind:timingError={timingError}
      bind:timingErrorMessage={timingErrorMessage}
    /> -->

    <!-- <Toolbar 
      bind:show
      bind:showSidePanel
      bind:currentTime={currentTime}
      {currentSlideIndex}
      addNew={handleAddNew}
      deleteSlide={handleDeleteSlide}
      copySlide={handleCopySlide}
      pasteSlide={handlePasteSlide}
      cloneSlide={handleCloneSlide}
      soundFile={audioData}
      {isBlob}
      {setCurrentSlideIndex}
    /> -->
  {/if}

  <div class="flex justify-start w-full">
    {#if slides?.length}
      {#if showSidePanel}
      <div class="flex flex-col w-1/12 bg-gray-600 p-1" style="border-right: 2px solid white;">
         
          <StackPanel
            stackItems={slides}
            setSelectedIndex={setCurrentSlideIndex}
            selectedItemIndex={currentSlideIndex}
            displayKey={'type'}
            onMoveDown={(index) => handleMoveSlide(index, 'down')}
            onMoveUp={(index) => handleMoveSlide(index, 'up')}
          />
      </div>
      {/if}

      <div class={`p-2 ml-1 min-h-screen text-center ${showSidePanel ? "w-11/12" : "w-full"}`}>
        {#if ready}
          <PresentationModeEditor
            {currentSlide}
            {currentSlideIndex}
            {assets}
            {currentTime}
          />
        {/if}
      </div>
    {:else}
      <h1>No Slides in the presentation</h1>
    {/if}
  </div>
</div> 