
//@ts-nocheck
// import ray from "./ray";
/**
 * DrawLib is a very thin class over an html5 canvas element. keep it light with no state other than width,height,bg-color , ref etc.
 */ 

export default class DrawLib {
constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;
    this._backgroundColor = 'white'; // Default background color
    this._width = canvas.width;
    this._height = canvas.height;
}

get backgroundColor() {
    return this._backgroundColor;
}

set backgroundColor(color) {
    this._backgroundColor = color;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

get width() {
    return this._width;
}

set width(value) {
    this._width = value;
    this.canvas.width = value;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // eslint-disable-next-line no-self-assign
    this.backgroundColor = this.backgroundColor; // Redraw background
}

get height() {
    return this._height;
}

set height(value) {
    this._height = value;
    this.canvas.height = value;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backgroundColor = this.backgroundColor; // Redraw background
}

shape(points, color = 'white', closed = true) {
    if (points.length % 2 !== 0) {
        throw new Error('Number of points should be even (x, y pairs).');
    }

    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(points[0], points[1]);

    for (let i = 2; i < points.length; i += 2) {
        this.ctx.lineTo(points[i], points[i + 1]);
    }

    if (closed) {
        this.ctx.closePath();
    }

    this.ctx.fill();
}

bezier(x, y, x1, y1, x2, y2, color = "red", lineWidth = 1, globalAlpha = 1, showHandle = false, dash = 0, gap = 0) {
this.ctx.save(); // Save the current context state

this.ctx.lineWidth = lineWidth;
this.ctx.strokeStyle = color;
this.ctx.globalAlpha = globalAlpha;

if (dash === 0 && gap === 0) {
    this.ctx.setLineDash([]); // Set line dash pattern
} else {
    this.ctx.setLineDash([dash, gap]); // Set line dash pattern
}

this.ctx.beginPath();
this.ctx.moveTo(x, y);
this.ctx.bezierCurveTo(x1, y1, x2, y2, x2, y2); // Use x2, y2 as control point
this.ctx.stroke();

if (showHandle) {
    this.ctx.fillStyle = 'yellow'; // Handle color
    this.ctx.fillRect(x1 - 2, y1 - 2, 4, 4); // Adjust handle size
    // this.ctx.fillRect(x2 - 2, y2 - 2, 4, 4); // Adjust handle size
}

this.ctx.restore(); // Restore the context state
}
//////////////////////////////////////////////////////////////

// Image drawing method
image(image, x, y, width, height,globalAlpha=1) {
    // debugger;
    this.ctx.save(); // Save the current context state
    this.ctx.globalAlpha = globalAlpha; // Set the global alpha
    this.ctx.drawImage(image, x, y, width, height);
    this.ctx.restore();
}

// Clear canvas method
clear(backgroundColor='gray') {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = backgroundColor; 
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); 
}
    

// Gradient drawing method (Linear Gradient)
linearGradient(x1, y1, x2, y2, colorStops) {
    const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
    for (const [stop, color] of colorStops) {
        gradient.addColorStop(stop, color);
    }
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

grid(cellWidth = 100, cellHeight = 100, lineWidth = 2, lineColor = 'black') {
    this.ctx.save(); // Save the current context state

    // Adjust canvas settings for sharp lines
    this.ctx.translate(0.5, 0.5);
    this.ctx.imageSmoothingEnabled = false;

    this.ctx.strokeStyle = lineColor;
    this.ctx.lineWidth = lineWidth;

    // Draw vertical lines
    for (let x = cellWidth; x < this.canvas.width; x += cellWidth) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.canvas.height);
        this.ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = cellHeight; y < this.canvas.height; y += cellHeight) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.canvas.width, y);
        this.ctx.stroke();
    }

    this.ctx.restore(); // Restore the context state
}

//gridDot
gridDot(cellWidth = 100, cellHeight = 100, dotSize = 2, dotColor = 'black') {
        this.ctx.fillStyle = dotColor;
    
        // Draw dots at the intersection of grid lines
        for (let x = cellWidth; x < this.canvas.width; x += cellWidth) {
            for (let y = cellHeight; y < this.canvas.height; y += cellHeight) {
                this.ctx.beginPath();
                this.ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }


repeatText(textArray, initialX=0, initialY=0, xFactor = 50, yFactor = 0,color = 'white', font = '20px Arial') {
    // debugger;
    let currentX = initialX;
    let currentY = initialY;

    for (const text of textArray) {
        this.text(text, currentX, currentY, color, font);
        currentX += xFactor;
        currentY += yFactor;
    }
}
// Inside the DrawLib class

repeatDot(numberOfDots = 10, initialX=0, initialY=0, xFactor = 50, yFactor = 0, width = 10, color = 'red') {
    // debugger;
    let currentX = initialX;
    let currentY = initialY;

    for (let i = 0; i < numberOfDots; i++) {
        this.dot(currentX, currentY, '', width,16, color);
        currentX += xFactor;
        currentY += yFactor;
    }
}
// Add this method to your DrawLib class

roundRect(x, y, width, height, radius, color = 'black', filled = false, lineWidth = 1, dash = 0, gap = 0, globalAlpha = 1) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.arcTo(x + width, y, x + width, y + radius, radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.arcTo(x, y + height, x, y + height - radius, radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.arcTo(x, y, x + radius, y, radius);
    this.ctx.closePath();

    this.ctx.globalAlpha = globalAlpha;
    this.ctx.lineWidth = lineWidth;

    if (dash === 0 && gap === 0) {
        this.ctx.setLineDash([]);
    } else {
        this.ctx.setLineDash([dash, gap]);
    }

    if (filled) {
        this.ctx.fillStyle = color;
        this.ctx.fill();
    } else {
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    this.ctx.restore();
}
regularPolygon(x, y, radius, sides, color = 'black', filled = true) {
    const points = [];
    for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 * i) / sides;
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        points.push(px, py);
    }
    this.polygon(points, color, filled);
}
regularStar(x, y, outerRadius, innerRadius, points, color = 'black', filled = true) {
    const starPoints = [];
    const angleStep = Math.PI / points;

    for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = angleStep * i;
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        starPoints.push(px, py);
    }

    this.polygon(starPoints, color, filled);
}
drawPerpendSymbol(x, y, x1, y1, x2, y2, lineWidth = 1, color = 'black') {
    // debugger;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x1, y1);
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
}
bgImage(image,bgGlobalAlpha=1) {
    this.ctx.globalAlpha = bgGlobalAlpha;    
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1;    
    }
        
        
}
