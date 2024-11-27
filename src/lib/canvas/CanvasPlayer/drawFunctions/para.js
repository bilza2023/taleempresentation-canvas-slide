





export default function para(ctx,item){
    ctx.save();
    
    // Set shadow properties
    ctx.shadowOffsetX = item.itemExtra.shadowOffsetX;
    ctx.shadowOffsetY = item.itemExtra.shadowOffsetY;
    ctx.shadowBlur = item.itemExtra.shadowBlur;
    ctx.shadowColor = item.itemExtra.shadowColor;
  
    ctx.fillStyle = item.itemExtra.color;
    ctx.font = item.itemExtra.fontSize + 'px  ' + item.itemExtra.fontFamily;
  //   ctx.font = item.itemExtra.fontSize.initialValue + 'px Arial';
    ctx.textBaseline = 'top';
  
    ctx.globalAlpha = item.itemExtra.globalAlpha;
  
    const lines = item.itemExtra.text.split('\n'); // Split text into lines based on line breaks
  
    // Loop over each line
    lines.forEach((line, index) => {
      // Calculate y position for each line, adjusting for line height offset
      const lineHeight = parseInt(item.itemExtra.fontSize, 10) + item.itemExtra.lineHeightOffset; // Adjusted line height
      const yPos = item.itemExtra.y + (index * lineHeight);
  
      // Calculate x position for each line, adjusting for xOffset
      const xPos = item.itemExtra.x + (index * item.itemExtra.xOffset);
  
      // Call the text method for each line with adjusted positions
      ctx.fillText(line, xPos, yPos);
    });
    ///////////////////////////////////////////////////
  // debugger;
// this._width =  ctx.measureText(text).width;       
// this._height =  ctx.measureText('W').width;       
///////////////////////////////////////////////////
    // Restore the context state
    ctx.restore();
    
}