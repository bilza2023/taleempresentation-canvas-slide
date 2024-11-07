 //@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../getVal";

export default class TriangleObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);

    }

    draw(ctx, currentTime) {
      // Save the current context state
      ctx.save();
  
      // Extract values
      const x1 = getVal(currentTime, this.itemData.itemExtra.x1);
      const y1 = getVal(currentTime, this.itemData.itemExtra.y1);
      const x2 = getVal(currentTime, this.itemData.itemExtra.x2);
      const y2 = getVal(currentTime, this.itemData.itemExtra.y2);
      const x3 = getVal(currentTime, this.itemData.itemExtra.x3);
      const y3 = getVal(currentTime, this.itemData.itemExtra.y3);
      const color = getVal(currentTime, this.itemData.itemExtra.color) || 'black';
      const filled = getVal(currentTime, this.itemData.itemExtra.filled) || true;
      const lineWidth = getVal(currentTime, this.itemData.itemExtra.lineWidth) || 2;
      const dash = getVal(currentTime, this.itemData.itemExtra.dash) || 0;
      const gap = getVal(currentTime, this.itemData.itemExtra.gap) || 0;
      const globalAlpha = getVal(currentTime, this.itemData.itemExtra.globalAlpha) || 1;
  
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
  
     getX(){
        return this.itemData.itemExtra.x.initialValue;
     }
     
     getY(){
        return this.itemData.itemExtra.y.initialValue;
     }
    
     isHit(mouseX, mouseY) {
        const x1 = this.itemData.itemExtra.x1.initialValue;
        const y1 = this.itemData.itemExtra.y1.initialValue;
        const x2 = this.itemData.itemExtra.x2.initialValue;
        const y2 = this.itemData.itemExtra.y2.initialValue;
        const x3 = this.itemData.itemExtra.x3.initialValue;
        const y3 = this.itemData.itemExtra.y3.initialValue;
    
        // Helper function to calculate the area of a triangle
        const area = (x1, y1, x2, y2, x3, y3) => {
            return Math.abs((x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) / 2.0);
        };
    
        // Calculate area of the full triangle (x1, y1), (x2, y2), (x3, y3)
        const A = area(x1, y1, x2, y2, x3, y3);
    
        // Calculate area of sub-triangle (mouseX, mouseY), (x2, y2), (x3, y3)
        const A1 = area(mouseX, mouseY, x2, y2, x3, y3);
    
        // Calculate area of sub-triangle (x1, y1), (mouseX, mouseY), (x3, y3)
        const A2 = area(x1, y1, mouseX, mouseY, x3, y3);
    
        // Calculate area of sub-triangle (x1, y1), (x2, y2), (mouseX, mouseY)
        const A3 = area(x1, y1, x2, y2, mouseX, mouseY);
    
        // Check if sum of A1, A2 and A3 is same as A
        return (A === A1 + A2 + A3);
    }
    
    
    

    
}//class
