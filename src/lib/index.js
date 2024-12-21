
import PresentationObject from "./presentation/presentationObject/PresentationObject"
import Editor from './presentation/editor/Editor.svelte';
import Player from './presentation/players/Player.svelte';

import {
healthCheckCanvas,
CanvasEditor,
CanvasPlayer,
EqPlayer,
EqsEditor
} from './slides';

import SlideObject from "./slides/slideObject/slideObject";
import ItemsMap from "./slides/canvas/staticItems/ItemsMap";

export {
    PresentationObject, // name may need changing
    SlideObject,
    Editor,
    Player,
    healthCheckCanvas, // name may need changing
    ItemsMap,
    CanvasEditor,
    CanvasPlayer,
    EqPlayer,
    EqsEditor
}