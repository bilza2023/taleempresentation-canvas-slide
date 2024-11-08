

export default class EditButton {

constructor(itemObject,name='moveX'){

    this.itemObject = itemObject;
    this.name = name;
    this.icons = '🚁';
    this.flag = "";
    this.bgColor = '#374151';
    this.bgWidth = 30;
    this.textYoffset = 5;
    this.textOffset = 0;
    this.buttonSize = 15;

}

drawButton(ctx) {
    // Draw the button
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'yellow';
    ctx.fillRect( this.itemObject.getX() , this.itemObject.getY() , this.buttonSize , this.buttonSize );
}
    
isHit(x, y) {

    return (
      x >= this.itemObject.getX()  &&
      x <= this.itemObject.getX()  + this.buttonSize &&
      y >= this.itemObject.getY()  &&
      y <= this.itemObject.getY()  + this.buttonSize
    );
}

  





}

