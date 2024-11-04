//@ts-nocheck
import uuid from "./uuid.js";

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