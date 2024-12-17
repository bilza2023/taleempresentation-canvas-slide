write me a function


 function checkTimingErrors(){

  let timingError = false;
  let timingErrorMessage = '';

    it should loop over all the slides and check each for slide.startTime and slide.endTime

    look for following erros if found set 
    timingErros = true and add appropriate error message

    1: every slide must have a startTime and endTime if not give error
    2: every slide startTime should be = the endTime of the last slide (no gaps between slides).
    3: the startTime of the first slide should be 0 always.
    4: every slide start time should be smaller than the endTime (by atleast 2 seconds, it measn that each slide minimum duration = 2 seconds).

    --  when ever an error is found return with that error no need to proceed

  return {timingError, timingErrorMessage}
 }


 here is the svelte component for which this function is written
 <script>
  import {SlideObject} from "$lib";
import { onMount } from 'svelte';
  import Toolbar from './toolbar/Toolbar.svelte';
  import PresentationModeEditor from "./PresentationModeEditor.svelte";
  import PresentationObject from "../presentationObject/PresentationObject";
  import {moveSlide,deleteSlide,copySlide,pasteSlide,cloneSlide} from '../../code/sliderServices';
  import registerSlideTypes from "../../code/slideRegistery/registerSlideTypes";
  import StackPanel from './StackPanel.svelte';
  import TimingErrorDiv from "./TimingErrorDiv.svelte";
 
  // Initialize slide types
  registerSlideTypes();

  // Props with defaults
  export let slides;
  export let isBlob = false;
  export let showToolbar = true;
  export let audioData = '';

  // Local state
  let currentTime = 0;
  let currentSlideIndex = 0;
  let showSidePanel = false;
  let show = false;
  let ready = false;
  let assets = null; //starts here 

  let timingError = true;
  let timingErrorMessage = '';

  $: currentSlide = slides?.[currentSlideIndex] || null;

  function shiftTime(newEndTime) {
 debugger;
  // if (currentSlideIndex < 0 || currentSlideIndex >= slides.length) {
  //   console.error("Invalid slide index");
  //   return;
  // }

  // Update the end time of the specified slide
  slides[currentSlideIndex].endTime = newEndTime;

  // Adjust subsequent slides
  for (let i = currentSlideIndex + 1; i < slides.length; i++) {
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
 
 function checkTimingErrors(){

 }
  // Slide navigation
  function setCurrentSlideIndex(index) {
    if (index >= 0 && index < slides.length) {
      currentSlideIndex = index;
    } else {
      console.warn(`Invalid slide index: ${index}`);
    }
  }

  function setNewSlideTimings(newSlide){
    if(slides.length === 0){
      //no need its already 0 and 10
    }else {
      newSlide.startTime = slides[slides.length -1 ].endTime;
      newSlide.endTime = newSlide.startTime + 10;
    }
  }
  // Slide operations
  function handleAddNew(slideType) {
    try {
      // debugger;
      const newSlide = SlideObject.getNewSlide(slideType);
      setNewSlideTimings(newSlide); //setNewSlideTimings
      slides = [...slides, newSlide];
      setCurrentSlideIndex(slides.length - 1);
      show = false;
    } catch (error) {
      console.error('Failed to add new slide:', error);
      // Optionally trigger UI error notification
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
    slides = slides;
    ready = true;
  });
</script>

<div class="bg-gray-800 overflow-x-auto w-full text-white min-h-screen">
  {#if showToolbar}
    <Toolbar
      bind:slides
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
      {shiftTime}
    />
  {/if}

  
  {#if timingError}
  <TimingErrorDiv {timingErrorMessage}/>
  {/if}


  <div class="flex justify-start w-full">
    {#if slides?.length}
      {#if showSidePanel}
      <div class="flex flex-col w-1/12 bg-gray-600 p-1" style="border-right: 2px solid white;">
          <!-- <LeftPanel
            bind:slides={slides}
            {setCurrentSlideIndex}
            {currentSlideIndex}
            onSelect={setCurrentSlideIndex}
            onMoveDown={(index) => handleMoveSlide(index, 'down')}
            onMoveUp={(index) => handleMoveSlide(index, 'up')}
          /> -->
          <!-- no binding since we do not chagne anything in stack comp -->
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