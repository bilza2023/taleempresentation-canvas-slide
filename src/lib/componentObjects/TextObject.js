//@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../getVal";
import getProp from '../getProp';


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

    width(ctx) {
      //currentTime == 0 
      const text = getVal(0, this.itemData.itemExtra.text);
      const font = this.itemData.itemExtra.font || '12px Arial';
      ctx.font = font;
      return ctx.measureText(text).width;
  }

  height(ctx) {
      // Approximate the text height by measuring the width of the letter 'W'
      const font = this.itemData.itemExtra.font || '12px Arial';
      ctx.font = font;
      return ctx.measureText('W').width * 1.2;
  }
 getX(){
    return this.itemData.itemExtra.x.initialValue;
 }
 
 getY(){
    return this.itemData.itemExtra.y.initialValue;
 }

   isHit(mouseX, mouseY,ctx) {
  return (
    mouseX >= this.getX() &&
    mouseX <= this.getX() + this.width(ctx) &&
    mouseY >= this.getY() &&
    mouseY <= this.getY() + this.height(ctx)
);
}
    
}//class
