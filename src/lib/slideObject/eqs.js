
import SlideObject from "./slideObject";
// import eqsHealth  from "../eqs/eqsHealth";

export default class Eqs{

static availableEqsSpItems(){ // item img in old slides so dont change to image
    return ['code' , 'text', 'img' , 'heading' , 'table' , 'tableCode' ];
}    

static getEqsSpItem(type){
    if (! Eqs.availableEqsSpItems().includes(type)) {
        throw new Error(`Invalid item type: ${type}`);
    }
        const EqsSpItemTypes = {
          'code': { code: "", type: 'code' },
          'text': { code: "", type: 'text' },
          'img': { code: "wood", type: 'image' },
          'heading': { code: "", type: 'heading' },
          'table': { code: `[["",""],["",""]]`, type: 'table' },
          'tableCode': { code: `[["",""],["",""]]`, type: 'tableCode' }
        };
      
        const newItem = EqsSpItemTypes[type];
      
        if (!newItem) {
          throw new Error(`Invalid item type: ${type}`);
        }
      
        return newItem;
}
static availableEqsItems(){
    return ['hdg' , 'code', 'txt' ];
}    

static getNewItem(){
    let newItem = SlideObject.getNewItem();

    newItem.itemExtra = {
        startTime : 0, 
        endTime : 0, 
        code : "", 
        type : "code",  // 'text' , 'heading'
        sp : []        
        }
         
    return newItem;
}

// static checkHealth(slide, fix = false){
//     return eqsHealth(slide,fix);
// }

}