




export default function ray(ctx,item){
        // Save the current context state
        ctx.save();
        
        // Extract values
        const {x0, y0, x1, y1, lineWidth = 2, arrowWidth = 8, arrowHeight = 12, 
               startArrow = true, endArrow = true, color = 'black', 
               dash = 0, gap = 0, globalAlpha = 1} = item.itemExtra;

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
            drawArrowHead(ctx, x1, y1, x0, y0, arrowWidth, arrowHeight);
        }

        // Draw end arrow if requested
        if (endArrow) {
            drawArrowHead(ctx, x0, y0, x1, y1, arrowWidth, arrowHeight);
        }

        // Restore the context state
        ctx.restore();
    
}


function drawArrowHead(ctx, x1, y1, x2, y2, arrowWidth, arrowHeight) {
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