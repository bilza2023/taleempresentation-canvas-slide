

export default function clear(ctx,canvas,backgroundColor='gray') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    }  