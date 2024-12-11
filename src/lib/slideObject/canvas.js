
import canvasHealth from "../canvas/canvasHealth/canvasHealth";
import ItemsMap from '../canvas/staticItems/ItemsMap';
import {Slide} from "../canvas/samples/demoSlide";
import uuid from "../uuid";


export default class Canvas {

    static ItemsMap = Object.freeze(new Map(ItemsMap));
    
    static checkHealth(slide, fix = false) {
        return canvasHealth(slide, fix);
    }

    static getDemoSlide(){
        return Slide;
    }
    /**
     * 9-Dec-2024 the reason we need seperate newSlide for canvas and are not using the SlideObject.newSlide is that we also have to add the slideExtra of the canvas slide. The difference between 2 slide types is not only the slide.type but also slide.slideExtra.
     * 
     */
    static getNewSlide() {
        const slideExtra = Canvas.getSlideExtra();
        return {
            uuid: uuid(),
            version: 'basic',
            startTime: 0,
            endTime: 10,
            type: 'canvas', // canvas is fixed here 
            template: '',
            items: [],
            slideExtra,
        }
    }
    static getSlideExtra(){
        return {
            backgroundColor: '#efebb8',
            canvasWidth : 1000,
            canvasHeight : 360,
            cellHeight : 25,
            cellWidth : 25,
            bgImg : 'system_images/bg_images/black_mat.jpg',
            bgGlobalAlpha : 1,
            xFactor : 0,
            yFactor : 0,
            ///////////////////
            showGrid : false,
            gridLineWidth : 1,
            gridLineColor : 'gray'
        };
    }
    static getAllItemsExtras() {
        const itemsExtras = [];
        
        for (const [key, ItemClass] of ItemsMap.entries()) {
          if (typeof ItemClass.data === 'function') {
            const itemExtra = ItemClass.data();
            itemsExtras.push({
              type: key,
              ...itemExtra
            });
          }
        }
        
        return itemsExtras;
      }



}