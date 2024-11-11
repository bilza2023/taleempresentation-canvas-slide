//@ts-nocheck
import ItemObject from './ItemObject';

export default class Rectangle extends ItemObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
    }

////////////////////////////////////////////////////
draw(ctx) {
  // Save the current context state
  ctx.save();
// debugger;
  // Extract values
  const x = this.x;
  const y = this.y;
  const width = this.width;
  const height = this.height;
  const color = this.itemData.itemExtra.color || 'white';
  const filled = this.itemData.itemExtra.filled || true;
  const dash = this.itemData.itemExtra.dash || 0;
  const gap =  this.itemData.itemExtra.gap || 0;
  const lineWidth =  this.itemData.itemExtra.lineWidth || 1;
  const globalAlpha =  this.itemData.itemExtra.globalAlpha || 1;

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



}//class
