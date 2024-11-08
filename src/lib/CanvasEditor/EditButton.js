

export default class EditButton {

constructor(itemObject){

    this.itemObject = itemObject;

    this.flag = "";

    this.offsetX = 0;
    this.offsetY = 0;

    this.color = 'yellow';
    this.buttonSize = 15;

}
getX(){
    return this.itemObject.getX() + this.offsetX;
}
getY(){
    return this.itemObject.getY() + this.offsetY;
}
drawButton(ctx) {
    // Draw the button
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.color;
    ctx.fillRect( this.getX() , this.getY() , this.buttonSize , this.buttonSize );
}
    
isHit(x, y) {

    return (
      x >= this.getX()  &&
      x <= this.getX()  + this.buttonSize &&
      y >= this.getY()  &&
      y <= this.getY()  + this.buttonSize
    );
}

  





}

