<script>
    //@ts-nocheck

    import { SmallBtnToolbar } from "sveltetools_bils/src/cmp"; 
    import Icons  from "../icons"; 
    // export let icons;
    let icons = Icons;
    export let clone=()=>{};
    export let deleteFn=()=>{};
    export let showCanvas=()=>{};

    import { addEllipse,addCircle,addBezier,addRect,addAngleSymbol,addDot,addPolygon,addTri,addLines,addLine,addRay,addPara,addText,addSprite,addImage,addIcon,addPieChart} from "./addFunctions";

export let addNewItem;

</script>
<div class="flex justify-between text-white ">

<div class="flex text-white ">
<SmallBtnToolbar clk={()=>addNewItem(addRect)} icon={icons.RECTANGLE} title="Rect" />
<SmallBtnToolbar clk={()=>addNewItem(addCircle)} icon={icons.CIRCLE} title="Circle" />
<SmallBtnToolbar clk={()=>addNewItem(addEllipse)} icon={icons.ELLIPSE} title="Ellipse" />
<SmallBtnToolbar clk={()=>addNewItem(addText)} icon={icons.TEXT} title="Text" />
<SmallBtnToolbar clk={()=>addNewItem(addPara)} icon={icons.TEMPLATE} title="List" />
<SmallBtnToolbar clk={()=>addNewItem(addLine)} icon={icons.LINE} title="Line" />
<SmallBtnToolbar clk={()=>addNewItem(addTri)} icon={icons.TRIANGE} title="Tri" />
<SmallBtnToolbar clk={()=>addNewItem(addRay)} icon={icons.SUNRISE} title="Ray" />
<SmallBtnToolbar clk={()=>addNewItem(addIcon)} icon='🦏' title="Icon" />
<SmallBtnToolbar clk={()=>addNewItem(addDot)} icon={icons.DOT} title="Dot" />
<SmallBtnToolbar clk={()=>addNewItem(addAngleSymbol)} icon={icons.ANGLE} title="Angle" />
<SmallBtnToolbar clk={()=>addNewItem(addLines)} icon={icons.BICYCLE} title="Lines" />
<SmallBtnToolbar clk={()=>addNewItem(addSprite)} icon={icons.SPRITE} title="Sprite" />
<SmallBtnToolbar clk={()=>addNewItem(addImage)} icon={icons.MAP} title="Image" />
<SmallBtnToolbar clk={()=>addNewItem(addPieChart)} icon={icons.PIZZA} title="Pie" />
</div>
            
            
<div class='flex border-2 border-gray-500 rounded-md'>
<SmallBtnToolbar clk={clone} icon={icons.SHEEP} title="Clone" />
<SmallBtnToolbar clk={showCanvas} icon={icons.CANVAS} title="Canvas" />
<SmallBtnToolbar clk={deleteFn} icon={icons.WASTEBASKET} title="Delete" />
</div>

</div>