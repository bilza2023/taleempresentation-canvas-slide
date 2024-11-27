


export default function triangle(ctx,item){
    ctx.save();
    
    // Extract values
    const x1 = item.itemExtra.x1;
    const y1 = item.itemExtra.y1;
    const x2 = item.itemExtra.x2;
    const y2 = item.itemExtra.y2;
    const x3 = item.itemExtra.x3;
    const y3 = item.itemExtra.y3;
    const color = item.itemExtra.color || 'black';
    const filled = item.itemExtra.filled || true;
    const lineWidth = item.itemExtra.lineWidth || 2;
    const dash = item.itemExtra.dash || 0;
    const gap = item.itemExtra.gap || 0;
    const globalAlpha = item.itemExtra.globalAlpha || 1;

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