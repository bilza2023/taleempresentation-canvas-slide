//@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../getVal";

///////////////////////////////////////////////////
export default class LineObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
    
    }

    draw(ctx, currentTime) {
      ctx.save(); // Save the current context state
    
      ctx.lineWidth = getVal(currentTime, this.itemData.itemExtra.lineWidth);
      ctx.globalAlpha = getVal(currentTime, this.itemData.itemExtra.globalAlpha);
      ctx.strokeStyle = getVal(currentTime, this.itemData.itemExtra.color);
    
      if (getVal(currentTime, this.itemData.itemExtra.dash) === 0 && getVal(currentTime, this.itemData.itemExtra.gap) === 0) {
        ctx.setLineDash([]); // Set line dash pattern
      } else {
        ctx.setLineDash([getVal(currentTime, this.itemData.itemExtra.dash), getVal(currentTime, this.itemData.itemExtra.gap)]); // Set line dash pattern
      }
    
      const x0 = getVal(currentTime, this.itemData.itemExtra.x0);
      const y0 = getVal(currentTime, this.itemData.itemExtra.y0);
      const x1 = getVal(currentTime, this.itemData.itemExtra.x1);
      const y1 = getVal(currentTime, this.itemData.itemExtra.y1);
    
      const dx = x1 - x0;
      const dy = y1 - y0;
      const angle = Math.atan2(dy, dx);
      const length = Math.sqrt(dx * dx + dy * dy);
    
      ctx.translate(x0, y0);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(length, 0);
    
      if (this.itemData.itemExtra.startArrow) {
        ctx.moveTo(getVal(currentTime, this.itemData.itemExtra.arrowHeight), -getVal(currentTime, this.itemData.itemExtra.arrowWidth));
        ctx.lineTo(0, 0);
        ctx.lineTo(getVal(currentTime, this.itemData.itemExtra.arrowHeight), getVal(currentTime, this.itemData.itemExtra.arrowWidth));
      }
    
      if (this.itemData.itemExtra.endArrow) {
        ctx.moveTo(length - getVal(currentTime, this.itemData.itemExtra.arrowHeight), -getVal(currentTime, this.itemData.itemExtra.arrowWidth));
        ctx.lineTo(length, 0);
        ctx.lineTo(length - getVal(currentTime, this.itemData.itemExtra.arrowHeight), getVal(currentTime, this.itemData.itemExtra.arrowWidth));
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
let left = Math.min(this.itemData.itemExtra.x0.initialValue, this.itemData.itemExtra.x1.initialValue);
let top = Math.min(this.itemData.itemExtra.y0.initialValue, this.itemData.itemExtra.y1.initialValue);
let right = Math.max(this.itemData.itemExtra.x0.initialValue, this.itemData.itemExtra.x1.initialValue);
let bottom = Math.max(this.itemData.itemExtra.y0.initialValue, this.itemData.itemExtra.y1.initialValue);
return Math.abs(right - left);
 }
 height(){
    let left = Math.min(this.itemData.itemExtra.x0.initialValue, this.itemData.itemExtra.x1.initialValue);
    let top = Math.min(this.itemData.itemExtra.y0.initialValue, this.itemData.itemExtra.y1.initialValue);
    let right = Math.max(this.itemData.itemExtra.x0.initialValue, this.itemData.itemExtra.x1.initialValue);
    let bottom = Math.max(this.itemData.itemExtra.y0.initialValue, this.itemData.itemExtra.y1.initialValue);
    return Math.abs(bottom - top);    
 }
 getX(){
    return this.itemData.itemExtra.x0.initialValue;
 }
 
 getY(){
    return this.itemData.itemExtra.y0.initialValue;
 }
////////////////////////////////////////////////////////////////////
isHit(mouseX , mouseY){
    let left = Math.min(this.itemData.itemExtra.x0.initialValue, this.itemData.itemExtra.x1.initialValue);
    let top = Math.min(this.itemData.itemExtra.y0.initialValue, this.itemData.itemExtra.y1.initialValue);
    let right = Math.max(this.itemData.itemExtra.x0.initialValue, this.itemData.itemExtra.x1.initialValue);
    let bottom = Math.max(this.itemData.itemExtra.y0.initialValue, this.itemData.itemExtra.y1.initialValue);
    return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
    
}//class
