// ComponentObject.js
export default class ComponentObject {
    static validateBaseItemData(data) {
        if (!data || typeof data !== 'object') return false;
        if (!data.extra) return false;
        
        // Validate common properties that all components should have
        const commonProps = ['showAt', 'width', 'height', 'x', 'y'];
        return commonProps.every(prop => prop in data.extra);
    }

    constructor(itemData, fnList = {}) {
        if (!itemData) {
            throw new Error('ItemData is required for ComponentObject');
        }
        
        this.itemData = itemData;
        this.fnList = fnList;
        this.handleObjects = [];
        this.loadHandles();
    }

    // Rest of your existing ComponentObject methods...
    loadHandles() {} 

    isVisible(currentTime) {
        if (!this.itemData.extra.showAt) {
            return true;
        }
        return currentTime >= this.itemData.extra.showAt;
    }

    // eslint-disable-next-line no-unused-vars
    draw(drawLib, currentTime) {
        console.log("ComponentObject draw");
    }

    update(mouseX, mouseY) {
        this.handleObjects.forEach(obj => {
            obj.update(this.itemData, mouseX, mouseY);
        });
    }

    drawHandles(ctx) {
        this.handleObjects.forEach(obj => {
            obj.draw(ctx);
        });
    }

    deselect() {
        this.handleObjects.forEach(handleObject => {
            handleObject.deselect();
        });
    }

    selectHandlesIfHit(mouseX, mouseY) {
        this.handleObjects.forEach(handleObject => {
            handleObject.selectIfHit(mouseX, mouseY);
        });
    }

    width() {
        return this.itemData.extra.width.initialValue;
    }

    height() {
        return this.itemData.extra.height.initialValue;
    }

    getX() {
        return this.itemData.extra.x.initialValue;
    }

    getY() {
        return this.itemData.extra.y.initialValue;
    }

    isHit(mouseX, mouseY) {
        return (
            mouseX >= this.getX() &&
            mouseX <= this.getX() + this.width() &&
            mouseY >= this.getY() &&
            mouseY <= this.getY() + this.height()
        );
    }
}

