

export default class SelectedItem{

    constructor(){
        this.selectedItemIndex = null;
        this.selectedHandle = -1; // New property to track the selected handle
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
    
    checkHandleHit(e, ctx, itemObjects) {
        this.isDrag = false;
        if (this.selectedItemIndex == null) return;
      debugger;
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
      
        const itemObject = itemObjects[this.selectedItemIndex];
        const x = itemObject.getX();
        const y = itemObject.getY();
        const width = itemObject.width(ctx);
        const height = itemObject.height(ctx);
      
        // Calculate handle coordinates
        const handleSize = this.handleWidth / 2;
        const handles = [
          { x: x - handleSize, y: y - handleSize }, // Top left
          { x: x + width - handleSize, y: y - handleSize }, // Top right
          { x: x - handleSize, y: y + height - handleSize }, // Bottom left
          { x: x + width - handleSize, y: y + height - handleSize }, // Bottom right
          { x: x + width / 2 - handleSize, y: y - handleSize }, // Top middle
          { x: x + width / 2 - handleSize, y: y + height - handleSize }, // Bottom middle
          { x: x - handleSize, y: y + height / 2 - handleSize }, // Left middle
          { x: x + width - handleSize, y: y + height / 2 - handleSize }, // Right middle
        ];
      
        for (let i = 0; i < handles.length; i++) {
          const { x: handleX, y: handleY } = handles[i];
          if (
            mouseX >= handleX &&
            mouseX <= handleX + this.handleWidth &&
            mouseY >= handleY &&
            mouseY <= handleY + this.handleHeight
          ) {
            this.isDrag = true;
            return i;
          }
        }
      
        this.isDrag = false;
        return -1;
      }

      mouseMove(e, ctx, itemObjects) {
    //     if (this.selectedItemIndex == null) return;
      
    //     if (this.isDrag) {
    //         debugger;
    //       const itemObject = itemObjects[this.selectedItemIndex];
    //       const x = itemObject.getX();
    //       const y = itemObject.getY();
    //       const width = itemObject.width(ctx);
    //       const height = itemObject.height(ctx);
    
    //     }
      }

}