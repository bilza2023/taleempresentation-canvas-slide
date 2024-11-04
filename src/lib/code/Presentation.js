
import loadAssets from "./assets/loadAssets";

/**
 * There is no presentation data and just slides since the startTime and endTime etc belong to first and last slide. We have kept a preseantation just an array of slides. Any thing that we need to know at app level is given to each slide individually.
 */

export default class PresentationObj{

    constructor(slidesData=[]){
        this.assets = {};
        this.slidesData = slidesData;
        this.slides = [];
    }

    async init(){
        this.assets = await loadAssets();
        // for (let i = 0; i < this.slidesData.length; i++) {
        //     const slide = this.slidesData[i];
            
        // }
    }




}