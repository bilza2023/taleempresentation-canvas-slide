<script>
    import PlayerWithSound from "./PlayerWithSound.svelte";
    import PlayerNs from "./PlayerNs.svelte";
    import { onMount } from 'svelte';
    import PresentationObject from "../../code/presentationObject/PresentationObject";
    
  let assets = null;
    ////////////////////====Slides Registration///////
    //--very important -- will break the library
    import registerSlideTypes from "../../code/slideRegistery/registerSlideTypes";
    registerSlideTypes();

    /////////////////////////////////////////
    export let slides;
    export let audioData = undefined;
    export let isBlob = false;
    
    $: hasAudio = audioData !== undefined;
/////////////////////////////////////////////////
  onMount(async()=>{
       assets =  await PresentationObject.loadAssets();
  }); 
  </script>
  
  {#if hasAudio && slides && assets}
    <PlayerWithSound 
      {slides}
      {audioData}
      {isBlob}
      {assets}
    />
  {:else}
   {#if slides}
    <PlayerNs 
      {slides}
      {assets}
      />
    {/if}
  {/if}