import angle from "./angle";
import rect from "./rect";
import icon from "./icon";
import circle from "./circle";
import dot from "./dot";
import ellipse from "./ellipse";
import triangle from "./triangle";
import image from "./image";
import line from "./line";
import lines from "./lines";
import pieChart from "./pieChart";
import ray from "./ray";
import para from "./para";
import text from "./text";
import sprite from "./sprite";


export default function draw(ctx , itemData,assets) {

switch ( itemData.itemExtra.command ) {

    case 'sprite':
        sprite(ctx,itemData,assets)
    break;
   
    case 'angleSymbol':
        angle(ctx,itemData)
    break;

    case 'image':
        image(ctx,itemData)
    break;
    case 'line':
        line(ctx,itemData)
    break;

    case 'lines':
        lines(ctx,itemData)
    break;
  
    case 'para':
        para(ctx,itemData)
    break;
   
    case 'text':
        text(ctx,itemData)
    break;
  
    case 'piechart':
        pieChart(ctx,itemData)
    break;
 
    case 'ray':
        ray(ctx,itemData)
    break;

    case 'triangle':
        triangle(ctx,itemData)
    break;

    case 'rect':
        rect(ctx,itemData)
    break;
   
    case 'icon':
        icon(ctx,itemData)
    break;
  
    case 'circle':
        circle(ctx,itemData)
    break;
    case 'dot':
        dot(ctx,itemData)
    break;
    case 'ellipse':
        ellipse(ctx,itemData)
    break;

    default:

    break;
}
}
//////////////////////////////////////////////////
