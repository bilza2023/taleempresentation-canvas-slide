


export default class Handle{

  constructor(){
    this.handleWidth = 15;
    this.handleHeight = 15;
    this.handleColor ='red';
    this.isDrag = false;
  }

  draw(ctx, x, y, width, height) {
    // Draw dashed line border
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

  isHit(ctx, mouseX, mouseY, itemX, itemY, itemWidth, itemHeight) {
    this.isDrag = false;
  
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
}