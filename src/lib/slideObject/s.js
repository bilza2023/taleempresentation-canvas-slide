//@ts-nocheck

export default function getNewCanvasSlide() {
    let slide;
       slide = newSlideData("canvas");
       
       slide.slideExtra = {
           backgroundColor: '#efebb8',
           canvasWidth : 1000,
           canvasHeight : 360,
           cellHeight : 25,
           cellWidth : 25,
           bgImg : 'system_images/bg_images/white_mat.jpg',
           bgGlobalAlpha : 1,
           xFactor : 0,
           yFactor : 0,
           ///////////////////
           showGrid : false,
           gridLineWidth : 1,
           gridLineColor : 'gray'
       }
         
   return slide;
   }
   
   function newSlideData( type) {
       // fsStartTime:null and  fsEndTime:null are in items and not in side
       return {
           uuid : uuid(),
           startTime:0,
           endTime:10,
           type, // this is "slideType" , its what is used by Presentation Module
           template:'',
           soundFileType:'opus',
           items: [], 
           slideExtra:[],
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
     