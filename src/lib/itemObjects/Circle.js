//@ts-nocheck
import ItemObject from './ItemObject';

export default class Circle extends ItemObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
}

    draw(ctx) {
      // Save the current context state
      ctx.save();
  
      // Extract values
      const x = this.itemData.itemExtra.x;
      const y = this.itemData.itemExtra.y;
      const radius = this.itemData.itemExtra.radius;
      const color = this.itemData.itemExtra.color || 'black';
      const fill = this.itemData.itemExtra.fill || false;
      const startAngle = (this.itemData.itemExtra.startAngle) || 0 * (Math.PI / 180);
      const endAngle = (this.itemData.itemExtra.endAngle || 360) * (Math.PI / 180);
      const dash = this.itemData.itemExtra.dash || 0;
      const gap = this.itemData.itemExtra.gap || 0;
      const lineWidth = this.itemData.itemExtra.lineWidth || 1;
      const globalAlpha = this.itemData.itemExtra.globalAlpha || 1;
  
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

  // Position getters and setters
boundingRectangleX() {
    return this.itemData.itemExtra.x - this.itemData.itemExtra.radius;
}

boundingRectangleY() {
    return this.itemData.itemExtra.y - this.itemData.itemExtra.radius;
}
get x() {
    return this.itemData.itemExtra.x;
}

set x(newX) {
    this.itemData.itemExtra.x = newX;
}

get y() {
    return this.itemData.itemExtra.y;
}

set y(newY) {
    this.itemData.itemExtra.y = newY;
}

// Dimension getters and setters
get width() {
    return this.itemData.itemExtra.radius * 2;
}

set width(newWidth) {
    this.itemData.itemExtra.radius = newWidth;
}

get height() {
    return this.itemData.itemExtra.radius * 2;
}

set height(newHeight) {
    this.itemData.itemExtra.radius = newHeight;
}

////////////////////////////////////////////////////////////////////
// 
}//class
