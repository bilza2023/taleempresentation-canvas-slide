




export default function line (ctx,item){
    // Save the current context state
    ctx.save();
    // Extract values
    const x1 = item.itemExtra.x1;
    const y1 = item.itemExtra.y1;
    const x2 = item.itemExtra.x2;
    const y2 = item.itemExtra.y2;
    const color = item.itemExtra.color || 'black';
    const lineWidth = item.itemExtra.lineWidth || 1;
    const dash = item.itemExtra.dash || 0;
    const gap = item.itemExtra.gap || 0;
    const globalAlpha = item.itemExtra.globalAlpha || 1;

    // Set properties
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.globalAlpha = globalAlpha;

    // Set line dash pattern
    if (dash === 0 && gap === 0) {
        ctx.setLineDash([]);
    } else {
        ctx.setLineDash([dash, gap]);
    }

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Restore the context state
    ctx.restore();
    
    
}