//@ts-nocheck
import ComponentObject from './ComponentObject';

export default class IconObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
    }

////////////////////////////////////////////////////////////
// eslint-disable-next-line no-unused-vars
draw(ctx, currentTime) {
    ctx.save();
    const percent_rect_extra = 20; 
    // debugger;
    ctx.font = this.itemData.itemExtra.fontSize.initialValue + 'px ' + this.itemData.itemExtra.fontFamily;
    const textWidth = ctx.measureText(this.itemData.itemExtra.text.initialValue).width;
    const textHeight = ctx.measureText('W').width;
    
    ctx.font = this.itemData.itemExtra.iconSize.initialValue + 'px Arial';
    const iconWidth = ctx.measureText(this.itemData.itemExtra.icon).width;
    const iconHeight = ctx.measureText('W').width;
    
    const largerWidth = Math.max(textWidth, iconWidth);
    const extraWidth = (percent_rect_extra * (largerWidth/100)); 
    const rectangleWidth = largerWidth + extraWidth; 
    
    const rectangleHeight = textHeight + iconHeight;
    const textXAdjust = Math.abs((rectangleWidth - textWidth)/3); 
    const iconXAdjust = Math.abs((iconWidth - rectangleWidth)/2); 

 if(this.itemData.itemExtra.showBg){   
    this.roundRect(
        ctx,
        this.itemData.itemExtra.x.initialValue,
        this.itemData.itemExtra.y.initialValue, 
        rectangleWidth,
        rectangleHeight + (30 * rectangleHeight/100), 
        30,
        this.itemData.itemExtra.bgColor.initialValue,
        true,
        1,
        0,
        0,
        this.itemData.itemExtra.globalAlpha.initialValue
    );
 }//if show round rectangle
    //icon
    ctx.globalAlpha = this.itemData.itemExtra.globalAlpha.initialValue;
    this.text(
        ctx,
        this.itemData.itemExtra.icon, 
        this.itemData.itemExtra.x.initialValue + iconXAdjust + this.itemData.itemExtra.iconErrorX, 
        this.itemData.itemExtra.y.initialValue + this.itemData.itemExtra.iconErrorY, 
        this.itemData.itemExtra.color.initialValue, 
        this.itemData.itemExtra.iconSize.initialValue + 'px Arial',
        0,
        0,
        0,
        'black',
        this.itemData.itemExtra.globalAlpha.initialValue
    );
   
//-------------text
    ctx.globalAlpha = this.itemData.itemExtra.globalAlpha.initialValue;
    this.text(
        ctx,
        this.itemData.itemExtra.text.initialValue, 
        this.itemData.itemExtra.x.initialValue + textXAdjust, 
        this.itemData.itemExtra.y.initialValue + (iconHeight + (20 * iconHeight/100)), 
        this.itemData.itemExtra.color.initialValue, 
        this.itemData.itemExtra.fontSize.initialValue + 'px ' + this.itemData.itemExtra.fontFamily,
        0,0,0,'black',
        this.itemData.itemExtra.globalAlpha.initialValue
    );

    ctx.restore();
}

// Implemented DrawLib methods

roundRect(ctx, x, y, width, height, radius, color = 'black', filled = false, lineWidth = 1, dash = 0, gap = 0, globalAlpha = 1) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();

    ctx.globalAlpha = globalAlpha;
    ctx.lineWidth = lineWidth;

    if (dash === 0 && gap === 0) {
        ctx.setLineDash([]);
    } else {
        ctx.setLineDash([dash, gap]);
    }

    if (filled) {
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    ctx.restore();
}

text(ctx, text, x, y, color = 'black', font = '12px Arial', shadowOffsetX = 0, shadowOffsetY = 0, shadowBlur = 4, shadowColor = 'gray', globalAlpha = 1) {
    ctx.save(); 

    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;

    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = 'top';

    ctx.globalAlpha = globalAlpha;

    ctx.fillText(text, x, y);

    ctx.restore();
}
////////////////////////////////////////////////////

width(){
    return this.itemData.itemExtra.x.initialValue + 30;
 }
 height(){
    return this.itemData.itemExtra.y.initialValue + 30;
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
