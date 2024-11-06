//@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../../getVal";

export default class RectangleObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
    }

////////////////////////////////////////////////////
draw(ctx, currentTime) {
  // Save the current context state
  ctx.save();

  // Extract values
  const x = getVal(currentTime, this.itemData.itemExtra.x);
  const y = getVal(currentTime, this.itemData.itemExtra.y);
  const width = getVal(currentTime, this.itemData.itemExtra.width);
  const height = getVal(currentTime, this.itemData.itemExtra.height);
  const color = getVal(currentTime, this.itemData.itemExtra.color) || 'white';
  const filled = getVal(currentTime, this.itemData.itemExtra.filled) || true;
  const dash = getVal(currentTime, this.itemData.itemExtra.dash) || 0;
  const gap = getVal(currentTime, this.itemData.itemExtra.gap) || 0;
  const lineWidth = getVal(currentTime, this.itemData.itemExtra.lineWidth) || 1;
  const globalAlpha = getVal(currentTime, this.itemData.itemExtra.globalAlpha) || 1;

  // Set properties
  ctx.lineWidth = lineWidth;
  ctx.globalAlpha = globalAlpha;

  // Set line dash pattern
  if (dash === 0 && gap === 0) {
      ctx.setLineDash([]);
  } else {
      ctx.setLineDash([dash, gap]);
  }

  if (filled) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
  } else {
      ctx.strokeStyle = color;
      ctx.strokeRect(x, y, width, height);
  }

  // Restore the context state
  ctx.restore();
}

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

 getLeft() {
    return Math.min(this.getX(), this.getX() + this.width());
}

getRight() {
    return Math.max(this.getX(), this.getX() + this.width());
}

getTop() {
    return Math.min(this.getY(), this.getY() + this.height());
}

getBottom() {
    return Math.max(this.getY(), this.getY() + this.height());
}

isHit(mouseX, mouseY) {
    return (
        mouseX >= this.getLeft() &&
        mouseX <= this.getRight() &&
        mouseY >= this.getTop() &&
        mouseY <= this.getBottom()
    );
}
    
}//class
