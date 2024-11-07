This is my SelectedItem object which represents 1 drawable item on a html5 canvas. this also draw Handlers around it for move , rotate , scale etc.

there are 2 problems with this code

1: checkHandleHit : we can get hit on handle 1 and 6 but not on others 
2: mouseMove: i want
    - there should be different edits for number of Handler selected . for example Handle 1 may be for scale-x handle 2 may be for move etc. for this we can use isDrag or use another variable.
    - the increase or decrease (incase of scale or move) the increase/decrease should be according to mouse-move and not a set number of pix e.g += 8 ;




export default class SelectedItem{

    constructor(){
        this.selectedItemIndex = null;
        this.handleWidth = 15;
        this.handleHeight = 15;
        this.handleColor ='red';
        this.isDrag = false;
    }

    async checkHit(e,itemObjects,ctx) {
            const canvas = e.target; // assuming e.target is the canvas
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
        
            for (let i = 0; i < itemObjects.length; i++) {
                const itemObject = itemObjects[i];
                if (itemObject.isHit(x,y,ctx)){
                    this.selectedItemIndex = i;
                    return true;
                }
            }
            this.selectedItemIndex = null; 
            return false;
        }

     
    drawHandles(ctx,itemObjects){
        if( this.selectedItemIndex == null){return;}
// debugger;
        const itemObject = itemObjects[this.selectedItemIndex];
        
        const x = itemObject.getX();
        const y = itemObject.getY();
        const width = itemObject.width(ctx)
        const height = itemObject.height(ctx)
///////////////////////////////////////////////////
        ctx.save();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'gray';
        ctx.strokeRect(x, y, width, height);
        ctx.restore();
      
        // Draw corner handles
        ctx.fillStyle = 'blue';
        ctx.fillRect(x - this.handleWidth / 2, y - this.handleHeight / 2, this.handleWidth, this.handleHeight); // Top Left
        ctx.fillRect(x + width - this.handleWidth / 2, y - this.handleHeight / 2, this.handleWidth, this.handleHeight); // Top Right
        ctx.fillRect(x - this.handleWidth / 2, y + height - this.handleHeight / 2, this.handleWidth, this.handleHeight); // Bottom Left
        ctx.fillRect(x + width - this.handleWidth / 2, y + height - this.handleHeight / 2, this.handleWidth, this.handleHeight); // Bottom Right
      
        // Draw side handles
        ctx.fillStyle = 'orange';
        ctx.fillRect(x + width / 2 - this.handleWidth / 2, y - this.handleHeight / 2, this.handleWidth, this.handleHeight); // Top
        ctx.fillRect(x + width / 2 - this.handleWidth / 2, y + height - this.handleHeight / 2, this.handleWidth, this.handleHeight); // Bottom
        ctx.fillRect(x - this.handleWidth / 2, y + height / 2 - this.handleHeight / 2, this.handleWidth, this.handleHeight); // Left
        ctx.fillRect(x + width - this.handleWidth / 2, y + height / 2 - this.handleHeight / 2, this.handleWidth, this.handleHeight); // Right

    } 
    
    checkHandleHit(e,ctx,itemObjects){
        this.isDrag = false;
        if(this.selectedItemIndex==null){return;}
        // debugger;
        let itemObject = itemObjects[this.selectedItemIndex];

        const canvas = e.target; // assuming e.target is the canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
////////////////////////////////////////////////////
        const itemX = itemObject.getX();
        const itemY = itemObject.getY();
        const itemWidth = itemObject.width(ctx);
        const itemHeight = itemObject.height(ctx);

        // Check top left handle
        if (
          mouseX >= itemX - this.handleWidth / 2 &&
          mouseX <= itemX + this.handleWidth / 2 &&
          mouseY >= itemY - this.handleHeight / 2 &&
          mouseY <= itemY + this.handleHeight / 2
        ) {
          this.isDrag = true;
          return 0; // Top left handle
        }
      
        // Check top right handle
        if (
          mouseX >= itemX + itemWidth - this.handleWidth / 2 &&
          mouseX <= itemX + itemWidth + this.handleWidth / 2 &&
          mouseY >= itemY - this.handleHeight / 2 &&
          mouseY <= itemY + this.handleHeight / 2
        ) {
          this.isDrag = true;
          return 1; // Top right handle
        }
      
        // Check bottom left handle
        if (
          mouseX >= itemX - this.handleWidth / 2 &&
          mouseX <= itemX + this.handleWidth / 2 &&
          mouseY >= itemY + itemHeight - this.handleHeight / 2 &&
          mouseY <= itemY + itemHeight + this.handleHeight / 2
        ) {
          this.isDrag = true;
          return 2; // Bottom left handle
        }
      
        // Check bottom right handle
        if (
          mouseX >= itemX + itemWidth - this.handleWidth / 2 &&
          mouseX <= itemX + itemWidth + this.handleWidth / 2 &&
          mouseY >= itemY + itemHeight - this.handleHeight / 2 &&
          mouseY <= itemY + itemHeight + this.handleHeight / 2
        ) {
          this.isDrag = true;
          return 3; // Bottom right handle
        }
      
        // Check top middle handle
        if (
          mouseX >= itemX + itemWidth / 2 - this.handleWidth / 2 &&
          mouseX <= itemX + itemWidth / 2 + this.handleWidth / 2 &&
          mouseY >= itemY - this.handleHeight / 2 &&
          mouseY <= itemY + this.handleHeight / 2
        ) {
          this.isDrag = true;
          return 4; // Top middle handle
        }
      
        // Check bottom middle handle
        if (
          mouseX >= itemX + itemWidth / 2 - this.handleWidth / 2 &&
          mouseX <= itemX + itemWidth / 2 + this.handleWidth / 2 &&
          mouseY >= itemY + itemHeight - this.handleHeight / 2 &&
          mouseY <= itemY + itemHeight + this.handleHeight / 2
        ) {
          this.isDrag = true;
          return 5; // Bottom middle handle
        }
      
        // Check left middle handle
        if (
          mouseX >= itemX - this.handleWidth / 2 &&
          mouseX <= itemX + this.handleWidth / 2 &&
          mouseY >= itemY + itemHeight / 2 - this.handleHeight / 2 &&
          mouseY <= itemY + itemHeight / 2 + this.handleHeight / 2
        ) {
          this.isDrag = true;
          return 6; // Left middle handle
        }
      
        // Check right middle handle
        if (
          mouseX >= itemX + itemWidth - this.handleWidth / 2 &&
          mouseX <= itemX + itemWidth + this.handleWidth / 2 &&
          mouseY >= itemY + itemHeight / 2 - this.handleHeight / 2 &&
          mouseY <= itemY + itemHeight / 2 + this.handleHeight / 2
        ) {
          this.isDrag = true;
          return 7; // Right middle handle
        }
      
        // If none of the handles were hit, return -1
        this.isDrag = false;
        return -1;
    }

    mouseMove(e,ctx,itemObjects){
        if(this.selectedItemIndex==null){return;}
        if(this.isDrag){
            let itemObject = itemObjects[this.selectedItemIndex];
            itemObject.itemData.itemExtra.x.initialValue += 1;
        }
    }

}     