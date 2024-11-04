//@ts-nocheck
import newSlideData from "./newSlideData";

export default function getNewSlide(type) {
 let slide;
//  debugger;
 switch (type) {
   

    // case 'TblStr':
    // slide = newSlideData("TblStr");
    // slide.slideExtra.push({key : "data" , value: "first,second"});
    // break;

    case 'Eqs':
    slide = newSlideData("Eqs");    
    break;

   
    case 'canvas':
        // debugger;
    slide = newSlideData("canvas");
    
    slide.extra = {
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
    }

      
    break;
 
    default:
    slide =  newSlideData(type);
    break;
 }
return slide;
}
/////////////////////////////////////////////
/////////////////////////////////////////////

//////////////////////////////////////////////////


// function addGrid(){
    //     return { 
    //                startTime:0,
    //                endTime:0,
    //                type : 'grid',
    //                version : 0,
    //                template : '',
    //                items : [],
    //                slideExtra : []
    //     };
//    }