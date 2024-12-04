

import CanvasPlayer from "./canvas/CanvasPlayer/CanvasPlayer.svelte";
import CanvasEditor from "./canvas/CanvasEditor/CanvasEditor.svelte";

import UnknownslideTypePlayer from "./unknownSlideType/UnknownslideTypePlayer.svelte";
import UnknownslideTypeEditor from "./unknownSlideType/UnknownslideTypeEditor.svelte";

import EqPlayer from "./eqs/EqPlayer/EqPlayer.svelte";
import EqsEditor from "./eqs/EqsEditor/EqsEditor.svelte";
import loadAssets from "./assets/loadAssets";
import SlideObject from "./slideObject/slideObject";

const availableSlideTypes = [ 'canvas', 'Eqs'];

const availableEqsItems = ['hdg' , 'code', 'txt' ];
const availableEqsSpItems = ['code' , 'text', 'img' , 'heading' , 'table' , 'tableCode' ];

const availableCanvasItems = [
    "text",
    "line",
    "lines",
    "rect",
    "para",
    "ellipse",
    "piechart",
    "circle",
    "angleSymbol",
    "dot",
    "icon",
    "polygon",
    "triangle",
    "ray",
    "image",
    "sprite"
];

export {
    CanvasPlayer,
    CanvasEditor,

    EqPlayer,
    EqsEditor,

    availableCanvasItems,
    availableEqsItems,
    availableEqsSpItems,

    availableSlideTypes,
    
    SlideObject,
    loadAssets,

UnknownslideTypePlayer,
UnknownslideTypeEditor
    
}