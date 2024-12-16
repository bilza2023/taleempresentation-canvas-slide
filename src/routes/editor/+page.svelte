<script>
    //why import Editor directy ???? error -- 15-dec-2024
    import {SlideObject} from '$lib';
    import Editor  from "../../lib/presentation/editor/Editor.svelte";
    import audioData from "./audioData.js";
    import {onMount} from "svelte";


  import ToolbarDiv from "../../lib/components/ToolbarDiv.svelte";
  import OpenFileButton from "../../lib/components/OpenFileButton.svelte";
  import CallbackButton from '../../lib/components/CallbackButton.svelte';
  import SaveFileButton from "../../lib/components/SaveFileButton.svelte";
  
    // import SaveLoadToolbar from "$lib/components/SaveLoadToolbar.svelte";
    
    let slides;
    let showToolbar=true;

  function newPresentation(){
    slides = [];
  }  

  function callback(incomming){
    // IMPORTANT DO NOT IMPORT SLIDE SINCE THAT IS OBJECT WE NEED ARRAY HERE
  //there is difference between slides = [incomming]; and slides = [...incomming];
    slides = [...incomming];
 }
onMount(async()=>{
      const s = SlideObject.Canvas.getDemoSlide();
      slides = [s];
});

</script>
<ToolbarDiv>
  <CallbackButton callback={newPresentation} title='New ' icon='🎉'/>
  
  <OpenFileButton 
    {callback}
    importAccept=".js"
    regexReplaceFilter={/export\s+const\s+\w+\s*=\s*/}
  />
  <!-- export const SlideSSSSSS -->
  <SaveFileButton content={slides}  PreTextToAdd='export const Slides'/>
  </ToolbarDiv>
  

  <div class="w-full bg-gray-800">
  {#if slides}
    <Editor
      isBlob={true}
      {showToolbar}
      {slides}
      {audioData}
    />
  {/if}
  </div>