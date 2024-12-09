import Canvas from "./canvas";
import Eqs from "./eqs";
import upgrade2Basic from "./upgrade2Basic";
import uuid from "../uuid";

export default class SlideObject {
    static Canvas = Canvas;
    static Eqs = new Eqs();

    static upgrade2Basic(slides) {
        return upgrade2Basic(slides);
    }

    static newItem( itemExtra = {} , name='',content='') {
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
    static newSlide(type) {
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
