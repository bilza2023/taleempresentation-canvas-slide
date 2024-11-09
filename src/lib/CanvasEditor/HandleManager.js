// HandleManager.js
import Handle from './Handle.js';

export default class HandleManager {
    constructor(itemObject) {

        this.itemObject = itemObject;
        this.handles = new Map();
        this.activeHandle = null;
        this.startPos = { x: 0, y: 0 };
        this.startBounds = { x: 0, y: 0, width: 0, height: 0 };

        this.initializeHandles();
    }

    initializeHandles() {
        // Resize handles
        this.addHandle('resize-nw', new Handle('top-left', { 
            cursor: 'nw-resize',
            color: '#2196f3'
        }));
        this.addHandle('resize-ne', new Handle('top-right', { 
            cursor: 'ne-resize',
            color: '#2196f3'
        }));
        this.addHandle('resize-sw', new Handle('bottom-left', { 
            cursor: 'sw-resize',
            color: '#2196f3'
        }));
        this.addHandle('resize-se', new Handle('bottom-right', { 
            cursor: 'se-resize',
            color: '#2196f3'
        }));

        // Action handles
        this.addHandle('move', new Handle('center', { 
            icon: '✥',
            size: 15,
            color: '#4caf50'
        }));
        this.addHandle('rotate', new Handle('top', { 
            icon: '⟳',
            size: 15,
            color: '#ff9800'
        }));
        this.addHandle('delete', new Handle('right', { 
            icon: '🗑️',
            size: 15,
            color: '#f44336'
        }));
    }

    addHandle(id, handle) {
        this.handles.set(id, handle);
    }
/// This is the place that needs to be changed.
    getBounds() {
        return {
            x: this.itemObject.x,
            y: this.itemObject.y,
            width: this.itemObject.width,
            height: this.itemObject.height
        };
    }

    draw(ctx) {
        const bounds = this.getBounds();

        // Draw selection rectangle
        ctx.save();
        ctx.strokeStyle = '#1a73e8';
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
        ctx.restore();

        // Draw all handles
        this.handles.forEach(handle => handle.draw(ctx, bounds));
    }

    handleMouseDown(x, y) {
        const bounds = this.getBounds();
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

    handleMouseMove(x, y) {
        if (!this.activeHandle) {
            const bounds = this.getBounds();
            this.handles.forEach(handle => {
                handle.isHovered = handle.isHit(x, y, bounds);
            });
            return false;
        }

        const dx = x - this.startPos.x;
        const dy = y - this.startPos.y;

        switch (this.activeHandle) {
            case 'move':
                this.itemObject.x = this.startBounds.x + dx;
                this.itemObject.y = this.startBounds.y + dy;
                console.log("move");
                break;

            case 'resize-se':
                this.itemObject.height =  this.startBounds.height + dy;
                console.log("resize-se");
                break;

            case 'resize-sw':
                // this.itemObject.x = this.startBounds.x + dx;
                // this.itemObject.width = Math.max(10, this.startBounds.width - dx);
                // this.itemObject.height = Math.max(10, this.startBounds.height + dy);
                console.log("resize-se");
                break;

            case 'resize-ne':
                this.itemObject.width =  Math.max(10, this.startBounds.width + dx);
                
                console.log("resize-ne");
                break;

            case 'resize-nw':
                // this.itemObject.x = this.startBounds.x + dx;
                // this.itemObject.y = this.startBounds.y + dy;
                // this.itemObject.width = Math.max(10, this.startBounds.width - dx);
                // this.itemObject.height = Math.max(10, this.startBounds.height - dy);
                console.log("resize-nw");
                break;

            case 'rotate':
                console.log("rotate");
                break;

            case 'delete':
                // Handle deletion through a callback
                // if (this.onDelete) {
                //     this.onDelete();
                // }
                console.log("delete");
                break;
        }

        return true;
    }

    handleMouseUp() {
        this.activeHandle = null;
    }

    setDeleteCallback(callback) {
        this.onDelete = callback;
    }
}