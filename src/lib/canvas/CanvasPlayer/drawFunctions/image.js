




export default function image(ctx,item){
   // debugger;
   if (!item.itemExtra.image  || item.itemExtra.image == null) {return;} 
   
   ctx.save(); // Save the current context state
   ctx.globalAlpha =   item.itemExtra.globalAlpha; // Set the global alpha
   ctx.drawImage(item.itemExtra.image, item.itemExtra.x, item.itemExtra.y, item.itemExtra.width, item.itemExtra.height);
   ctx.restore();     
    
}