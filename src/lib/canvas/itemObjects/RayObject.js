//@ts-nocheck
import ItemObject from './ItemObject';

export default class RayObject extends ItemObject {
    constructor(itemData=null, assets) {
        super(itemData, assets);
        this.dialogueBox = [
            {
              componentName: 'TrPropNumber',
              title: 'x0',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'y0',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'x1',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'y1',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'lineWidth',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'arrowWidth',
              props: {}
            },
            {
              componentName: 'TrPropNumber',
              title: 'arrowHeight',
              props: {}
            },
            {
              componentName: 'TrTf',
              title: 'startArrow',
              props: {}
            },
            {
              componentName: 'TrTf',
              title: 'endArrow',
              props: {}
            },
            // GapDashCommands
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

    // Draw arrow head helper function
    drawArrowHead(ctx, x1, y1, x2, y2, arrowWidth, arrowHeight) {
        // Calculate the angle of the line
        const angle = Math.atan2(y2 - y1, x2 - x1);
        
        // Create the arrow head path
        ctx.beginPath();
        ctx.moveTo(x2, y2); // Tip of the arrow
        ctx.lineTo(
            x2 - arrowHeight * Math.cos(angle) + arrowWidth * Math.sin(angle),
            y2 - arrowHeight * Math.sin(angle) - arrowWidth * Math.cos(angle)
        );
        ctx.lineTo(
            x2 - arrowHeight * Math.cos(angle) - arrowWidth * Math.sin(angle),
            y2 - arrowHeight * Math.sin(angle) + arrowWidth * Math.cos(angle)
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }


    // Use the same bounding rectangle and getter/setter methods as LineObject
    boundingRectangleX() {
        return Math.min(this.itemData.itemExtra.x0, this.itemData.itemExtra.x1);
    }

    boundingRectangleY() {
        return Math.min(this.itemData.itemExtra.y0, this.itemData.itemExtra.y1);
    }

    get x() {
        return this.boundingRectangleX();
    }

    set x(newX) {
        const deltaX = newX - this.x;
        this.itemData.itemExtra.x0 += deltaX;
        this.itemData.itemExtra.x1 += deltaX;
    }

    get y() {
        return this.boundingRectangleY();
    }

    set y(newY) {
        const deltaY = newY - this.y;
        this.itemData.itemExtra.y0 += deltaY;
        this.itemData.itemExtra.y1 += deltaY;
    }

    get width() {
        return Math.abs(this.itemData.itemExtra.x1 - this.itemData.itemExtra.x0);
    }

    set width(deltaWidth) {
      // If deltaWidth is 0, no change needed
      if (deltaWidth === 0) return;
  
      // Get the leftmost x coordinate as reference point
      const leftX = this.boundingRectangleX();
  
      // Calculate the scale factor for a small increment/decrement
      const scale = (this.width + deltaWidth) / this.width;
  
      // Scale each point's distance from the left edge
      this.itemData.itemExtra.x0 = leftX + (this.itemData.itemExtra.x0 - leftX) * scale;
      this.itemData.itemExtra.x1 = leftX + (this.itemData.itemExtra.x1 - leftX) * scale;
  }
  
  set height(deltaHeight) {
      // If deltaHeight is 0, no change needed
      if (deltaHeight === 0) return;
  
      // Get the topmost y coordinate as reference point
      const topY = this.boundingRectangleY();
  
      // Calculate the scale factor for a small increment/decrement
      const scale = (this.height + deltaHeight) / this.height;
  
      // Scale each point's distance from the top edge
      this.itemData.itemExtra.y0 = topY + (this.itemData.itemExtra.y0 - topY) * scale;
      this.itemData.itemExtra.y1 = topY + (this.itemData.itemExtra.y1 - topY) * scale;
  }
    // set width(newWidth) {
    //     const x0 = this.itemData.itemExtra.x0;
    //     const x1 = this.itemData.itemExtra.x1;
    //     const currentWidth = this.width;
        
    //     if (currentWidth === 0) return;
        
    //     const scale = newWidth / currentWidth;
    //     const leftX = this.boundingRectangleX();
        
    //     this.itemData.itemExtra.x0 = leftX + (x0 - leftX) * scale;
    //     this.itemData.itemExtra.x1 = leftX + (x1 - leftX) * scale;
    // }

    get height() {
        return Math.abs(this.itemData.itemExtra.y1 - this.itemData.itemExtra.y0);
    }

    // set height(newHeight) {
    //     const y0 = this.itemData.itemExtra.y0;
    //     const y1 = this.itemData.itemExtra.y1;
    //     const currentHeight = this.height;
        
    //     if (currentHeight === 0) return;
        
    //     const scale = newHeight / currentHeight;
    //     const topY = this.boundingRectangleY();
        
    //     this.itemData.itemExtra.y0 = topY + (y0 - topY) * scale;
    //     this.itemData.itemExtra.y1 = topY + (y1 - topY) * scale;
    // }
}