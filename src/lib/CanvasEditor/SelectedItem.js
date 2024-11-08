import EditButton from "./EditButton";
import getMouseData from "./getMouseData";

export default class SelectedItem{

constructor(itemObject){
    this.itemObject = itemObject;
    
    this.moveXbutton = new EditButton(itemObject,'moveX');

    this.handleWidth = 15;
    this.handleHeight = 15;
    this.handleColor ='red';
    this.isDrag = false;
    this.selectedHandle = null;

}

drawHandles(ctx){
  // Draw toolbar buttons
  this.moveXbutton.drawButton(ctx,'yellow','yellow');
      
}

mouseMove(e, ctx) {
  const {x,y} = getMouseData(e);
  if (this.selectedHandle == null) return;
  if (this.selectedHandle == "moveXY"){
    this.itemObject.itemData.itemExtra.x.initialValue = (x);
    this.itemObject.itemData.itemExtra.y.initialValue = (y);
  }
 
}

mouseUp(){
  this.selectedHandle = null;
  this.isDrag = false;
}

isHit(x,y){

  const isMoveXhit = this.moveXbutton.isHit(x,y);

  if(isMoveXhit){
    this.selectedHandle = "moveXY";
    return "moveXY";
  }
 

}
}