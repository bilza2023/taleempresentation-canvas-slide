import  uuid  from '../../../uuid';

export default class TextObject {
  
  static data() { 

    return {
      uuid: uuid(),
      text: "Add text..",
      x: 100,
      y: 100,
      command: 'text',
      fontSize: 30,
      fontFamily: "Arial",
      font: "30px Arial",
      color: "black",
      globalAlpha: 1
    };
  }

  
  static draw(ctx, itemExtra) {
    // Ensure fontSize and fontFamily have default values
    if (!itemExtra.fontSize) {
      itemExtra.fontSize = 40;
    }
    if (!itemExtra.fontFamily) {
      itemExtra.fontFamily = 'Arial';
    }
    
    ctx.save();
    
    // Extract text properties
    const text = itemExtra.text;
    const x = itemExtra.x;
    const y = itemExtra.y;
    
    // Apply shadow properties with defaults
    ctx.shadowOffsetX = itemExtra.shadowOffsetX || 0;
    ctx.shadowOffsetY = itemExtra.shadowOffsetY || 0;
    ctx.shadowBlur = itemExtra.shadowBlur || 4;
    ctx.shadowColor = itemExtra.shadowColor || 'gray';
    
    // Set text rendering properties
    ctx.globalAlpha = itemExtra.globalAlpha;
    ctx.fillStyle = itemExtra.color;
    ctx.font = `${itemExtra.fontSize}px ${itemExtra.fontFamily}`;
    ctx.textBaseline = 'top';
  
    // Draw the text
    ctx.fillText(text, x, y);
    
    ctx.restore();
  }
  
}