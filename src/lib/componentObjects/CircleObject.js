//@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../getVal";

export default class CircleObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
}

    draw(ctx, currentTime) {
      // Save the current context state
      ctx.save();
  
      // Extract values
      const x = getVal(currentTime, this.itemData.itemExtra.x);
      const y = getVal(currentTime, this.itemData.itemExtra.y);
      const radius = getVal(currentTime, this.itemData.itemExtra.radius);
      const color = getVal(currentTime, this.itemData.itemExtra.color) || 'black';
      const fill = getVal(currentTime, this.itemData.itemExtra.fill) || false;
      const startAngle = (getVal(currentTime, this.itemData.itemExtra.startAngle) || 0) * (Math.PI / 180);
      const endAngle = (getVal(currentTime, this.itemData.itemExtra.endAngle) || 360) * (Math.PI / 180);
      const dash = getVal(currentTime, this.itemData.itemExtra.dash) || 0;
      const gap = getVal(currentTime, this.itemData.itemExtra.gap) || 0;
      const lineWidth = getVal(currentTime, this.itemData.itemExtra.lineWidth) || 1;
      const globalAlpha = getVal(currentTime, this.itemData.itemExtra.globalAlpha) || 1;
  
      // Set properties
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = globalAlpha;
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
  
      if (fill) {
          ctx.fillStyle = color;
          ctx.fill();
      } else {
          ctx.strokeStyle = color;
          
          // Set line dash pattern
          if (dash === 0 && gap === 0) {
              ctx.setLineDash([]);
          } else {
              ctx.setLineDash([dash, gap]);
          }
  
          ctx.stroke();
      }
  
      // Restore the context state
      ctx.restore();
  }
  
////////////////////////////////////////////////////////////////////
width(){
    return this.itemData.itemExtra.radius.initialValue * 2;
 }
 height(){
    return this.itemData.itemExtra.radius.initialValue * 2;
 }
 getX(){
    return this.itemData.itemExtra.x.initialValue;
 }
 
 getY(){
    return this.itemData.itemExtra.y.initialValue;
 }
////////////////////////////////////////////////////////////////////
isHit(mouseX, mouseY) {
    const centerX = this.getX();
    const centerY = this.getY();
    const radius = this.itemData.itemExtra.radius.initialValue;

    // Calculate the distance between the mouse click and the center of the circle
    const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );

    // Check if the distance is less than or equal to the radius
    return distance <= radius;
}
}//class
