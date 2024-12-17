<script >
//@ts-nocheck
import {NavBtn2,NavLink,Logo,NavBtn,AreYouSure} from 'sveltetools_bils/src/cmp';
import Icons from '../../icons';
import SoundButtons from './SoundButtons.svelte';
import NewSlidesDlg from "./NewSlidesDlg.svelte";
export let show;
export let addNew;
export let isBlob;
export let showSidePanel;

export let copySlide;
export let pasteSlide;
export let cloneSlide;
export let deleteSlide;


export let soundFile=null;
export let currentTime=0;



</script>

<div class='flex justify-between  bg-gray-700 m-0 p-0 items-center gap-1 pt-2 px-2 '>
 
  <div class='flex justify-start items-center gap-1'>
    
    <NavBtn2 title='SP' icon={Icons.DOOR}  clk={()=>showSidePanel = !showSidePanel} />
      <NavBtn2 title='Slide' icon={Icons.BULB}  clk={()=>show = !show} />
   
   
{#if soundFile}
<SoundButtons  {soundFile}  bind:currentTime={currentTime} {isBlob}/>    
{/if}

  </div> 

  <div class='flex justify-end m-0 p-1 items-center gap-1 border-2 border-gray-500  rounded-md text-xs mr-1'>
 
    

<NavBtn2 title='Clone' icon={Icons.SHEEP}  clk={cloneSlide} />
<NavBtn2 title='Copy' icon={Icons.COPY}  clk={copySlide} />
<NavBtn2 title='Paste' icon='🖨️'  clk={pasteSlide} />
<NavBtn2 title='Delete' icon={Icons.WASTEBASKET}  clk={deleteSlide} />
 

  </div>  
  

</div>

{#if show}

  <NewSlidesDlg    {addNew}/>

{/if}





