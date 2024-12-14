import Canvas from "./canvas";
import Eqs from "./eqs";
// import upgrade2Basic from "./upgrade2Basic";
import uuid from "../uuid";
import CanvasPlayer from "../canvas/CanvasPlayer/CanvasPlayer.svelte";
import CanvasEditor from "../canvas/CanvasEditor/CanvasEditor.svelte";
import UnknownslideTypePlayer from "../unknownSlideType/UnknownslideTypePlayer.svelte";
import UnknownslideTypeEditor from "../unknownSlideType/UnknownslideTypeEditor.svelte";
import EqPlayer from "../eqs/EqPlayer/EqPlayer.svelte";
import EqsEditor from "../eqs/EqsEditor/EqsEditor.svelte";
import loadAssets from "../assets/loadAssets";


export default class SlideObject {
    static Canvas = Canvas;
    static Eqs = Eqs;

    static EqPlayer = EqPlayer;
    static EqsEditor = EqsEditor;
    static loadAssets = loadAssets;
    static CanvasPlayer=CanvasPlayer;
    static CanvasEditor=CanvasEditor;
    static UnknownslideTypePlayer=UnknownslideTypePlayer;
    static UnknownslideTypeEditor=UnknownslideTypeEditor;
    // static upgrade2Basic(slides) {
    //     return upgrade2Basic(slides);
    // }

    static getNewItem( itemExtra = {} , name='',content='') {
        if (!name) {
          const uuidValue = uuid();
          const firstSegment = uuidValue.split('-')[0];
          name = firstSegment;
        }
        
      return {
          uuid: uuid() , //added on 31-may 2024 --not used yet 
          name , 
          content, 
          showAt :0, 
          hideAt :null, //added on 31-may 2024 --not used yet
          itemExtra,
      };
      
    }
    static getNewSlide(type) {
        if (!this.availableSlideTypes().includes(type)) {
            throw new Error(`Invalid slide type: ${type}`);
        }
        return {
            uuid : uuid(),
            version : 'basic',
            startTime : 0,
            endTime : 10,
            type, 
            template : '',
            items : [],
            slideExtra : {},
        }
    }

    static availableSlideTypes(){
        return [ 'canvas' , 'Eqs'];
    }
}//slide object
