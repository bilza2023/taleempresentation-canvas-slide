// SelectedItem.svelte
import Handle from './Handle.js';

export default class SelectedItem {
    constructor(itemObject) {
        this.itemObject = itemObject;
        this.handles = new Map();
        this.activeHandle = null;
        this.startPos = { x: 0, y: 0 };
        this.startBounds = { x: 0, y: 0, width: 0, height: 0 };
        this.onDelete = null;
        
        this.initializeHandles();
    }

    initializeHandles() {
        this.addHandle('widthHandle', new Handle('top-right', { 
            cursor: 'ne-resize',
            color: '#2196f3'
        }));

        this.addHandle('heightHandle', new Handle('bottom-right', { 
            cursor: 'se-resize',
            color: '#2196f3'
        }));

        this.addHandle('move', new Handle('center', { 
            icon: '✥',
            size: 15,
            color: '#4caf50'
        }));
    }

    addHandle(id, handle) {
        this.handles.set(id, handle);
    }

    drawHandles(ctx) {
        const bounds = this.itemObject.getBounds();

        // Draw selection rectangle
        ctx.save();
        ctx.strokeStyle = '#1a73e8';
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
        ctx.restore();

        // Draw all handles
        this.handles.forEach(handle => handle.draw(ctx, bounds));
    }

    mouseDown(x, y) {
        const bounds = this.itemObject.getBounds();
        this.startPos = { x, y };
        this.startBounds = { ...bounds };

        for (const [id, handle] of this.handles) {
            if (handle.isHit(x, y, bounds)) {
                this.activeHandle = id;
                return true;
            }
        }
        return false;
    }

    mouseMove(x, y) {
        if (!this.activeHandle) {
            const bounds = this.itemObject.getBounds();
            this.handles.forEach(handle => {
                handle.isHovered = handle.isHit(x, y, bounds);
            });
            return false;
        }

        const dx = x - this.startPos.x;
        const dy = y - this.startPos.y;

        // Use startBounds for calculations
        switch (this.activeHandle) {
            case 'move':
                this.itemObject.x = this.startBounds.x + dx;
                this.itemObject.y = this.startBounds.y + dy;
                break;

            case 'heightHandle':
                this.itemObject.height = Math.max(10, this.startBounds.height + dy);
                break;

            case 'widthHandle':
                this.itemObject.width = Math.max(10, this.startBounds.width + dx);
                break;
        }

        return true;
    }

    mouseUp() {
        this.activeHandle = null;
    }

    setDeleteCallback(callback) {
        this.onDelete = callback;
    }

    isHit(x, y) {
        return this.mouseDown(x, y);
    }
}