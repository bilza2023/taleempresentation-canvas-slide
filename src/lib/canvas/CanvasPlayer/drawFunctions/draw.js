import sprite from "./sprite";
import angle from "./angle";
import image from "./image";
import line from "./line";
import lines from "./lines";
import para from "./para";
import text from "./text";
import pieChart from "./pieChart";
import ray from "./ray";
import triangle from "./triangle";
import rect from "./rect";
import icon from "./icon";
import circle from "./circle";
import dot from "./dot";
import ellipse from "./ellipse";

// Object Mapping Technique
const drawHandlers = {
  sprite: sprite,
  angleSymbol: angle,
  image: image,
  line: line,
  lines: lines,
  para: para,
  text: text,
  piechart: pieChart,
  ray: ray,
  triangle: triangle,
  rect: rect,
  icon: icon,
  circle: circle,
  dot: dot,
  ellipse: ellipse
};

// Export the main draw function
export default function draw(ctx, itemData, assets) {
  // Find the appropriate handler based on the command
  const handler = drawHandlers[itemData.itemExtra.type];
  
  if (handler) {
    // If the specific handler exists, call it
    handler(ctx, itemData, assets);
  } else {
    // Optional: Add fallback or error handling
    console.warn(`No draw handler found for command: ${itemData.itemExtra.type}`);
  }
}