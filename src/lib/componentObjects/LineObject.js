//@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../getVal";

export default class LineObject extends ComponentObject {
    constructor(itemData=null , fnList={}) {
        super(itemData , fnList);
    }

///////////////////////////////////////////////////////////////////////////
  draw(ctx, currentTime) {
    // Save the current context state
    ctx.save();
    // Extract values
    const x1 = getVal(currentTime, this.itemData.itemExtra.x1);
    const y1 = getVal(currentTime, this.itemData.itemExtra.y1);
    const x2 = getVal(currentTime, this.itemData.itemExtra.x2);
    const y2 = getVal(currentTime, this.itemData.itemExtra.y2);
    const color = getVal(currentTime, this.itemData.itemExtra.color) || 'black';
    const lineWidth = getVal(currentTime, this.itemData.itemExtra.lineWidth) || 1;
    const dash = getVal(currentTime, this.itemData.itemExtra.dash) || 0;
    const gap = getVal(currentTime, this.itemData.itemExtra.gap) || 0;
    const globalAlpha = getVal(currentTime, this.itemData.itemExtra.globalAlpha) || 1;

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
let left = Math.min(this.itemData.itemExtra.x1.initialValue, this.itemData.itemExtra.x2.initialValue);
let top = Math.min(this.itemData.itemExtra.y1.initialValue, this.itemData.itemExtra.y2.initialValue);
let right = Math.max(this.itemData.itemExtra.x1.initialValue, this.itemData.itemExtra.x2.initialValue);
let bottom = Math.max(this.itemData.itemExtra.y1.initialValue, this.itemData.itemExtra.y2.initialValue);
return Math.abs(right - left);
 }
 height(){
    let left = Math.min(this.itemData.itemExtra.x1.initialValue, this.itemData.itemExtra.x2.initialValue);
    let top = Math.min(this.itemData.itemExtra.y1.initialValue, this.itemData.itemExtra.y2.initialValue);
    let right = Math.max(this.itemData.itemExtra.x1.initialValue, this.itemData.itemExtra.x2.initialValue);
    let bottom = Math.max(this.itemData.itemExtra.y1.initialValue, this.itemData.itemExtra.y2.initialValue);
    return Math.abs(bottom - top);    
 }
 getX(){
    return this.itemData.itemExtra.x1.initialValue;
 }
 
 getY(){
    return this.itemData.itemExtra.y1.initialValue;
 }
////////////////////////////////////////////////////////////////////
isHit(mouseX , mouseY){
    let left = Math.min(this.itemData.itemExtra.x1.initialValue, this.itemData.itemExtra.x2.initialValue);
    let top = Math.min(this.itemData.itemExtra.y1.initialValue, this.itemData.itemExtra.y2.initialValue);
    let right = Math.max(this.itemData.itemExtra.x1.initialValue, this.itemData.itemExtra.x2.initialValue);
    let bottom = Math.max(this.itemData.itemExtra.y1.initialValue, this.itemData.itemExtra.y2.initialValue);
    return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}

///////////////////////////////////////////////////////////////////////////
    
}//class
