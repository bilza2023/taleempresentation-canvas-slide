//@ts-nocheck
import ComponentObject from './ComponentObject';
import DraggerHandle from '../handleObject/DraggerHandle';
import ButtonHandle from '../handleObject/ButtonHandle';
import getVal from "../../getVal";

///////////////////////////////////////////////////
export default class LineObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
        this.dialogueBox = [
            {
              componentName: 'TrPropNumber',
              title: 'x0',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'y0',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'x1',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'y1',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'lineWidth',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'arrowWidth',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'arrowHeight',
              props: {}
            },
            {
              componentName: 'TrTf',
              title: 'startArrow',
              props: {}
            },
            {
              componentName: 'TrTf',
              title: 'endArrow',
              props: {}
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

btnHandle.color = 'silver';
btnHandle.getX = function(){
    return this.itemData.extra.x0.initialValue ;
}
btnHandle.getY = function(){
    return this.itemData.extra.y0.initialValue + 25;
}
btnHandle.useInitialValue = true;

this.handleObjects.push(btnHandle);  

/////////////////////////////////////////////////////////////////////////////    
/////////////////////////////////////////////////////////////////////////////    
            //    debugger;
            let draggerHandle = new DraggerHandle(this.itemData,'x0' ,'y0'); 
            draggerHandle.useInitialValue = true; //since its prop
            draggerHandle.color = 'silver'; 
//--every Component-object can have different x and y e.g x0 x0 etc 
            draggerHandle.getX = function(){
                return this.itemData.extra.x0.initialValue;
            }

            draggerHandle.getY = function(){
                return  this.itemData.extra.y0.initialValue;
            }
            this.handleObjects.push(draggerHandle);    
///////////////////////////////////////////////////////////////////////////////////////          
            let draggerHandle2 = new DraggerHandle(this.itemData,'x1' ,'y1'); 
            draggerHandle2.useInitialValue = true; //since its prop
            draggerHandle2.color = 'blue'; //since its prop
//--every Component-object can have different x and y e.g x0 x0 etc 
            draggerHandle2.getX = function(){
                return this.itemData.extra.x1.initialValue;
            }

            draggerHandle2.getY = function(){
                return  this.itemData.extra.y1.initialValue;
            }
            this.handleObjects.push(draggerHandle2);    
    }
    draw(ctx, currentTime) {
      ctx.save(); // Save the current context state
    
      ctx.lineWidth = getVal(currentTime, this.itemData.extra.lineWidth);
      ctx.globalAlpha = getVal(currentTime, this.itemData.extra.globalAlpha);
      ctx.strokeStyle = getVal(currentTime, this.itemData.extra.color);
    
      if (getVal(currentTime, this.itemData.extra.dash) === 0 && getVal(currentTime, this.itemData.extra.gap) === 0) {
        ctx.setLineDash([]); // Set line dash pattern
      } else {
        ctx.setLineDash([getVal(currentTime, this.itemData.extra.dash), getVal(currentTime, this.itemData.extra.gap)]); // Set line dash pattern
      }
    
      const x0 = getVal(currentTime, this.itemData.extra.x0);
      const y0 = getVal(currentTime, this.itemData.extra.y0);
      const x1 = getVal(currentTime, this.itemData.extra.x1);
      const y1 = getVal(currentTime, this.itemData.extra.y1);
    
      const dx = x1 - x0;
      const dy = y1 - y0;
      const angle = Math.atan2(dy, dx);
      const length = Math.sqrt(dx * dx + dy * dy);
    
      ctx.translate(x0, y0);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(length, 0);
    
      if (this.itemData.extra.startArrow) {
        ctx.moveTo(getVal(currentTime, this.itemData.extra.arrowHeight), -getVal(currentTime, this.itemData.extra.arrowWidth));
        ctx.lineTo(0, 0);
        ctx.lineTo(getVal(currentTime, this.itemData.extra.arrowHeight), getVal(currentTime, this.itemData.extra.arrowWidth));
      }
    
      if (this.itemData.extra.endArrow) {
        ctx.moveTo(length - getVal(currentTime, this.itemData.extra.arrowHeight), -getVal(currentTime, this.itemData.extra.arrowWidth));
        ctx.lineTo(length, 0);
        ctx.lineTo(length - getVal(currentTime, this.itemData.extra.arrowHeight), getVal(currentTime, this.itemData.extra.arrowWidth));
      }
    
      ctx.stroke();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    
      ctx.restore(); // Restore the context state
    }
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
width(){
    // debugger;
let left = Math.min(this.itemData.extra.x0.initialValue, this.itemData.extra.x1.initialValue);
let top = Math.min(this.itemData.extra.y0.initialValue, this.itemData.extra.y1.initialValue);
let right = Math.max(this.itemData.extra.x0.initialValue, this.itemData.extra.x1.initialValue);
let bottom = Math.max(this.itemData.extra.y0.initialValue, this.itemData.extra.y1.initialValue);
return Math.abs(right - left);
 }
 height(){
    let left = Math.min(this.itemData.extra.x0.initialValue, this.itemData.extra.x1.initialValue);
    let top = Math.min(this.itemData.extra.y0.initialValue, this.itemData.extra.y1.initialValue);
    let right = Math.max(this.itemData.extra.x0.initialValue, this.itemData.extra.x1.initialValue);
    let bottom = Math.max(this.itemData.extra.y0.initialValue, this.itemData.extra.y1.initialValue);
    return Math.abs(bottom - top);    
 }
 getX(){
    return this.itemData.extra.x0.initialValue;
 }
 
 getY(){
    return this.itemData.extra.y0.initialValue;
 }
////////////////////////////////////////////////////////////////////
isHit(mouseX , mouseY){
    let left = Math.min(this.itemData.extra.x0.initialValue, this.itemData.extra.x1.initialValue);
    let top = Math.min(this.itemData.extra.y0.initialValue, this.itemData.extra.y1.initialValue);
    let right = Math.max(this.itemData.extra.x0.initialValue, this.itemData.extra.x1.initialValue);
    let bottom = Math.max(this.itemData.extra.y0.initialValue, this.itemData.extra.y1.initialValue);
    return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
    
}//class
