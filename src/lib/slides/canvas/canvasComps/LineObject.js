
//@ts-nocheck
import ComponentObject from "./ComponentObject";
import getProp from "../getProp";

/////////////////////////////////////////////////////////
export default class LineObject extends ComponentObject {
    static getDefaultProperties() {
        return {
            extra: {
                x1: getProp(20),
                y1: getProp(10),
                x2: getProp(500),
                y2: getProp(200),
                lineWidth: getProp(2),
                color: getProp('black'),
                dash: getProp(0),
                gap: getProp(0),
                globalAlpha: getProp(1),
                showAt: 0,
                // Add any other required properties
                width: getProp(0),  // Will be calculated
                height: getProp(0), // Will be calculated
                x: getProp(0),      // Will be calculated
                y: getProp(0)       // Will be calculated
            }
        };
    }

    static validateItemData(data) {
        if (!super.validateBaseItemData(data)) return false;

        // Validate line-specific properties
        const requiredProps = ['x1', 'y1', 'x2', 'y2', 'lineWidth'];
        return requiredProps.every(prop => prop in data.extra);
    }

    constructor(itemData = null, fnList = {}) {
        const finalData = itemData || LineObject.getDefaultProperties();
        
        // Validate the data
        if (!LineObject.validateItemData(finalData)) {
            throw new Error('Invalid item data for LineObject: missing required properties');
        }

        // Calculate and set the derived properties if they're not already set
        if (!itemData) {
            const left = Math.min(finalData.extra.x1.initialValue, finalData.extra.x2.initialValue);
            const top = Math.min(finalData.extra.y1.initialValue, finalData.extra.y2.initialValue);
            const width = Math.abs(finalData.extra.x2.initialValue - finalData.extra.x1.initialValue);
            const height = Math.abs(finalData.extra.y2.initialValue - finalData.extra.y1.initialValue);

            finalData.extra.x = getProp(left);
            finalData.extra.y = getProp(top);
            finalData.extra.width = getProp(width);
            finalData.extra.height = getProp(height);
        }

        super(finalData, fnList);

        // Your existing dialogue box configuration
        this.dialogueBox = [
            // ... (keep your existing dialogue box configuration)
        ];
    }

    loadHandles() {
        // Your existing handle loading code
        // Consider extracting handle configurations to a separate method
        this.loadButtonHandle();
        this.loadStartPointHandle();
        this.loadEndPointHandle();
    }

    loadButtonHandle() {
        const btnHandle = new ButtonHandle(this.itemData, this.fnList);
        btnHandle.getX = () => this.itemData.extra.x1.initialValue;
        btnHandle.getY = () => this.itemData.extra.y1.initialValue + 25;
        btnHandle.useInitialValue = true;
        this.handleObjects.push(btnHandle);
    }

    loadStartPointHandle() {
        const draggerHandle = new DraggerHandle(this.itemData, 'x1', 'y1');
        draggerHandle.useInitialValue = true;
        draggerHandle.color = '#a8baea';
        draggerHandle.getX = () => this.itemData.extra.x1.initialValue;
        draggerHandle.getY = () => this.itemData.extra.y1.initialValue;
        this.handleObjects.push(draggerHandle);
    }

    loadEndPointHandle() {
        const draggerHandle = new DraggerHandle(this.itemData, 'x2', 'y2');
        draggerHandle.useInitialValue = true;
        draggerHandle.color = 'blue';
        draggerHandle.getX = () => this.itemData.extra.x2.initialValue;
        draggerHandle.getY = () => this.itemData.extra.y2.initialValue;
        this.handleObjects.push(draggerHandle);
    }

    // Your existing draw method remains the same
    draw(ctx, currentTime) {
        // ... (keep your existing draw method)
    }

    // Override base class methods with line-specific calculations
    width() {
        const left = Math.min(this.itemData.extra.x1.initialValue, this.itemData.extra.x2.initialValue);
        const right = Math.max(this.itemData.extra.x1.initialValue, this.itemData.extra.x2.initialValue);
        return Math.abs(right - left);
    }

    height() {
        const top = Math.min(this.itemData.extra.y1.initialValue, this.itemData.extra.y2.initialValue);
        const bottom = Math.max(this.itemData.extra.y1.initialValue, this.itemData.extra.y2.initialValue);
        return Math.abs(bottom - top);
    }

    getX() {
        return Math.min(this.itemData.extra.x1.initialValue, this.itemData.extra.x2.initialValue);
    }

    getY() {
        return Math.min(this.itemData.extra.y1.initialValue, this.itemData.extra.y2.initialValue);
    }

    isHit(mouseX, mouseY) {
        const left = this.getX();
        const top = this.getY();
        const right = left + this.width();
        const bottom = top + this.height();
        return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
    }
}