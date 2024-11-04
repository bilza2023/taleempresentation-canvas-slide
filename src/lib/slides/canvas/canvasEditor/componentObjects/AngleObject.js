//@ts-nocheck
import ComponentObject from './ComponentObject';
import DraggerHandle from '../handleObject/DraggerHandle';
import AdderHandle from '../handleObject/AdderHandle';
// import ButtonHandle from '../handleObject/ButtonHandle';
import getVal from "../../getVal";

export default class AngleObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
        this.dialogueBox = [
            {
              componentName: 'TrNo',
              title: 'x',
              props: {}
            },
            {
              componentName: 'TrNo',
              title: 'y',
              props: {}
            },
            {
              componentName: 'TrNo',
              title: 'radius',
              props: {}
            },
            {
              componentName: 'TrNo',
              title: 'ticks',
              props: {}
            },
            {
              componentName: 'TrNo',
              title: 'startAngle',
              props: {}
            },
            {
              componentName: 'TrNo',
              title: 'endAngle',
              props: {}
            },
            {
              componentName: 'TrNo',
              title: 'lineWidth',
              props: {}
            },
            {
              componentName: 'TrTf',
              title: 'showOrigin',
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
            },
            // ShadowCommands
            {
              componentName: 'TrNo',
              title: 'shadowOffsetX',
              props: {}
            },
            {
              componentName: 'TrNo',
              title: 'shadowOffsetY',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'shadowBlur',
              props: {}
            },
            {
              componentName: 'TrPropColor',
              title: 'shadowColor',
              props: {}
            }
          ];
          
    }

    loadHandles(){
        
        let widthAdder = new AdderHandle(this.itemData,'startAngle'); 

            widthAdder.color = 'green';
            widthAdder.getX = function(){
                return this.itemData.extra.x - 20;
            }
            widthAdder.getY = function(){
                return this.itemData.extra.y + 15;
            }
            widthAdder.useInitialValue = false;

            this.handleObjects.push(widthAdder);
////////////////////////////////////////////////////////////////////////////
let handle2 = new AdderHandle(this.itemData,'endAngle'); 

handle2.color = 'lime';
handle2.getX = function(){
    return this.itemData.extra.x - 20;
}
handle2.getY = function(){
    return this.itemData.extra.y + 45;
}
handle2.useInitialValue = false;

this.handleObjects.push(handle2);
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
let handle3 = new AdderHandle(this.itemData,'radius'); 

handle3.color = 'orange';
handle3.getX = function(){
    return this.itemData.extra.x - 20;
}
handle3.getY = function(){
    return this.itemData.extra.y + 75;
}
handle3.useInitialValue = false;

this.handleObjects.push(handle3);
////////////////////////////////////////////////////////////////////////////
// let lineHeightOffsetHandle = new AdderHandle(this.itemData,'lineHeightOffset'); 

// lineHeightOffsetHandle.color = '#5f4b89';
// lineHeightOffsetHandle.lookingforX = false;
// lineHeightOffsetHandle.getX = function(){
//     return this.itemData.extra.x.initialValue - 20;
// }
// lineHeightOffsetHandle.getY = function(){
//     return this.itemData.extra.y.initialValue + 75;
// }
// lineHeightOffsetHandle.useInitialValue = false; ///===>

// this.handleObjects.push(lineHeightOffsetHandle);
/////////////////////////////////////////////////////////////////////////////    
//angle symbol x and y are not props
            let draggerHandle = new DraggerHandle(this.itemData); 
            draggerHandle.useInitialValue = false;
            draggerHandle.color = 'brown';
//--every Component-object can have different x and y e.g x1 x0 etc 
            draggerHandle.getX = function(){
                return this.itemData.extra.x -20; // no initialValue
            }

            draggerHandle.getY = function(){
                return  this.itemData.extra.y -10; //no initialValue
            }
            this.handleObjects.push(draggerHandle);    
    }
    draw(ctx,currentTime){ 
      // debugger;
        const startAngle = this.itemData.extra.startAngle * (Math.PI / 180);
        const endAngle = this.itemData.extra.endAngle * (Math.PI / 180);

const x = this.itemData.extra.x; 
const y = this.itemData.extra.y;
const radius = this.itemData.extra.radius; 
const ticks = this.itemData.extra.ticks; 
const color = getVal(currentTime , this.itemData.extra.color);
const lineWidth = this.itemData.extra.lineWidth;
const showOrigin = this.itemData.extra.showOrigin;
/////////////////////////////////////////////////
            ctx.save();
            // Set the color and line width
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
        
            // Draw the circle's circumference
            ctx.beginPath();
            ctx.arc(x, y, radius, startAngle, endAngle);
            ctx.stroke();
        
            // Draw the angle ticks
            const angleStep = (endAngle - startAngle) / (ticks + 1);
            for (let i = 1; i <= ticks; i++) {
                const angle = startAngle + i * angleStep;
                const startX = x + Math.cos(angle) * (radius - 5);
                const startY = y + Math.sin(angle) * (radius - 5);
                const endX = x + Math.cos(angle) * (radius + 10);
                const endY = y + Math.sin(angle) * (radius + 10);
        
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            }
        
            // Draw the origin circle if showOrigin is true
            if (showOrigin) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2); // Very small circle
            ctx.fillStyle = color; // Use the same color as the arc
            ctx.fill();
            }
        
            // Restore the previous drawing state
            ctx.restore();            
    }
    isHit(mouseX, mouseY) {
        const hitMargin = 20;
    
        return (
            mouseX >= this.itemData.extra.x - hitMargin &&
            mouseX <= this.itemData.extra.x + hitMargin &&
            mouseY >= this.itemData.extra.y - hitMargin &&
            mouseY <= this.itemData.extra.y + hitMargin
        );
    }
    
    
}//class
