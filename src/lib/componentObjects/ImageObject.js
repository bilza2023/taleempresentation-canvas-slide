//@ts-nocheck
import ComponentObject from './ComponentObject';
import getVal from "../getVal";

export default class ImageObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
        if (this.itemData.itemExtra.src ==null || this.itemData.itemExtra.image == null){
            this.itemData.itemExtra.src = '/system_images/gen/wood.jpg'; 
        }
        this.loadImage();        
    }
    loadImage() {
        const img = new Image();
        img.src = this.itemData.itemExtra.src;
    
        img.onload = () => {
            this.itemData.itemExtra.image = img;
        };
    
        img.onerror = () => {
            console.error(`Image failed to load: ${this.itemData.itemExtra.src}`);
        };
    }

///////////////////////////////////////////////////
draw(ctx,currentTime){ 
    // debugger;
    if (!this.itemData.itemExtra.image  || this.itemData.itemExtra.image == null) {return;} 
   
   ctx.save(); // Save the current context state
   ctx.globalAlpha =     getVal(currentTime , this.itemData.itemExtra.globalAlpha); // Set the global alpha
   ctx.drawImage(this.itemData.itemExtra.image, this.itemData.itemExtra.x, this.itemData.itemExtra.y, this.itemData.itemExtra.width, this.itemData.itemExtra.height);
   ctx.restore();     
}
////////////////////////////////////////////////////

width(){
    return this.itemData.itemExtra.width;
 }
 height(){
    return this.itemData.itemExtra.height;
 }
 getX(){
    return this.itemData.itemExtra.x;
 }
 
 getY(){
    return this.itemData.itemExtra.y;
 }

 isHit(mouseX , mouseY){

    return (
        mouseX  >= this.getX() &&
        mouseX  <= this.getX() + this.width() &&
        mouseY  >= this.getY() &&
        mouseY  <= this.getY() + this.height()
    );

}
///////////////////////////////////////////////////
    
}//class
