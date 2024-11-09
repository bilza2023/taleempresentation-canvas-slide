// SelectedItem.js
import HandleManager from './HandleManager.js';

export default class SelectedItem {
    constructor(itemObject) {
        
        this.itemObject = itemObject;
        this.handleManager = new HandleManager(itemObject);
    }

    drawHandles(ctx) {
        this.handleManager.draw(ctx);
    }

    mouseDown(x, y) {
        return this.handleManager.handleMouseDown(x, y);
    }

    mouseMove(x, y) {
        return this.handleManager.handleMouseMove(x, y);
    }

    mouseUp() {
        this.handleManager.handleMouseUp();
    }

    isHit(x, y) {
        return this.handleManager.handleMouseDown(x, y);
    }

    setDeleteCallback(callback) {
        this.handleManager.setDeleteCallback(callback);
    }

}