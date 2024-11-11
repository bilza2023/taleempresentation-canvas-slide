//@ts-nocheck
import ItemObject from './ItemObject';

// import { ctxStore } from '../store';
// import { get } from 'svelte/store';


export default class TextObject extends ItemObject {
    constructor(itemData , fnList) {
      super(itemData , fnList); 
      this._width =  50;       
      this._height =  25;       
    }

draw(ctx) {

  if(!this.itemData.itemExtra.fontSize){
  this.itemData.itemExtra.fontSize =  40;
}
if(!this.itemData.itemExtra.fontFamily){
  this.itemData.itemExtra.fontFamily =  'Arial';
}


  // Save context state
  ctx.save();

  const text = this.itemData.itemExtra.text;
  const x = this.itemData.itemExtra.x;
  const y = this.itemData.itemExtra.y;
  // Apply text and shadow properties
  ctx.shadowOffsetX = this.itemData.itemExtra.shadowOffsetX || 0;
  ctx.shadowOffsetY = this.itemData.itemExtra.shadowOffsetY || 0;
  ctx.shadowBlur = this.itemData.itemExtra.shadowBlur || 4;
  ctx.shadowColor = this.itemData.itemExtra.shadowColor || 'gray';
  ctx.globalAlpha = this.itemData.itemExtra.globalAlpha;
  ctx.fillStyle = this.itemData.itemExtra.color;
  ctx.font = this.itemData.itemExtra.fontSize + 'px  ' + this.itemData.itemExtra.fontFamily;
  ctx.textBaseline = 'top';

   // Draw the text
   ctx.fillText(text, x, y);
  ///////////////////////////////////////////////////
    // debugger;
this._width =  ctx.measureText(text).width;       
this._height =  ctx.measureText('W').width;       
///////////////////////////////////////////////////
  ctx.restore();
}

////////////////////////////////////////////////////
  boundingRectangleX() {
      return this.itemData.itemExtra.x;
  }
  boundingRectangleY() {
      return this.itemData.itemExtra.y;
  }
  get width() {
    return this._width;
  }
  set width(newWidth) {
      this.itemData.itemExtra.fontSize = newWidth;
  }
  get height() {
    return this._height;
  }
  set height(newHeight) {
      this.itemData.itemExtra.fontSize = newHeight;
  }
    
    ////////////////////////////////////////////////////

    
}//class
