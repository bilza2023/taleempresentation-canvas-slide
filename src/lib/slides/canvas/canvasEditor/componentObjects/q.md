
I have objects in this form

export default class LineObject extends ComponentObject {
    constructor(itemData=null , fnList={}) {
      // debugger;
        super(itemData , fnList);
    }

but then i need a seperate function to add data to itemData
function addLine( ){
  const obj ={
            "x1": getProp(20),
            "y1": getProp(10),
            "x2": getProp(500),
            "y2": getProp(200),
            "lineWidth": getProp(2),              
  };
  return  addReqExtraFields(obj,"line","red"); 
} 



So to avoid having a seperate function to add data to itemData i changed the object to this
-- now if i already have the itemData (like from an object stored in database) we can just pass it and if it is a new object then we can give it default values.


export default class LineObject extends ComponentObject {
    constructor(itemData=null , fnList={}) {
      // debugger;
      if(itemData ==null){
          itemData = {
              "x1": getProp(20),
              "y1": getProp(10),
              "x2": getProp(500),
              "y2": getProp(200),
              "lineWidth": getProp(2),              
              };
      }
        super(itemData , fnList);
}


what do you say about this approch?
