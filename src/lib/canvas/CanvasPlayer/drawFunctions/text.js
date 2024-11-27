

export default function text(ctx,item){

    if(!item.itemExtra.fontSize){
        item.itemExtra.fontSize =  40;
      }
      if(!item.itemExtra.fontFamily){
        item.itemExtra.fontFamily =  'Arial';
      }
      
        ctx.save();
        const text = item.itemExtra.text;
        const x = item.itemExtra.x;
        const y = item.itemExtra.y;
        // Apply text and shadow properties
        ctx.shadowOffsetX = item.itemExtra.shadowOffsetX || 0;
        ctx.shadowOffsetY = item.itemExtra.shadowOffsetY || 0;
        ctx.shadowBlur = item.itemExtra.shadowBlur || 4;
        ctx.shadowColor = item.itemExtra.shadowColor || 'gray';
        ctx.globalAlpha = item.itemExtra.globalAlpha;
        ctx.fillStyle = item.itemExtra.color;
        ctx.font = item.itemExtra.fontSize + 'px  ' + item.itemExtra.fontFamily;
        ctx.textBaseline = 'top';
      
         ctx.fillText(text, x, y);
      ///////////////////////////////////////////////////
        ctx.restore();
    
}