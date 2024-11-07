//@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../getVal";

export default class SpriteObject extends ComponentObject {
    constructor(itemData , fnList , spriteImgArray) {
        super(itemData , fnList);
        this.spriteImgArray = spriteImgArray;
    }

    draw(ctx, currentTime) { 
      // debugger;
        try {
            let sprite;
            for (let i = 0; i < this.spriteImgArray.length; i++) {
                const element = this.spriteImgArray[i];
                if(element.name == this.itemData.itemExtra.sheet) {
                    sprite = element;
                    break;
                }
            }
            if(!sprite) { throw Error("Sprite not found"); }  
            
/////////////////////////////////////////////////////////////////                                      
            sprite.applyItem(this.itemData.itemExtra.sheetItem);
            if (!sprite.selectedData) { console.warn("sheetItem not found"); return; }

            this.itemData.itemExtra.x = getVal(currentTime , this.itemData.itemExtra.dx);
            this.itemData.itemExtra.y = getVal(currentTime , this.itemData.itemExtra.dy);

            // drawLib.sprite(sprite, this.itemData.itemExtra);
            ctx.drawImage(sprite.img,
              sprite.selectedData.sx, //x on source image
              sprite.selectedData.sy, //y on source image
              sprite.selectedData.sw, //width on source image
              sprite.selectedData.sh, //height on source image
              this.itemData.itemExtra.x,//x on destination image
              this.itemData.itemExtra.y,//y on destination image
              sprite.selectedData.sw * Math.abs(this.itemData.itemExtra.wFactor), //width on source image
              sprite.selectedData.sh * Math.abs(this.itemData.itemExtra.hFactor) //height on source image
          );
        } catch (error) {
            console.error(error);
        }
    }

    getX() {
        return this.itemData.itemExtra.x.initialValue;
    }

    getY() {
        return this.itemData.itemExtra.y.initialValue;
    }

    isHit(mouseX, mouseY) {
        const hitMargin = 40;

        return (
            mouseX >= this.itemData.itemExtra.dx.initialValue - hitMargin &&
            mouseX <= this.itemData.itemExtra.dx.initialValue + hitMargin &&
            mouseY >= this.itemData.itemExtra.dy.initialValue - hitMargin &&
            mouseY <= this.itemData.itemExtra.dy.initialValue + hitMargin
        );
    }
} // class
