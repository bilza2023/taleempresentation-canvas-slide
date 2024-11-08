


export default function getMouseData(e){
    const canvas = e.target; // assuming e.target is the canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return {x,y,canvas,rect};
}