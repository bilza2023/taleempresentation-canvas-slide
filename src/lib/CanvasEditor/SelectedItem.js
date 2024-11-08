

export default class SelectedItem{

    constructor(itemObject){
       this.itemObject = itemObject;
        this.handleWidth = 15;
        this.handleHeight = 15;
        this.handleColor ='red';
        this.isDrag = false;
        this.selectedHandle = null;
    }

    drawHandles(ctx){
// debugger;
        const itemObject = this.itemObject;
        
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
    
    checkHandleHit(e, ctx) {
        this.isDrag = false;
        this.selectedHandle = null; //important
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
      
        const x = this.itemObject.getX();
        const y = this.itemObject.getY();
        const width = this.itemObject.width(ctx);
        const height = this.itemObject.height(ctx);
      
        // Calculate handle coordinates
        const handleSize = this.handleWidth / 2;
        const handles = [
          { x: x - handleSize, y: y - handleSize, name: 'topLeft' }, // Top left
          { x: x + width - handleSize, y: y - handleSize, name: 'topRight' }, // Top right
          { x: x - handleSize, y: y + height - handleSize, name: 'bottomLeft' }, // Bottom left
          { x: x + width - handleSize, y: y + height - handleSize, name: 'bottomRight' }, // Bottom right
          { x: x + width / 2 - handleSize, y: y - handleSize, name: 'topMiddle' }, // Top middle
          { x: x + width / 2 - handleSize, y: y + height - handleSize, name: 'bottomMiddle' }, // Bottom middle
          { x: x - handleSize, y: y + height / 2 - handleSize, name: 'leftMiddle' }, // Left middle
          { x: x + width - handleSize, y: y + height / 2 - handleSize, name: 'rightMiddle' }, // Right middle
        ];
      // debugger;
        for (let i = 0; i < handles.length; i++) {
          const { x: handleX, y: handleY } = handles[i];
          if (
            mouseX >= handleX &&
            mouseX <= handleX + this.handleWidth &&
            mouseY >= handleY &&
            mouseY <= handleY + this.handleHeight
          ) {
            this.isDrag = true;
            this.selectedHandle = handles[i].name;
            console.log("Handle clicked: " ,this.selectedHandle ,i);
            return i;
          }
        }
      
        this.isDrag = false;
        return -1;
      }

      mouseMove(e, ctx) {
        
        if (this.selectedHandle == null) return;
        if (this.selectedHandle == "leftTop"){
          this.itemObject.itemData.itemExtra.x.initialValue += 4;
        }
      
    //     if (this.isDrag) {
    //         debugger;
    //       const itemObject = itemObjects[this.selectedItemIndex];
    //       const x = itemObject.getX();
    //       const y = itemObject.getY();
    //       const width = itemObject.width(ctx);
    //       const height = itemObject.height(ctx);
    
    //     }
      }

      mouseUp(){
        this.selectedHandle = null;
        this.isDrag = false;
      }

}