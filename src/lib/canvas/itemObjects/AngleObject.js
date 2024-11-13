//@ts-nocheck
import ItemObject from './ItemObject';

export default class AngleObject extends ItemObject {
    constructor(itemData, assets) {
        super(itemData, assets);
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

    draw(ctx) {
        const startAngle = this.itemData.itemExtra.startAngle * (Math.PI / 180);
        const endAngle = this.itemData.itemExtra.endAngle * (Math.PI / 180);
        const x = this.itemData.itemExtra.x;
        const y = this.itemData.itemExtra.y;
        const radius = this.itemData.itemExtra.radius;
        const ticks = this.itemData.itemExtra.ticks;
        const color = this.itemData.itemExtra.color;
        const lineWidth = this.itemData.itemExtra.lineWidth;
        const showOrigin = this.itemData.itemExtra.showOrigin;

        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        // Draw the arc
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
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }

        ctx.restore();
    }

    // Calculate the leftmost x coordinate of the arc's bounding box
    boundingRectangleX() {
        const x = this.itemData.itemExtra.x;
        const radius = this.itemData.itemExtra.radius;
        // Include the extra 10 pixels for the tick marks
        return x - radius - 10;
    }

    // Calculate the topmost y coordinate of the arc's bounding box
    boundingRectangleY() {
        const y = this.itemData.itemExtra.y;
        const radius = this.itemData.itemExtra.radius;
        // Include the extra 10 pixels for the tick marks
        return y - radius - 10;
    }

    get x() {
        return this.boundingRectangleX();
    }

    set x(newX) {
        // Adjust the center x position based on the new bounding box x
        const radius = this.itemData.itemExtra.radius;
        this.itemData.itemExtra.x = newX + radius + 10;
    }

    get y() {
        return this.boundingRectangleY();
    }

    set y(newY) {
        // Adjust the center y position based on the new bounding box y
        const radius = this.itemData.itemExtra.radius;
        this.itemData.itemExtra.y = newY + radius + 10;
    }

    get width() {
        // Width is twice the radius plus extra space for tick marks
        const radius = this.itemData.itemExtra.radius;
        return (radius + 10) * 2;
    }

    set width(newWidth) {
        // Adjust radius based on new width (accounting for tick marks)
        const newRadius = (newWidth / 2) - 10;
        if (newRadius > 0) {
            this.itemData.itemExtra.radius = newRadius;
        }
    }

    get height() {
        // Height is twice the radius plus extra space for tick marks
        const radius = this.itemData.itemExtra.radius;
        return (radius + 10) * 2;
    }

    set height(newHeight) {
        // Adjust radius based on new height (accounting for tick marks)
        const newRadius = (newHeight / 2) - 10;
        if (newRadius > 0) {
            this.itemData.itemExtra.radius = newRadius;
        }
    }
}