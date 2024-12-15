
import SlideRegistry  from './SlideRegistry';
const registry = SlideRegistry.getInstance();
// import {SlideObject} from "$lib";
import CanvasPlayer from "../../slides/canvas/CanvasPlayer/CanvasPlayer.svelte";
import CanvasEditor from "../../slides/canvas/CanvasEditor/CanvasEditor.svelte";

import EqsEditor from "../../slides/eqs/EqsEditor/EqsEditor.svelte";
import EqPlayer from "../../slides/eqs/EqPlayer/EqPlayer.svelte";

export default function registerSlideTypes(){
const CanvasSlideModule ={
    type: 'canvas',
    PlayerComponent: CanvasPlayer,
    EditorComponent: CanvasEditor
};
const EquationSlideModule ={
    type: 'Eqs',
    PlayerComponent: EqPlayer,
    EditorComponent: EqsEditor
};


// Register all slide types
registry.registerSlideType(CanvasSlideModule);
registry.registerSlideType(EquationSlideModule);
}