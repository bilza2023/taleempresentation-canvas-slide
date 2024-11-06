//@ts-nocheck

export default class Slide {
    constructor(slideData, assets, fnList = {}) {
        this.slideData = slideData;
        this.assets = assets;
        this.fnList = fnList;
        this.currentTime = 0;
        this.items = [];
      
    }

    // Time-related methods
    setCurrentTime(time) {
        this.currentTime = time;
        // Update all items with new time
        this.updateItems();
    }

    isWithinTimeRange() {
        return this.currentTime >= this.slideData.startTime && 
               this.currentTime <= this.slideData.endTime;
    }

    // Core display methods
    draw(ctx) {
        if (!this.isWithinTimeRange()) return;

        // Setup canvas context with slide properties
        this.setupCanvas(ctx);
        
        // Draw background
        this.drawBackground(ctx);
        
        // Draw grid if enabled
        if (this.slideData.slideExtra.showGrid) {
            this.drawGrid(ctx);
        }
        
        // Draw all visible items
        this.drawItems(ctx);
    }

    setupCanvas(ctx) {
        ctx.save();
        // Apply any global transformations or settings
        if (this.slideData.slideExtra.xFactor || this.slideData.slideExtra.yFactor) {
            ctx.translate(this.slideData.slideExtra.xFactor, this.slideData.slideExtra.yFactor);
        }
    }

    drawBackground(ctx) {
        // Fill background color
        ctx.fillStyle = this.slideData.slideExtra.backgroundColor;
        ctx.fillRect(0, 0, 
            this.slideData.slideExtra.canvasWidth, 
            this.slideData.slideExtra.canvasHeight
        );

        // Draw background image if specified
        if (this.slideData.slideExtra.bgImg) {
            ctx.globalAlpha = this.slideData.slideExtra.bgGlobalAlpha;
            // Background image drawing would go here
            // Note: Actual image loading/drawing implementation would depend on your asset management system
            ctx.globalAlpha = 1;
        }
    }

    drawGrid(ctx) {
        const { cellWidth, cellHeight, gridLineWidth, gridLineColor } = this.slideData.slideExtra;
        
        ctx.beginPath();
        ctx.strokeStyle = gridLineColor;
        ctx.lineWidth = gridLineWidth;

        // Draw vertical lines
        for (let x = 0; x <= this.slideData.slideExtra.canvasWidth; x += cellWidth) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.slideData.slideExtra.canvasHeight);
        }

        // Draw horizontal lines
        for (let y = 0; y <= this.slideData.slideExtra.canvasHeight; y += cellHeight) {
            ctx.moveTo(0, y);
            ctx.lineTo(this.slideData.slideExtra.canvasWidth, y);
        }

        ctx.stroke();
    }

    drawItems(ctx) {
        for (const item of this.items) {
            if (this.isItemVisible(item)) {
                item.draw(ctx, this.currentTime);
            }
        }
    }

    isItemVisible(item) {
        // Check if item should be shown at current time
        const showAt = item.itemData.itemExtra.showAt || 0;
        const hideAt = item.itemData.itemExtra.hideAt || this.slideData.endTime;
        
        return this.currentTime >= showAt && this.currentTime <= hideAt;
    }

    updateItems() {
        // Update all items with current time
        // This could trigger animations or other time-based changes
        for (const item of this.items) {
            if (this.isItemVisible(item)) {
                // Update any time-based properties
                // This would be implemented based on your animation system
            }
        }
    }

    cleanup() {
        ctx.restore();
        // Any additional cleanup needed
    }
}