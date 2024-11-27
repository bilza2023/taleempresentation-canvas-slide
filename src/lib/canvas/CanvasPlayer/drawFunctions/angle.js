

export default function angle(ctx,item){
    
    const startAngle = item.itemExtra.startAngle * (Math.PI / 180);
    const endAngle = item.itemExtra.endAngle * (Math.PI / 180);
    const x = item.itemExtra.x;
    const y = item.itemExtra.y;
    const radius = item.itemExtra.radius;
    const ticks = item.itemExtra.ticks;
    const color = item.itemExtra.color;
    const lineWidth = item.itemExtra.lineWidth;
    const showOrigin = item.itemExtra.showOrigin;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    // Draw the arc
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
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    ctx.restore();
    
}