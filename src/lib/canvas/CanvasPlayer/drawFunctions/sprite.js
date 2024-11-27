




export default function sprite(ctx,item ,assets){
   
    try {
        let sprite;
        for (let i = 0; i < assets.spriteImages.length; i++) {
            const element = assets.spriteImages[i];
            if(element.name == item.itemExtra.sheet) {
                sprite = element;
                break;
            }
        }
        if(!sprite) { throw Error("Sprite not found"); }  
        
/////////////////////////////////////////////////////////////////                                      
        sprite.applyItem(item.itemExtra.sheetItem);
        if (!sprite.selectedData) { console.warn("sheetItem not found"); return; }

   
        ctx.drawImage(sprite.img,
          sprite.selectedData.sx, //x on source image
          sprite.selectedData.sy, //y on source image
          sprite.selectedData.sw, //width on source image
          sprite.selectedData.sh, //height on source image
          item.itemExtra.x,//x on destination image
          item.itemExtra.y,//y on destination image
          sprite.selectedData.sw * Math.abs(item.itemExtra.width), //width on source image
          sprite.selectedData.sh * Math.abs(item.itemExtra.height) //height on source image
      );
    } catch (error) {
        console.error(error);
    }
}