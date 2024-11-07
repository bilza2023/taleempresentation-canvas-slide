//@ts-nocheck
import ComponentObject from './ComponentObject';
import DraggerHandle from '../handleObject/DraggerHandle';
import ButtonHandle from '../handleObject/ButtonHandle';
import getVal from "../../getVal";
import getProp from '../../getProp';

export default class LineObject extends ComponentObject {
    constructor(itemData=null , fnList={}) {
      // // debugger;
      // if(itemData ==null){
      //     itemData = {
      //         "x1": getProp(20),
      //         "y1": getProp(10),
      //         "x2": getProp(500),
      //         "y2": getProp(200),
      //         "lineWidth": getProp(2),              
      //         };
      // }
        super(itemData , fnList);

        this.dialogueBox = [
            {
              componentName: 'TrPropNumber',
              title: 'x1',
              props: {
                min: 0,
                max: 45
              }
            },
            {
              componentName: 'TrPropNumber',
              title: 'y1',
              props: {
                min: 0,
                max: 25
              }
            },
            {
              componentName: 'TrPropNumber',
              title: 'x2',
              props: {
                min: 0,
                max: 45
              }
            },
            {
              componentName: 'TrPropNumber',
              title: 'y2',
              props: {
                min: 0,
                max: 25
              }
            },
            {
              componentName: 'TrPropNumber',
              title: 'lineWidth',
              props: {
                min: 0,
                max: 25
              }
            },
            // GapDashCommands
            {
              componentName: 'TrPropNumber',
              title: 'dash',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'gap',
              props: {}
            },
            // CommonCommands
            {
              componentName: 'TrText',
              title: 'name',
              props: {}
            },
            {
              componentName: 'TrPropColor',
              title: 'color',
              props: {}
            },
            {
              componentName: 'TrNo',
              title: 'showAt',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'globalAlpha',
              props: {
                min: '0.0',
                max: '1.0',
                step: '0.1'
              }
            },
            // ShadowCommands
            {
              componentName: 'TrNo',
              title: 'shadowOffsetX',
              props: {}
            },
            {
              componentName: 'TrNo',
              title: 'shadowOffsetY',
              props: {}
            },
            {
              componentName: 'TrNo',
              title: 'shadowBlur',
              props: {}
            },
            {
              componentName: 'TrColor',
              title: 'shadowColor',
              props: {}
            }
          ];
    }

    loadHandles(){
        
     
        
////////////////////////////////////////////////////////////////////////////
let btnHandle = new ButtonHandle(this.itemData,this.fnList); 

            btnHandle.getX = function(){
                return this.itemData.extra.x1.initialValue ;
            }
            btnHandle.getY = function(){
                return this.itemData.extra.y1.initialValue + 25;
            }
            btnHandle.useInitialValue = true;

            this.handleObjects.push(btnHandle);  
           
/////////////////////////////////////////////////////////////////////////////    
            //    debugger;
            let draggerHandle = new DraggerHandle(this.itemData,'x1' ,'y1'); 
            draggerHandle.useInitialValue = true; //since its prop
            draggerHandle.color = '#a8baea'; 
//--every Component-object can have different x and y e.g x1 x0 etc 
            draggerHandle.getX = function(){
                return this.itemData.extra.x1.initialValue;
            }

            draggerHandle.getY = function(){
                return  this.itemData.extra.y1.initialValue;
            }
            this.handleObjects.push(draggerHandle);    
///////////////////////////////////////////////////////////////////////////////////////          
            let draggerHandle2 = new DraggerHandle(this.itemData,'x2' ,'y2'); 
            draggerHandle2.useInitialValue = true; //since its prop
            draggerHandle2.color = 'blue'; //since its prop
//--every Component-object can have different x and y e.g x1 x0 etc 
            draggerHandle2.getX = function(){
                return this.itemData.extra.x2.initialValue;
            }

            draggerHandle2.getY = function(){
                return  this.itemData.extra.y2.initialValue;
            }
            this.handleObjects.push(draggerHandle2);    
    }
///////////////////////////////////////////////////////////////////////////
  draw(ctx, currentTime) {
    // Save the current context state
    ctx.save();

    // Extract values
    const x1 = getVal(currentTime, this.itemData.extra.x1);
    const y1 = getVal(currentTime, this.itemData.extra.y1);
    const x2 = getVal(currentTime, this.itemData.extra.x2);
    const y2 = getVal(currentTime, this.itemData.extra.y2);
    const color = getVal(currentTime, this.itemData.extra.color) || 'black';
    const lineWidth = getVal(currentTime, this.itemData.extra.lineWidth) || 1;
    const dash = getVal(currentTime, this.itemData.extra.dash) || 0;
    const gap = getVal(currentTime, this.itemData.extra.gap) || 0;
    const globalAlpha = getVal(currentTime, this.itemData.extra.globalAlpha) || 1;

    // Set properties
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.globalAlpha = globalAlpha;

    // Set line dash pattern
    if (dash === 0 && gap === 0) {
        ctx.setLineDash([]);
    } else {
        ctx.setLineDash([dash, gap]);
    }

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Restore the context state
    ctx.restore();
}

width(){
    // debugger;
let left = Math.min(this.itemData.extra.x1.initialValue, this.itemData.extra.x2.initialValue);
let top = Math.min(this.itemData.extra.y1.initialValue, this.itemData.extra.y2.initialValue);
let right = Math.max(this.itemData.extra.x1.initialValue, this.itemData.extra.x2.initialValue);
let bottom = Math.max(this.itemData.extra.y1.initialValue, this.itemData.extra.y2.initialValue);
return Math.abs(right - left);
 }
 height(){
    let left = Math.min(this.itemData.extra.x1.initialValue, this.itemData.extra.x2.initialValue);
    let top = Math.min(this.itemData.extra.y1.initialValue, this.itemData.extra.y2.initialValue);
    let right = Math.max(this.itemData.extra.x1.initialValue, this.itemData.extra.x2.initialValue);
    let bottom = Math.max(this.itemData.extra.y1.initialValue, this.itemData.extra.y2.initialValue);
    return Math.abs(bottom - top);    
 }
 getX(){
    return this.itemData.extra.x1.initialValue;
 }
 
 getY(){
    return this.itemData.extra.y1.initialValue;
 }
////////////////////////////////////////////////////////////////////
isHit(mouseX , mouseY){
    let left = Math.min(this.itemData.extra.x1.initialValue, this.itemData.extra.x2.initialValue);
    let top = Math.min(this.itemData.extra.y1.initialValue, this.itemData.extra.y2.initialValue);
    let right = Math.max(this.itemData.extra.x1.initialValue, this.itemData.extra.x2.initialValue);
    let bottom = Math.max(this.itemData.extra.y1.initialValue, this.itemData.extra.y2.initialValue);
    return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}

///////////////////////////////////////////////////////////////////////////
    
}//class
