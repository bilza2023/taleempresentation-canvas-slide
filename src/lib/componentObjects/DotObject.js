//@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../getVal";

export default class DotObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
 
    }
////////////////////////////////////////////////////////////
draw(ctx, currentTime) {
  const {
      x,
      y,
      label,
      dot_width,
      text_size,
      color,
      text_color,
      globalAlpha
  } = this.itemData.itemExtra;

  ctx.save();
  ctx.globalAlpha = getVal(currentTime, globalAlpha);

  // Draw the dot
  ctx.beginPath();
  ctx.arc(
      getVal(currentTime, x),
      getVal(currentTime, y),
      getVal(currentTime, dot_width) / 2,
      0,
      2 * Math.PI
  );
  ctx.fillStyle = getVal(currentTime, color);
  ctx.fill();

  // Draw the label
  ctx.font = `${getVal(currentTime, text_size)}px Arial`;
  ctx.fillStyle = getVal(currentTime, text_color);
  ctx.fillText(
      getVal(currentTime, label),
      parseInt(getVal(currentTime, x)) - parseInt(getVal(currentTime, dot_width) / 2),
      parseInt(getVal(currentTime, y)) + parseInt(getVal(currentTime, dot_width) * 2)
  );

  ctx.restore();
}
////////////////////////////////////////////////////

width(){
    return this.itemData.itemExtra.x.initialValue + (this.itemData.itemExtra.dot_width.initialValue *  1.5);
 }
 height(){
    return this.itemData.itemExtra.x.initialValue + (this.itemData.itemExtra.dot_width.initialValue *  1.5);
 }
 getX(){
    return this.itemData.itemExtra.x.initialValue;
 }
 
 getY(){
    return this.itemData.itemExtra.y.initialValue;
 }


 getHitAreaRadius() {
    // Base the hit area radius on font size and text length
    const baseRadius = 20;
    const textLength = 10;
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

 
////////////////////////////////////////////////////////////
    
}//class
