<script>
  import { onMount } from 'svelte';
  import Toolbar from './toolbar/Toolbar.svelte';
  import PresentationModeEditor from "./PresentationModeEditor.svelte";
  import LeftPanel from './LeftPanel.svelte';
  import PresentationObject from "../presentationObject/PresentationObject";
  import {moveSlide,deleteSlide,copySlide,pasteSlide,cloneSlide} from '../../code/sliderServices';
  import registerSlideTypes from "../../code/slideRegistery/registerSlideTypes";
  import StackPanel from './StackPanel.svelte';
  // i am using this from main index.js not fron inside slides module
  import {SlideObject} from "$lib";

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

  $: currentSlide = slides?.[currentSlideIndex] || null;

  $:{
    if(slides.length > 0){
      // debugger;
    const startTime = slides[0].startTime;
    console.log("startTime" , startTime);
    }
  }
  // Slide navigation
  function setCurrentSlideIndex(index) {
    if (index >= 0 && index < slides.length) {
      currentSlideIndex = index;
    } else {
      console.warn(`Invalid slide index: ${index}`);
    }
  }

  // Slide operations
  function handleAddNew(slideType) {
    try {
      // debugger;
      const newSlide = SlideObject.getNewSlide(slideType);
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
    />
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