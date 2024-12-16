<script>
   
  import {SlideObject}  from "$lib";
  import CanvasEditor from "../../lib/slides/canvas/CanvasEditor/CanvasEditor.svelte";
  import {onMount} from "svelte";
  
  import ToolbarDiv from "../../lib/components/ToolbarDiv.svelte";
  import OpenFileButton from "../../lib/components/OpenFileButton.svelte";
  import CallbackButton from '../../lib/components/CallbackButton.svelte';
  import SaveFileButton from "../../lib/components/SaveFileButton.svelte";
  
  let slide = null;
  let showAddToolbar = true;
  let assets = null;
  

  function createNewSlide(){
    slide = SlideObject.Canvas.getNewSlide();
  }
  
 function callback(incomming){
  slide = incomming;
 }
  onMount(async()=>{
    assets = await SlideObject.loadAssets(); 
    slide = SlideObject.Canvas.getDemoSlide();
  });

</script>

{#if SlideObject}


{#if slide}
<ToolbarDiv>
<CallbackButton callback={createNewSlide} title='New ' icon='🎉'/>

<OpenFileButton 
  {callback}
  importAccept=".js"
  regexReplaceFilter={/export\s+const\s+\w+\s*=\s*/}
/>

<SaveFileButton content={slide}  PreTextToAdd='export const Slide'/>
</ToolbarDiv>

{/if}

<div class="w-full bg-gray-700 text-white py-2 px-1 min-h-screen ">
  {#if slide && assets}
    <CanvasEditor
     bind:items = {slide.items}
     bind:slideExtra = {slide.slideExtra}
     {assets}
     {showAddToolbar}
    />
  {/if}
</div>



{/if}