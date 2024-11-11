
//@ts-nocheck

import Rectangle from './Rectangle';
// import ImageObject from './ImageObject';
// import LineObject from './LineObject';
import Circle from './Circle';
// import RayObject from './RayObject';
import EllipseObject from './EllipseObject';
// import TextObject from './TextObject';
// import TriangleObject from './TriangleObject';
// import ParaObject from './ParaObject';
// import AngleObject from './AngleObject';
// import SpriteObject from './SpriteObject';
// import DotObject from './DotObject';
// import RDotObject from './RDotObject';
// import RTextObject from './RTextObject';
// import IconObject from './IconObject';
// import Image2Object from './Image2Object';
// import PieChartObject from './PieChartObject';
// import LinesObject from './LinesObject';


export default function itemToObject(item){

    let selectedItem;
    let lookFor = item.itemExtra.command;
    
   switch (lookFor) {

    case 'piechart':
    // selectedItem = new PieChartObject(item);
    break;
    case 'repeatText':
    // selectedItem = new RTextObject(item);
    break;

    case 'repeatDot':
    // selectedItem = new RDotObject(item);
    break;

    case 'icon':
    // selectedItem = new IconObject(item);
    break;
   
    case 'dot':
    // selectedItem = new DotObject(item);
    break;
    case 'angleSymbol':
    // selectedItem = new AngleObject(item);
    break;

    case 'sprite':
    // selectedItem = new SpriteObject(item , fnList,spriteImgArray );
    break;

    case 'para':
    // selectedItem = new ParaObject(item);
    break;

    case 'triangle':
    // selectedItem = new TriangleObject(item);
    break;

    case 'text':
    // selectedItem = new TextObject(item);
    break;

    case 'ellipse':
    selectedItem = new EllipseObject(item);
    break;

    case 'ray':
    // selectedItem = new RayObject(item);
    break;
    case 'line':
    // selectedItem = new LineObject(item);
    break;
    
    case 'lines':
    // selectedItem = new LinesObject(item);
    break;

    case 'rect':
    selectedItem = new Rectangle(item );
    break;
    
    case 'image':    
    // selectedItem = new ImageObject(item);
    break;
    
    case 'image2':    
    // selectedItem = new Image2Object(item);
    break;
    
    case 'circle':
    selectedItem = new Circle(item);
    break;

    default:
        if(!selectedItem){throw new Error("Item type not found");}
        break;
       
}

return selectedItem; 
}

///////////////////////////////////////////////////////////////////////////
