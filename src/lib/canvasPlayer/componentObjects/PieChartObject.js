//@ts-nocheck
import ComponentObject from './ComponentObject';

export default class PieChartObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
}

    draw(ctx,currentTime){
        const x = this.itemData.itemExtra.x.initialValue;
        const y = this.itemData.itemExtra.y.initialValue;
        const radius = this.itemData.itemExtra.radius.initialValue;
        const data = JSON.parse(this.itemData.itemExtra.data);
        // drawLib.pieChart(x,y,radius, data, { drawLabelsOutside: false }) 
        let startAngle = 0;

        const centerX = x;
        const centerY = y;
        const options = { drawLabelsOutside: false };

        data.forEach(pie => {
            // Draw pie slice
            const endAngle = startAngle + (pie.percent / 100) * 2 * Math.PI;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = pie.color || '#000'; // default color
            ctx.fill();
    
            // Draw pie title
            const midAngle = startAngle + (endAngle - startAngle) / 2;
            const textX = centerX + Math.cos(midAngle) * (options.drawLabelsOutside ? radius + 20 : radius / 2);
            const textY = centerY + Math.sin(midAngle) * (options.drawLabelsOutside ? radius + 20 : radius / 2);
    
            ctx.fillStyle = '#000'; // default text color
            ctx.font = '14px Arial';
            ctx.fillText(pie.title, textX, textY);
    
            startAngle = endAngle; // update startAngle for next pie
        });

    }
////////////////////////////////////////////////////////////////////
width(){
    return this.itemData.itemExtra.radius.initialValue * 2;
 }
 height(){
    return this.itemData.itemExtra.radius.initialValue * 2;
 }
 getX(){
    return this.itemData.itemExtra.x.initialValue;
 }
 
 getY(){
    return this.itemData.itemExtra.y.initialValue;
 }
////////////////////////////////////////////////////////////////////
isHit(mouseX, mouseY) {
    const centerX = this.getX();
    const centerY = this.getY();
    const radius = this.itemData.itemExtra.radius.initialValue;

    // Calculate the distance between the mouse click and the center of the circle
    const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );

    // Check if the distance is less than or equal to the radius
    return distance <= radius;
}
}//class
