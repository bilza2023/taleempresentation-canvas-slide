//@ts-nocheck

export default function getNewItem( name='',content='', extra = {},arr=[]) {
// debugger;
return {
    uuid: uuid() , //added on 31-may 2024 --not used yet 
    // item name
    name , 
    //text content
    content, 
    // display time
    showAt :0, 
    hideAt :null, //added on 31-may 2024 --not used yet
    // an object which can take any value it should be named "itemExtra" 
    extra,
    // it should be named "itemArray"
    arr  //newly added 29-mar-2024
};

}

function uuid() {
    // Generate a random 32-character hexadecimal string
    const randomHex = () => Math.floor(Math.random() * 16).toString(16);
  
    // Generate a UUID with the pattern "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = randomHex();
      const v = c === 'x' ? r : (r & 0x3) | 0x8; // For the 4th character, ensure it's 4
      return v.toString(16);
    });
  }
  