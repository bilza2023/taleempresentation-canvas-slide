
import SlideRegistry  from './SlideRegistry';
const registry = SlideRegistry.getInstance();
import SlideObject from "$lib/slides";


export default function registerSlideTypes(){
const CanvasSlideModule ={
    type: 'canvas',
    PlayerComponent: SlideObject.CanvasPlayer,
    EditorComponent: SlideObject.CanvasEditor
};
const EquationSlideModule ={
    type: 'Eqs',
    PlayerComponent: SlideObject.EqPlayer,
    EditorComponent: SlideObject.EqsEditor
};


// Register all slide types
registry.registerSlideType(CanvasSlideModule);
registry.registerSlideType(EquationSlideModule);
}