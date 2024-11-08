<script>
    //@ts-nocheck

    import { SmallBtnToolbar } from "sveltetools_bils/src/cmp"; 
    export let icons;
    export let pasteItem="";
    import { addEllipse,addCircle,addBezier,addRect,addAngleSymbol,addDot,addGrid,addPolygon,addTri,addLines,addLine,addRay,addRepeatDot,addRepeatText,addPara,addText,addSprite,addSysImage,addImage,addIcon,addImage2,addPieChart} from "./addFunctions";

export let addNewItem;

</script>

<div class="flex">

    <!-- Core methods -->
    <SmallBtnToolbar clk={()=>addNewItem(addLine)} icon={icons.LINE} title="Line" />
    <SmallBtnToolbar clk={()=>addNewItem(addCircle)} icon={icons.CIRCLE} title="Circle" />
    <SmallBtnToolbar clk={()=>addNewItem(addEllipse)} icon={icons.ELLIPSE} title="Ellipse" />
    <SmallBtnToolbar clk={()=>addNewItem(addRect)} icon={icons.RECTANGLE} title="Rect" />
    <!-- <SmallBtnToolbar clk={()=>addBezier(items)} icon={icons.BAZIER} title="Bezier" /> -->
    <SmallBtnToolbar clk={()=>addNewItem(addText)} icon={icons.TEXT} title="Text" />
    <SmallBtnToolbar clk={()=>addNewItem(addPara)} icon={icons.TEMPLATE} title="Para" />

    <!-- Extended from Core -->
    <SmallBtnToolbar clk={()=>addNewItem(addTri)} icon={icons.TRIANGE} title="Tri" />
    <SmallBtnToolbar clk={()=>addNewItem(addRay)} icon={icons.SUNRISE} title="Ray" />
    
        <SmallBtnToolbar clk={()=>addNewItem(addIcon)} icon='🦏' title="Icon" />

    <SmallBtnToolbar clk={()=>addNewItem(addDot)} icon={icons.DOT} title="Dot" />
    <!-- <SmallBtnToolbar clk={()=>addNewItem(addRepeatDot)} icon={`${icons.DOT}${icons.DOT}`} title="R-Dot" /> -->
    <!-- <SmallBtnToolbar clk={()=>{addNewItem(addRepeatText)}} icon={`${icons.TEXT2}${icons.TEXT2}`} title="R-Text" /> -->
    <!-- <SmallBtnToolbar clk={()=>addLines(items)} icon={icons.RULER} title="Lines" /> -->
    <SmallBtnToolbar clk={()=>addNewItem(addAngleSymbol)} icon={icons.ANGLE} title="Angle" />
    <SmallBtnToolbar clk={()=>addNewItem(addLines)} icon={icons.BICYCLE} title="Lines" />
    <SmallBtnToolbar clk={()=>addNewItem(addSprite)} icon={icons.SPRITE} title="Sprite" />
        
        
        <SmallBtnToolbar clk={()=>addNewItem(addImage)} icon={icons.MAP} title="Image" />
            <SmallBtnToolbar clk={()=>addNewItem(addPieChart)} icon={icons.PIZZA} title="Pie" />
        <!-- <SmallBtnToolbar clk={()=>addNewItem(addImage2)} icon={icons.MAP} title="Image2" /> -->
            <!-- <SmallBtnToolbar clk={showGroup} icon={icons.MAGICWAND} title="Group" /> -->
            <SmallBtnToolbar clk={pasteItem} icon={icons.PALETTE} title="Paste Item" />
            
<!-- <SmallBtnToolbar clk={()=>showSaveSlideTemplateDialogue = !showSaveSlideTemplateDialogue} icon={icons.SAVE} title="Make Template" /> -->
    
</div>
<!-- 
{#if groupDiv}

    <Groupdiv {items}/>

{/if} -->