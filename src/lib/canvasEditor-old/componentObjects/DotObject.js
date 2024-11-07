//@ts-nocheck
import ComponentObject from './ComponentObject';
import DraggerHandle from '../handleObject/DraggerHandle';
import AdderHandle from '../handleObject/AdderHandle';
import ButtonHandle from '../handleObject/ButtonHandle';
import getVal from "../../getVal";

export default class DotObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
        this.dialogueBox = [
            {
              componentName: 'TrPropNumber',
              title: 'x',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'y',
              props: {}
            },
            {
              componentName: 'TrPropText',
              title: 'label',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'dot_width',
              props: {}
            },
            {
              componentName: 'TrPropColor',
              title: 'text_color',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'text_size',
              props: {}
            },
            // CommonCommands
            {
              componentName: 'TrText',
              title: 'name',
              props: {}
            },
            {
              componentName: 'TrPropColor',
              title: 'color',
              props: {}
            },
            {
              componentName: 'TrNo',
              title: 'showAt',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'globalAlpha',
              props: {
                min: '0.0',
                max: '1.0',
                step: '0.1'
              }
            }
          ];
          
    }

    loadHandles(){
////////////////////////////////////////////////////////////////////////////
let btnHandle = new ButtonHandle(this.itemData,this.fnList); 

btnHandle.getX = function(){
    return this.itemData.extra.x.initialValue ;
}
btnHandle.getY = function(){
    return this.itemData.extra.y.initialValue + 25;
}
btnHandle.useInitialValue = true;

this.handleObjects.push(btnHandle);  

/////////////////////////////////////////////////////////////////////////////          
////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////    
            //    debugger;
            let draggerHandle = new DraggerHandle(this.itemData); 
//--every Component-object can have different x and y e.g x1 x0 etc 
            draggerHandle.getX = function(){
                return this.itemData.extra.x.initialValue -15;
            }

            draggerHandle.getY = function(){
                return  this.itemData.extra.y.initialValue -10;
            }
            this.handleObjects.push(draggerHandle);    
    }
////////////////////////////////////////////////////////////
draw(ctx, currentTime) {
  const {
      x,
      y,
      label,
      dot_width,
      text_size,
      color,
      text_color,
      globalAlpha
  } = this.itemData.extra;

  ctx.save();
  ctx.globalAlpha = getVal(currentTime, globalAlpha);

  // Draw the dot
  ctx.beginPath();
  ctx.arc(
      getVal(currentTime, x),
      getVal(currentTime, y),
      getVal(currentTime, dot_width) / 2,
      0,
      2 * Math.PI
  );
  ctx.fillStyle = getVal(currentTime, color);
  ctx.fill();

  // Draw the label
  ctx.font = `${getVal(currentTime, text_size)}px Arial`;
  ctx.fillStyle = getVal(currentTime, text_color);
  ctx.fillText(
      getVal(currentTime, label),
      parseInt(getVal(currentTime, x)) - parseInt(getVal(currentTime, dot_width) / 2),
      parseInt(getVal(currentTime, y)) + parseInt(getVal(currentTime, dot_width) * 2)
  );

  ctx.restore();
}
////////////////////////////////////////////////////

width(){
    return this.itemData.extra.x.initialValue + (this.itemData.extra.dot_width.initialValue *  1.5);
 }
 height(){
    return this.itemData.extra.x.initialValue + (this.itemData.extra.dot_width.initialValue *  1.5);
 }
 getX(){
    return this.itemData.extra.x.initialValue;
 }
 
 getY(){
    return this.itemData.extra.y.initialValue;
 }


 getHitAreaRadius() {
    // Base the hit area radius on font size and text length
    const baseRadius = 20;
    const textLength = 10;
    return baseRadius + (textLength * 2); // Adjust this formula as needed
}

isHit(mouseX, mouseY) {
    const centerX = this.getX();
    const centerY = this.getY();
    const radius = this.getHitAreaRadius();

    // Calculate the distance between the mouse click and the text origin
    const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );

    // Check if the distance is less than or equal to the hit area radius
    return distance <= radius;
}

 
////////////////////////////////////////////////////////////
    
}//class
