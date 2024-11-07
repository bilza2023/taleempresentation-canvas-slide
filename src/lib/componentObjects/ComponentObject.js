//@ts-nocheck

export default class ComponentObject {
   constructor(itemData) {
       this.itemData = itemData;
   }
   isVisible(currentTime) {
       if (!this.itemData.itemExtra.showAt) {
           return true;
       } else {
           return currentTime >= this.itemData.itemExtra.showAt;
       }
   }

   draw(ctx , currentTime=0){
      console.log("ComponentObject draw");
   }

   width() {
       return this.itemData.itemExtra.width.initialValue;
   }

   height() {
       return this.itemData.itemExtra.height.initialValue;
   }

   getX() {
       return this.itemData.itemExtra.x.initialValue;
   }

   getY() {
       return this.itemData.itemExtra.y.initialValue;
   }

   isHit(mouseX, mouseY) {
       return (
           mouseX >= this.getX() &&
           mouseX <= this.getX() + this.width() &&
           mouseY >= this.getY() &&
           mouseY <= this.getY() + this.height()
       );
   }
//////////////////////////////////////////////////////////////////////
 
   get command() {
     return this.itemData.itemExtra.command;
   }
   set command(value) {
     this.itemData.itemExtra.command = value;
   }
 
   // Getter and setter for 'name' property
   get name() {
     return this.itemData.itemExtra.name;
   }
   set name(value) {
     this.itemData.itemExtra.name = value;
   }
 
   // Getter and setter for 'color' property
   get color() {
     return this.itemData.itemExtra.color;
   }
   set color(value) {
     this.itemData.itemExtra.color = value;
   }
 
   // Getter and setter for 'showAt' property
   get showAt() {
     return this.itemData.itemExtra.showAt;
   }
   set showAt(value) {
     this.itemData.itemExtra.showAt = value;
   }
 
   // Getter and setter for 'globalAlpha' property
   get globalAlpha() {
     return this.itemData.itemExtra.globalAlpha;
   }
   set globalAlpha(value) {
     this.itemData.itemExtra.globalAlpha = value;
   }
 
   // Getter and setter for 'gap' property
   get gap() {
     return this.itemData.itemExtra.gap;
   }
   set gap(value) {
     this.itemData.itemExtra.gap = value;
   }
 
   // Getter and setter for 'dash' property
   get dash() {
     return this.itemData.itemExtra.dash;
   }
   set dash(value) {
     this.itemData.itemExtra.dash = value;
   }
 
   // Getter and setter for 'shadowOffsetX' property
   get shadowOffsetX() {
     return this.itemData.itemExtra.shadowOffsetX;
   }
   set shadowOffsetX(value) {
     this.itemData.itemExtra.shadowOffsetX = value;
   }
 
   // Getter and setter for 'shadowOffsetY' property
   get shadowOffsetY() {
     return this.itemData.itemExtra.shadowOffsetY;
   }
   set shadowOffsetY(value) {
     this.itemData.itemExtra.shadowOffsetY = value;
   }
 
   // Getter and setter for 'shadowColor' property
   get shadowColor() {
     return this.itemData.itemExtra.shadowColor;
   }
   set shadowColor(value) {
     this.itemData.itemExtra.shadowColor = value;
   }
 
   // Getter and setter for 'shadowBlur' property
   get shadowBlur() {
     return this.itemData.itemExtra.shadowBlur;
   }
   set shadowBlur(value) {
     this.itemData.itemExtra.shadowBlur = value;
   }   
//////////////////////////////////////////////////////////////////////   
}