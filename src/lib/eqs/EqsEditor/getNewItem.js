 


export default function getNewItem(){
let item = { name:"" , content : "" , 
  itemExtra :{

          startTime : 0, 
          endTime : 0, 
          code : "", 
          type : "code",  // 'text' , 'heading'
          sp : []        
    }
  }; 
return item;
}
