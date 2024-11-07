//@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../getVal";

export default class AngleObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
    }

draw(ctx,currentTime){ 
      // debugger;
        const startAngle = this.itemData.itemExtra.startAngle * (Math.PI / 180);
        const endAngle = this.itemData.itemExtra.endAngle * (Math.PI / 180);

const x = this.itemData.itemExtra.x; 
const y = this.itemData.itemExtra.y;
const radius = this.itemData.itemExtra.radius; 
const ticks = this.itemData.itemExtra.ticks; 
const color = getVal(currentTime , this.itemData.itemExtra.color);
const lineWidth = this.itemData.itemExtra.lineWidth;
const showOrigin = this.itemData.itemExtra.showOrigin;
/////////////////////////////////////////////////
            ctx.save();
            // Set the color and line width
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
        
            // Draw the circle's circumference
            ctx.beginPath();
            ctx.arc(x, y, radius, startAngle, endAngle);
            ctx.stroke();
        
            // Draw the angle ticks
            const angleStep = (endAngle - startAngle) / (ticks + 1);
            for (let i = 1; i <= ticks; i++) {
                const angle = startAngle + i * angleStep;
                const startX = x + Math.cos(angle) * (radius - 5);
                const startY = y + Math.sin(angle) * (radius - 5);
                const endX = x + Math.cos(angle) * (radius + 10);
                const endY = y + Math.sin(angle) * (radius + 10);
        
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            }
        
            // Draw the origin circle if showOrigin is true
            if (showOrigin) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2); // Very small circle
            ctx.fillStyle = color; // Use the same color as the arc
            ctx.fill();
            }
        
            // Restore the previous drawing state
            ctx.restore();            
    }
    isHit(mouseX, mouseY) {
        const hitMargin = 20;
    
        return (
            mouseX >= this.itemData.itemExtra.x - hitMargin &&
            mouseX <= this.itemData.itemExtra.x + hitMargin &&
            mouseY >= this.itemData.itemExtra.y - hitMargin &&
            mouseY <= this.itemData.itemExtra.y + hitMargin
        );
    }
    
    
}//class
