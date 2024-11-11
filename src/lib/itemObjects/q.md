that is so great .. here is TriangleObject and here are some questions


 1: get width and get height are good but now we need to also refactor set width and set height. so that we can set the height and width of the TriangleObject as well.

2: boundingRectangleX and boundingRectangleY are the x and y of the bounding rectangle around the tirangle, in these methods we have to calculate the bounding rectangle x and y which is top left cornor of the rectangle aorund triangle.
 //@ts-nocheck
import ItemObject from './ItemObject';

export default class TriangleObject extends ItemObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
    }

draw(ctx) {
      // Save the current context state
      ctx.save();
  
      // Extract values
      const x1 = this.itemData.itemExtra.x1;
      const y1 = this.itemData.itemExtra.y1;
      const x2 = this.itemData.itemExtra.x2;
      const y2 = this.itemData.itemExtra.y2;
      const x3 = this.itemData.itemExtra.x3;
      const y3 = this.itemData.itemExtra.y3;
      const color = this.itemData.itemExtra.color || 'black';
      const filled = this.itemData.itemExtra.filled || true;
      const lineWidth = this.itemData.itemExtra.lineWidth || 2;
      const dash = this.itemData.itemExtra.dash || 0;
      const gap = this.itemData.itemExtra.gap || 0;
      const globalAlpha = this.itemData.itemExtra.globalAlpha || 1;
  
      // Set properties
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = globalAlpha;
      ctx.strokeStyle = color;
  
      // Set line dash pattern
      if (dash === 0 && gap === 0) {
          ctx.setLineDash([]);
      } else {
          ctx.setLineDash([dash, gap]);
      }
  
      // Draw filled or outlined triangle
      if (filled) {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineTo(x3, y3);
          ctx.closePath();
          ctx.fill();
      } else {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineTo(x3, y3);
          ctx.closePath();
          ctx.stroke();
      }
  
      // Restore the context state
      ctx.restore();
}
  
////////////////////////////////////////////////////
boundingRectangleX() {
    return this.itemData.itemExtra.x;
}
boundingRectangleY() {
    return this.itemData.itemExtra.y;
}
get width() {
    const x1 = this.itemData.itemExtra.x1;
    const x2 = this.itemData.itemExtra.x2;
    const x3 = this.itemData.itemExtra.x3;
    
    // Find the leftmost and rightmost x coordinates
    const minX = Math.min(x1, x2, x3);
    const maxX = Math.max(x1, x2, x3);
    
    // Width is the difference between rightmost and leftmost points
    return maxX - minX;
}
set width(newWidth) {
    this.itemData.itemExtra.fontSize = newWidth;
}
get height() {
    const y1 = this.itemData.itemExtra.y1;
    const y2 = this.itemData.itemExtra.y2;
    const y3 = this.itemData.itemExtra.y3;
    
    // Find the highest and lowest y coordinates
    const minY = Math.min(y1, y2, y3);
    const maxY = Math.max(y1, y2, y3);
    
    // Height is the difference between lowest and highest points
    return maxY - minY;
}
set height(newHeight) {
    this.itemData.itemExtra.fontSize = newHeight;
}
       
}//class

