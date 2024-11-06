//@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../../getVal";
import getProp from '../../getProp';


export default class TextObject extends ComponentObject {
    constructor(itemData , fnList) {
      super(itemData , fnList);         
    }

draw(ctx, currentTime) {
  //--very bad code remove it from here 
if(!this.itemData.itemExtra.fontSize || this.itemData.itemExtra.fontSize.initialValue){
  this.itemData.itemExtra.fontSize = getProp(40);
}
  const text = getVal(currentTime, this.itemData.itemExtra.text);
  const x = getVal(currentTime, this.itemData.itemExtra.x);
  const y = getVal(currentTime, this.itemData.itemExtra.y);
  const color = getVal(currentTime, this.itemData.itemExtra.color);
  const font = this.itemData.itemExtra.font || '12px Arial';
  const shadowOffsetX = this.itemData.itemExtra.shadowOffsetX || 0;
  const shadowOffsetY = this.itemData.itemExtra.shadowOffsetY || 0;
  const shadowBlur = this.itemData.itemExtra.shadowBlur || 4;
  const shadowColor = this.itemData.itemExtra.shadowColor || 'gray';
  const globalAlpha = getVal(currentTime, this.itemData.itemExtra.globalAlpha);

  // Save context state
  ctx.save();

  // Apply text and shadow properties
  ctx.shadowOffsetX = shadowOffsetX;
  ctx.shadowOffsetY = shadowOffsetY;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowColor = shadowColor;
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'top';
  ctx.globalAlpha = globalAlpha;

  // Draw the text
  ctx.fillText(text, x, y);

  // Restore context state
  ctx.restore();
}



    ////////////////////////////////////////////////////

width(){
    return this.itemData.itemExtra.width.initialValue;
 }
 height(){
    return this.itemData.itemExtra.height.initialValue;
 }
 getX(){
    return this.itemData.itemExtra.x.initialValue;
 }
 
 getY(){
    return this.itemData.itemExtra.y.initialValue;
 }

 getHitAreaRadius() {
    // Base the hit area radius on font size and text length
    const baseRadius = this.itemData.itemExtra.fontSize.initialValue / 2;
    const textLength = this.itemData.itemExtra.text.initialValue.length;
    return baseRadius + (textLength * 2); // Adjust this formula as needed
}

isHit(mouseX, mouseY) {
    const centerX = this.getX();
    const centerY = this.getY();
    const radius = this.getHitAreaRadius();

    // Calculate the distance between the mouse click and the text origin
    const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );

    // Check if the distance is less than or equal to the hit area radius
    return distance <= radius;
}
    
}//class
