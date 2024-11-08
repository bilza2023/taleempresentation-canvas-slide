here is a button object which draw button on canvas 
Write me isHit(x,y) method.. the x and y are mouse clicks.. we want to find out if the button was clicked.
This is the button to check
    // Draw the button
    ctx.globalAlpha = 1;
    ctx.fillStyle = buttonColor;
    ctx.fillRect( btnX , btnY , this.buttonSize , this.buttonSize );

/////////////////////////////
export default class EditButton{

constructor(itemObject){

    this.itemObject = itemObject;
    this.flag = "";
    this.bgColor = '#374151';
    this.bgWidth = 30;
    this.textYoffset = 5;
    this.buttonSize = 15;
}

drawButton(ctx, textColor = 'red', buttonColor = 'blue') {

    const bgX = this.itemObject.getX() - this.bgWidth;
    const bgY = this.itemObject.getY();
    
    const btnX = this.itemObject.getX() - this.bgWidth;
    const btnY = this.itemObject.getY() ;

    const textX = this.itemObject.getX()-this.bgWidth;
    const textY = this.itemObject.getY() + this.buttonSize + 5;
    
    // Draw the background rectangle
    ctx.fillStyle = this.bgColor;
    ctx.globalAlpha = 0.5;
    ctx.fillRect(bgX , bgY, this.bgWidth, this.bgWidth);
    
    // Draw the button
    ctx.globalAlpha = 1;
    ctx.fillStyle = buttonColor;
    ctx.fillRect( btnX , btnY , this.buttonSize , this.buttonSize );
  
    // Draw the text
    ctx.fillStyle = textColor;
    ctx.fillText('moveX',  textX , textY + this.textYoffset);
}
    
isHit(x,y){

}

}