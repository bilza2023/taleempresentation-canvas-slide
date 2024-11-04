//@ts-nocheck
import ComponentObject from './ComponentObject';
import DraggerHandle from '../handleObject/DraggerHandle';
import AdderHandle from '../handleObject/AdderHandle';
import ButtonHandle from '../handleObject/ButtonHandle';
import getVal from "../../getVal";

export default class ImageObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
        if (this.itemData.extra.src ==null || this.itemData.extra.image == null){
            this.itemData.extra.src = '/system_images/gen/wood.jpg'; 
        }
        this.loadImage();        
        this.dialogueBox = [
            {
                componentName: 'TrText',
                title: 'src',
                props: {}
            },
            {
                componentName: 'TrText', // Representing the button for extension type
                title: 'ext',
                props: {
                    options: ['jpg', 'png'], // Custom handling for the buttons
                    current: 'jpg' // Current selected ext
                }
            },
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
                title: 'width',
                props: {}
            },
            {
                componentName: 'TrNo',
                title: 'height',
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
            // gap-dash
            {
                componentName: 'TrPropNumber',
                title: 'dash',
                props: {}
            },
            {
                componentName: 'TrPropNumber',
                title: 'gap',
                props: {}
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
                componentName: 'TrNo',
                title: 'shadowBlur',
                props: {}
            },
            {
                componentName: 'TrColor',
                title: 'shadowColor',
                props: {}
            }
        ];
        
    }
    loadImage() {
        const img = new Image();
        img.src = this.itemData.extra.src;
    
        img.onload = () => {
            this.itemData.extra.image = img;
        };
    
        img.onerror = () => {
            console.error(`Image failed to load: ${this.itemData.extra.src}`);
        };
    }
    // loadImage() {
    //     const img = new Image();
    //     img.src = '/system_images/gen/wood.jpg';
    
    //     img.onload = () => {
    //       this.itemData.extra.image = img;
    //     };
    
    //     img.onerror = () => {
    //       console.error('Image failed to load');
    //     };
    //   }
    loadHandles(){
////////////////////////////////////////////////////////////////////////
let btnHandle = new ButtonHandle(this.itemData,this.fnList); 

            btnHandle.getX = function(){
                return this.itemData.extra.x - 20;
            }
            btnHandle.getY = function(){
                return this.itemData.extra.y + 25;
            }
            btnHandle.useInitialValue = false;

            this.handleObjects.push(btnHandle);        
////////////////////////////////////////////////////////////////////////                
        let widthAdder = new AdderHandle(this.itemData,'width'); 
        widthAdder.color = 'silver';    
        // no initialValue
            widthAdder.getX = function(){
                return this.itemData.extra.x + this.itemData.extra.width ;
            }
            widthAdder.getY = function(){
                return this.itemData.extra.y;
            }
            widthAdder.useInitialValue = false;

            this.handleObjects.push(widthAdder);
////////////////////////////////////////////////////////////////////////////

            let heightAdder = new AdderHandle(this.itemData,'height'); 
            heightAdder.color = 'silver'; 
            heightAdder.getX = function(){
                return this.itemData.extra.x +  this.itemData.extra.width;
            }
            heightAdder.getY = function(){
                return this.itemData.extra.y  + this.itemData.extra.height -20;
            }
            heightAdder.useInitialValue = false;
            heightAdder.lookingforX = false;

            this.handleObjects.push(heightAdder);
/////////////////////////////////////////////////////////////////////////////    
            //    debugger;
            let draggerHandle = new DraggerHandle(this.itemData); 
            draggerHandle.useInitialValue = false;
            draggerHandle.color = 'silver'; 
//--every Component-object can have different x and y e.g x1 x0 etc 
            draggerHandle.getX = function(){
                return this.itemData.extra.x -20;
            }

            draggerHandle.getY = function(){
                return  this.itemData.extra.y;
            }
            this.handleObjects.push(draggerHandle);    
    }
///////////////////////////////////////////////////
draw(ctx,currentTime){ 
    // debugger;
    if (!this.itemData.extra.image  || this.itemData.extra.image == null) {return;} 
   
   ctx.save(); // Save the current context state
   ctx.globalAlpha =     getVal(currentTime , this.itemData.extra.globalAlpha); // Set the global alpha
   ctx.drawImage(this.itemData.extra.image, this.itemData.extra.x, this.itemData.extra.y, this.itemData.extra.width, this.itemData.extra.height);
   ctx.restore();     
}
////////////////////////////////////////////////////

width(){
    return this.itemData.extra.width;
 }
 height(){
    return this.itemData.extra.height;
 }
 getX(){
    return this.itemData.extra.x;
 }
 
 getY(){
    return this.itemData.extra.y;
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
