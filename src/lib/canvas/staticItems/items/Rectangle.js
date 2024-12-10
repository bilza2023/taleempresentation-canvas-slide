import  uuid  from '../../../uuid';


export default class Rectangle {
  
  static data() { 
    return {
      uuid: uuid(),
      type: 'rectangle',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      filled: true,
      lineWidth: 1,
      dash: 0,
      gap: 0,
      color: "red",
      globalAlpha: 1
    };
  }

  
  static draw(ctx, itemExtra) {
    ctx.save();
    // debugger;
      // Extract values
      const x = itemExtra.x;
      const y = itemExtra.y;
      const width = itemExtra.width;
      const height = itemExtra.height;
      const color =  itemExtra.color ?? 'white';
      const filled = itemExtra.filled;
      const dash =   itemExtra.dash ?? 0;
      const gap =    itemExtra.gap ?? 0;
      const lineWidth =  itemExtra.lineWidth ?? 1;
      const globalAlpha =  itemExtra.globalAlpha ?? 1;
    
      // Set properties
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = globalAlpha;
    
      // Set line dash pattern
      if (dash === 0 && gap === 0) {
          ctx.setLineDash([]);
      } else {
          ctx.setLineDash([dash, gap]);
      }
      
      if (filled) {
          ctx.fillStyle = color;
          ctx.fillRect(x, y, width, height);
      } else {
          ctx.strokeStyle = color;
          ctx.strokeRect(x, y, width, height);
      }
    
      // Restore the context state
      ctx.restore();
  }
}