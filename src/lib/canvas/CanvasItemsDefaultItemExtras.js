import uuid from "../uuid";

export default class CanvasItemsDefaultItemExtras {
  static text() { 
    return {
      uuid: uuid(),
      text: "Add text..",
      x: 100,
      y: 100,
      command: 'text',
      fontSize: 30,
      fontFamily: "Arial",
      font: "30px Arial",
      color: "black",
      globalAlpha: 1
    };
  }

  static line() {
    return {
      uuid: uuid(),
      command: 'line',
      x1: 100,
      y1: 100,
      x2: 300,
      y2: 300,
      lineWidth: 1,
      color: "red",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static rect() {
    return {
      uuid: uuid(),
      command: 'rect',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      filled: true,
      lineWidth: 1,
      color: "red",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static para() {
    return {
      uuid: uuid(),
      command: 'para',
      text: `Hello 
Hello
Hello`,
      x: 100,
      y: 100,
      font: "20px Arial",
      fontSize: 20,
      fontFamily: "Arial",
      lineHeightOffset: 10,
      xOffset: 25,
      color: "blue",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static ellipse() {
    return {
      uuid: uuid(),
      command: 'ellipse',
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

  static circle() {
    return {
      uuid: uuid(),
      command: 'circle',
      x: 100,
      y: 150,
      radius: 100,
      startAngle: 0,
      endAngle: 360,
      fill: false,
      lineWidth: 1,
      color: "black",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static piechart() {
    return {
      uuid: uuid(),
      command: 'piechart',
      x: 100,
      y: 100,
      radius: 50,
      data:'[{"title": "A", "percent": 30, "color": "red"}, {"title": "B", "percent": 50, "color": "blue"}, {"title": "C", "percent": 20, "color": "green"}]',
      color: "black",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static lines() {
    return {
      uuid: uuid(),
      command: 'lines',
      x: 100,
      y: 100,
      drawBorder: false,
      fill: true,
      color: 'yellow',
      fillBg: false,
      bgColor: 'red',
      width: 300,
      height: 200,
      lines: [
        {x: 0, y: 35},
        {x: 70, y: 35},
        {x: 70, y: 20},
        {x: 100, y: 50},
        {x: 70, y: 80},
        {x: 70, y: 65},
        {x: 0, y: 65},
        {x: 0, y: 35}
      ],
      showAt: 0,
      globalAlpha: 1
    };
  }

  static angleSymbol() {
    return {
      uuid: uuid(),
      command: 'angleSymbol',
      x: 100,
      y: 100,
      radius: 25,
      ticks: 3,
      startAngle: -90,
      endAngle: 0,
      lineWidth: 1,
      showOrigin: true,
      color: "red",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static dot() {
    return {
      uuid: uuid(),
      command: 'dot',
      x: 100,
      y: 100,
      label: "label",
      dot_width: 25,
      text_color: "yellowbezier",
      text_size: 40,
      fill: true,
      color: "red",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static icon() {
    return {
      uuid: uuid(),
      command: 'icon',
      text: "This is Heading",
      x: 100,
      y: 100,
      fontSize: 28,
      iconSize: 100,
      fontFamily: 'Arial',
      icon: '🦏',
      showBg: false,
      iconOnTop: true,
      iconErrorX: 0,
      iconErrorY: 0,
      bgColor: 'gray',
      color: "red",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static polygon() {
    return {
      uuid: uuid(),
      command: 'polygon',
      points: [100,100,150,200,10,100],
      filled: false,
      lineWidth: 1,
      color: "black",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static triangle() {
    return {
      uuid: uuid(),
      command: 'triangle',
      x1: 100,
      y1: 100,
      x2: 50,
      y2: 200,
      x3: 200,
      y3: 200,
      lineWidth: 2,
      filled: false,
      color: "red",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static ray() {
    return {
      uuid: uuid(),
      command: 'ray',
      x0: 100,
      y0: 100,
      x1: 800,
      y1: 300,
      lineWidth: 2,
      arrowWidth: 8,
      arrowHeight: 12,
      startArrow: true,
      endArrow: true,
      color: "yellow",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static image() {
    return {
      uuid: uuid(),
      command: 'image',
      src: null,
      image: null,
      x: 50,
      y: 50,
      ext: 'jpg',
      width: 200,
      height: 200,
      color: "black",
      showAt: 0,
      globalAlpha: 1
    };
  }

  static sprite() {
    return {
      uuid: uuid(),
      command: 'sprite',
      spriteId: "000",
      sheet: "students",
      sheetItem: "student_w_tablet",
      x: 100,
      y: 100,
      width: 0.5,
      height: 0.5,
      color: "red",
      showAt: 0,
      globalAlpha: 1
    };
  }
}