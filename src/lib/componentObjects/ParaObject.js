//@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../getVal";

export default class ParaObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
    }

    draw(ctx,currentTime) {
      ctx.save();
    
      // Set shadow properties
      ctx.shadowOffsetX = this.itemData.itemExtra.shadowOffsetX;
      ctx.shadowOffsetY = this.itemData.itemExtra.shadowOffsetY;
      ctx.shadowBlur = this.itemData.itemExtra.shadowBlur;
      ctx.shadowColor = this.itemData.itemExtra.shadowColor;
    
      ctx.fillStyle = getVal(currentTime, this.itemData.itemExtra.color);
      ctx.font = this.itemData.itemExtra.fontSize.initialValue + 'px Arial';
      ctx.textBaseline = 'top';
    
      ctx.globalAlpha = getVal(currentTime, this.itemData.itemExtra.globalAlpha);
    
      const lines = this.itemData.itemExtra.text.split('\n'); // Split text into lines based on line breaks
    
      // Loop over each line
      lines.forEach((line, index) => {
        // Calculate y position for each line, adjusting for line height offset
        const lineHeight = parseInt(this.itemData.itemExtra.fontSize.initialValue, 10) + this.itemData.itemExtra.lineHeightOffset; // Adjusted line height
        const yPos = getVal(currentTime, this.itemData.itemExtra.y) + (index * lineHeight);
    
        // Calculate x position for each line, adjusting for xOffset
        const xPos = getVal(currentTime, this.itemData.itemExtra.x) + (index * this.itemData.itemExtra.xOffset);
    
        // Call the text method for each line with adjusted positions
        ctx.fillText(line, xPos, yPos);
      });
    
      // Restore the context state
      ctx.restore();
    }
    // width(){
    //     return this.itemData.itemExtra.width.initialValue;
    //  }
    //  height(){
    //     return this.itemData.itemExtra.height.initialValue;
    //  }
     getX(){
        return this.itemData.itemExtra.x.initialValue;
     }
     
     getY(){
        return this.itemData.itemExtra.y.initialValue;
     }
    
     getHitAreaRadius() {
        // Base the hit area radius on font size and text length
        const baseRadius = this.itemData.itemExtra.fontSize.initialValue / 2;
        const textLength = this.itemData.itemExtra.text.length;
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
