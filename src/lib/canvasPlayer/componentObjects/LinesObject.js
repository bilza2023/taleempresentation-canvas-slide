//@ts-nocheck
import ComponentObject from './ComponentObject';

export default class LinesObject extends ComponentObject {
    constructor(itemData=null , fnList={}) {
        super(itemData , fnList);
    }

////////////////////////////////////////////////////
// eslint-disable-next-line no-unused-vars
draw(ctx, currentTime) {

    const x = this.itemData.itemExtra.x.initialValue;
    const y = this.itemData.itemExtra.y.initialValue;
    const width = this.itemData.itemExtra.width.initialValue;
    const height = this.itemData.itemExtra.height.initialValue;
    const drawBorder = this.itemData.itemExtra.drawBorder.initialValue;
    const fill = this.itemData.itemExtra.fill.initialValue;
    const color = this.itemData.itemExtra.color.initialValue;
    const fillBg = this.itemData.itemExtra.fillBg.initialValue;
    const bgColor = this.itemData.itemExtra.bgColor.initialValue;
    // const gap = this.itemData.itemExtra.gap.initialValue;
    // const dash = this.itemData.itemExtra.dash.initialValue;
    const lines = this.itemData.itemExtra.lines;

    const percentToPixel = (percent, dimension) => Math.round((percent / 100) * dimension);

    if (!isShapeClosed(lines)) {
        console.error("The shape is not closed. Unable to fill.");
        return;
    }

    ctx.save();

    if (fillBg) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, width, height);
    }

    ctx.beginPath();

    const startX = x + percentToPixel(lines[0].x, width);
    const startY = y + percentToPixel(lines[0].y, height);
    ctx.moveTo(startX, startY);

    for (let i = 1; i < lines.length; i++) {
        const lineX = x + percentToPixel(lines[i].x, width);
        const lineY = y + percentToPixel(lines[i].y, height);
        ctx.lineTo(lineX, lineY);
    }

    ctx.closePath();

    if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
    }

    ctx.strokeStyle = color;
    ctx.stroke();

    if (drawBorder) {
        ctx.strokeStyle = bgColor;
        ctx.lineWidth = 1; // Optional: adjust the border width
        ctx.strokeRect(x, y, width, height);
    }

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
////////////////
function isShapeClosed(lines) {
    if (lines.length < 3) return false;
    
    const firstPoint = lines[0];
    const lastPoint = lines[lines.length - 1];
    
    return (firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y);
}