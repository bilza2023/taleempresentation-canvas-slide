


export default function getNewItem(){
let item = { name:"" , content : "" , 
  itemExtra :{
          step :0, 
          startTime : 0, 
          endTime : 0, 
          code : "", 
          type : "code", //new addition 
          sp : []        
    }
  }; 
return item;
}
// spVisibility : true,  add later
// fsVisibility : false,
