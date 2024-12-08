import getNewSlide from "./getNewSlide";
import getNewItem from "./getNewItem";
import canvasHealth from "../canvas/canvasHealth/canvasHealth";
import ItemsMap from '../canvas/staticItems/ItemsMap';

export default class Canvas {

    // static ItemsMap = ItemsMap;
    static ItemsMap = Object.freeze(new Map(ItemsMap));
    static newSlide() {
        // the getNewSlide is same for all slides except the `canvas` word.user can also use this driectly but we do not want it to expose it to them.
        return getNewSlide('canvas');
    }

    static newItem() {
        return getNewItem();
    }

    static checkHealth(slide, fix = false) {
        return canvasHealth(slide, fix);
    }

    static itemsList() {
        return Array.from(ItemsMap.keys());
    }
}