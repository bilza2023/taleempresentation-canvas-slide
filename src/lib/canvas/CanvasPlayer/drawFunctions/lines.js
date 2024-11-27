




export default function lines(ctx,item){
// debugger;
    const x = item.itemExtra.x;
    const y = item.itemExtra.y;
    const width = item.itemExtra.width;
    const height = item.itemExtra.height;
    const drawBorder = item.itemExtra.drawBorder;
    const fill = item.itemExtra.fill;
    const color = item.itemExtra.color;
    const fillBg = item.itemExtra.fillBg;
    const bgColor = item.itemExtra.bgColor;
    // const gap = item.itemExtra.gap;
    // const dash = item.itemExtra.dash;
    const lines = item.itemExtra.lines;

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


function isShapeClosed(lines) {
    if (lines.length < 3) return false;
    
    const firstPoint = lines[0];
    const lastPoint = lines[lines.length - 1];
    
    return (firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y);
}