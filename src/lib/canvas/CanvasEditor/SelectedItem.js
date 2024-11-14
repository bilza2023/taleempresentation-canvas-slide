// SelectedItem.svelte
import Handle from './Handle.js';


export default class SelectedItem {
    constructor(itemObject) {
        
        this.itemObject = itemObject;
        // They are all Handle related stuff. nothing in handle except draw and isHit
        this.handles = [];
        this.selectedHandle = null;
        this.isDrag = false;

        this.startPositionX = 0 ; // this is to store x position when mouse move
        this.startPositionY = 0 ; // this is to store y position when mouse move
        this.initializeHandles();
    }

    initializeHandles() {
        
        const move =  new Handle(
            () => (this.itemObject.boundingRectangleX() + (this.itemObject.width / 2))-10,
            () => (this.itemObject.boundingRectangleY() + (this.itemObject.height / 2))-10,
            
            '✥','green');

        this.handles.push(move);

        // const widthHandle =  new Handle({ 
        //     icon: '✥',
        //     size: 15,
        //     color: 'orange'
        // });
        // this.handles.push(widthHandle);
       
        // const heightHandle =  new Handle({ 
        //     icon: '✥',
        //     size: 15,
        //     color: 'blue'
        // });
        // this.handles.push(heightHandle);
    }

    drawHandles(ctx) {
    
        // Draw selection rectangle
        ctx.save();
        ctx.strokeStyle = '#1a73e8';
        ctx.setLineDash([5, 5]);

        //strokeRect
        ctx.strokeRect(this.itemObject.boundingRectangleX() , this.itemObject.boundingRectangleY(), this.itemObject.width,this.itemObject.height);

        // move handle
        this.handles[0].draw(ctx);    

        ctx.restore();
    }

    mouseDown(x, y) {
        this.isDrag = true; //this is true on mouse-down event when no-hit
        const isMove = this.handles[0].isHit(x,y);
        if(isMove == true) { 
            this.selectedHandle = 'move';
            console.log("selectedHandle==>move");
        }    
    }

    mouseMove(x, y) {

        //   const dx = x - this.startPositionX;
        //   const dy = y - this.startPositionY;

        if(this.isDrag == true && this.selectedHandle == 'move'){
            this.itemObject.x = x;
            this.itemObject.y = y;
        }

        return true;
    }

    mouseUp() {
        this.isDrag = false;
        this.selectedHandle = null;
    }

    isHit(x, y) {
        return this.mouseDown(x, y);
    }
  
}