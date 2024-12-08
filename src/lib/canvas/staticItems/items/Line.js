import  uuid  from '../../../uuid';

// add type in data
// remove item in draw
// change class name
export default class Line {
  
  static data() { 
    return {
      uuid: uuid(),
      type: 'line',
      x1: 100,
      y1: 100,
      x2: 300,
      y2: 300,
      lineWidth: 1,
      color: "red",
      globalAlpha: 1
    };
  }

  
  static draw(ctx, itemExtra) {
    // Save the current context state
    ctx.save();
    // Extract values
    const x1 = itemExtra.x1;
    const y1 = itemExtra.y1;
    const x2 = itemExtra.x2;
    const y2 = itemExtra.y2;
    const color = itemExtra.color || 'black';
    const lineWidth = itemExtra.lineWidth || 1;
    const dash = itemExtra.dash || 0;
    const gap = itemExtra.gap || 0;
    const globalAlpha = itemExtra.globalAlpha || 1;

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
}