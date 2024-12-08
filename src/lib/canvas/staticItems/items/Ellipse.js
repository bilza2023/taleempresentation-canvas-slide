import  uuid  from '../../../uuid';

// remove item in draw
export default class Ellipse {
  
  static data() { 
    return {
        uuid: uuid(),
        type: 'ellipse',
        x: 100,
        y: 100,
        radiusX: 50,
        radiusY: 75,
        rotation: 0,
        startAngle: 0,
        endAngle: 360,
        lineWidth: 1,
        fill: false,
        color: "red",
        showAt: 0,
        globalAlpha: 1
    };
  }

  
  static draw(ctx, itemExtra,assets) {

  }
}