//@ts-nocheck
import ItemObject from './ItemObject';

export default class RayObject extends ItemObject {
    constructor(itemData=null, fnList={}) {
        super(itemData, fnList);
    }

    // Draw arrow head helper function
    drawArrowHead(ctx, x1, y1, x2, y2, arrowWidth, arrowHeight) {
        // Calculate the angle of the line
        const angle = Math.atan2(y2 - y1, x2 - x1);
        
        // Create the arrow head path
        ctx.beginPath();
        ctx.moveTo(x2, y2); // Tip of the arrow
        ctx.lineTo(
            x2 - arrowHeight * Math.cos(angle) + arrowWidth * Math.sin(angle),
            y2 - arrowHeight * Math.sin(angle) - arrowWidth * Math.cos(angle)
        );
        ctx.lineTo(
            x2 - arrowHeight * Math.cos(angle) - arrowWidth * Math.sin(angle),
            y2 - arrowHeight * Math.sin(angle) + arrowWidth * Math.cos(angle)
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    draw(ctx) {
        // Save the current context state
        ctx.save();
        
        // Extract values
        const {x0, y0, x1, y1, lineWidth = 2, arrowWidth = 8, arrowHeight = 12, 
               startArrow = true, endArrow = true, color = 'black', 
               dash = 0, gap = 0, globalAlpha = 1} = this.itemData.itemExtra;

        // Set properties
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.globalAlpha = globalAlpha;

        // Set line dash pattern
        if (dash === 0 && gap === 0) {
            ctx.setLineDash([]);
        } else {
            ctx.setLineDash([dash, gap]);
        }

        // Draw the line
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        // Clear line dash for arrows
        ctx.setLineDash([]);

        // Draw start arrow if requested
        if (startArrow) {
            this.drawArrowHead(ctx, x1, y1, x0, y0, arrowWidth, arrowHeight);
        }

        // Draw end arrow if requested
        if (endArrow) {
            this.drawArrowHead(ctx, x0, y0, x1, y1, arrowWidth, arrowHeight);
        }

        // Restore the context state
        ctx.restore();
    }

    // Use the same bounding rectangle and getter/setter methods as LineObject
    boundingRectangleX() {
        return Math.min(this.itemData.itemExtra.x0, this.itemData.itemExtra.x1);
    }

    boundingRectangleY() {
        return Math.min(this.itemData.itemExtra.y0, this.itemData.itemExtra.y1);
    }

    get x() {
        return this.boundingRectangleX();
    }

    set x(newX) {
        const deltaX = newX - this.x;
        this.itemData.itemExtra.x0 += deltaX;
        this.itemData.itemExtra.x1 += deltaX;
    }

    get y() {
        return this.boundingRectangleY();
    }

    set y(newY) {
        const deltaY = newY - this.y;
        this.itemData.itemExtra.y0 += deltaY;
        this.itemData.itemExtra.y1 += deltaY;
    }

    get width() {
        return Math.abs(this.itemData.itemExtra.x1 - this.itemData.itemExtra.x0);
    }

    set width(newWidth) {
        const x0 = this.itemData.itemExtra.x0;
        const x1 = this.itemData.itemExtra.x1;
        const currentWidth = this.width;
        
        if (currentWidth === 0) return;
        
        const scale = newWidth / currentWidth;
        const leftX = this.boundingRectangleX();
        
        this.itemData.itemExtra.x0 = leftX + (x0 - leftX) * scale;
        this.itemData.itemExtra.x1 = leftX + (x1 - leftX) * scale;
    }

    get height() {
        return Math.abs(this.itemData.itemExtra.y1 - this.itemData.itemExtra.y0);
    }

    set height(newHeight) {
        const y0 = this.itemData.itemExtra.y0;
        const y1 = this.itemData.itemExtra.y1;
        const currentHeight = this.height;
        
        if (currentHeight === 0) return;
        
        const scale = newHeight / currentHeight;
        const topY = this.boundingRectangleY();
        
        this.itemData.itemExtra.y0 = topY + (y0 - topY) * scale;
        this.itemData.itemExtra.y1 = topY + (y1 - topY) * scale;
    }
}