import EditButton from "./EditButton";
import getMouseData from "./getMouseData";

export default class SelectedItem{

constructor(itemObject){

    this.itemObject = itemObject;

    this.handleWidth = 15;
    this.handleHeight = 15;
    this.handleColor ='red';
    this.isDrag = false;
    this.selectedHandle = null;

    this.clone = ()=>{};

    //moveXYbutton
    this.moveXYbutton = new EditButton(itemObject);
    this.moveXYbutton.icon = '🧷';
    
    //scaleXButton
    this.scaleXButton = new EditButton(itemObject);
    this.scaleXButton.color = 'blue';
    this.scaleXButton.offsetX  = -15;  
    this.scaleXButton.icon = '🛶';
    
    //scaleYButton
    this.scaleYButton = new EditButton(itemObject);
    this.scaleYButton.color = 'green';
    this.scaleYButton.offsetX  = -15;  
    this.scaleYButton.offsetY  = +15;  
    this.scaleYButton.icon = '🐪';
    
    
    //cloneButton
    this.cloneButton = new EditButton(itemObject);
    this.cloneButton.color = 'pink';
    this.cloneButton.offsetX  = -15;  
    this.cloneButton.offsetY  = +30;  
    this.cloneButton.icon = '🐑';
    
    //copyButton
    this.copyButton = new EditButton(itemObject);
    this.copyButton.color = 'brown';
    this.copyButton.offsetX  = -15;  
    this.copyButton.offsetY  = +45;  
    this.copyButton.icon = '📋';
    
    //deleteButton
    this.deleteButton = new EditButton(itemObject);
    this.deleteButton.color = 'red';
    this.deleteButton.offsetX  = -15;  
    this.deleteButton.offsetY  = +60;  
    this.deleteButton.icon = '🗑️';


}

drawHandles(ctx){
  // Draw toolbar buttons
  this.moveXYbutton.drawButton(ctx);
  this.scaleXButton.drawButton(ctx);
  this.scaleYButton.drawButton(ctx);
  this.cloneButton.drawButton (ctx);
  this.copyButton.drawButton (ctx);
  this.deleteButton.drawButton (ctx);
      
}

// eslint-disable-next-line no-unused-vars
mouseMove(e, ctx) {
  const {x,y} = getMouseData(e);

  if (this.selectedHandle == null) return;

  if (this.selectedHandle == "moveXY"){
    this.itemObject.itemData.itemExtra.x.initialValue = (x);
    this.itemObject.itemData.itemExtra.y.initialValue = (y);
  }

if (this.selectedHandle === "scaleX") {
  this.itemObject.itemData.itemExtra.width.initialValue +=5;
}
if (this.selectedHandle === "scaleY") {
  this.itemObject.itemData.itemExtra.height.initialValue +=5;
}
if (this.selectedHandle === "clone") {
    // Handle cloning
}
if (this.selectedHandle === "copy") {
    // Handle copying
}
if (this.selectedHandle === "delete") {
    // Handle deletion
}
 
}

mouseUp(){
  this.selectedHandle = null;
  this.isDrag = false;
}

isHit(x, y) {
  // debugger;
  // Check moveXY button
  const isMoveXYhit = this.moveXYbutton.isHit(x, y);
  if (isMoveXYhit) {
      this.selectedHandle = "moveXY";
      return "moveXY";
  }

  // Check scaleX button
  const isScaleXhit = this.scaleXButton.isHit(x, y);
  if (isScaleXhit) {
      this.selectedHandle = "scaleX";
      return "scaleX";
  }

  // Check scaleY button
  const isScaleYhit = this.scaleYButton.isHit(x, y);
  if (isScaleYhit) {
      this.selectedHandle = "scaleY";
      return "scaleY";
  }

  // Check clone button
  const isClonehit = this.cloneButton.isHit(x, y);
  if (isClonehit) {
      this.selectedHandle = "clone";
      this.clone();
      return "clone";
  }

  // Check copy button
  const isCopyhit = this.copyButton.isHit(x, y);
  if (isCopyhit) {
      this.selectedHandle = "copy";
      return "copy";
  }

  // Check delete button
  const isDeletehit = this.deleteButton.isHit(x, y);
  if (isDeletehit) {
      this.selectedHandle = "delete";
      return "delete";
  }

  // If no button was hit, return null
  return null;
}


}