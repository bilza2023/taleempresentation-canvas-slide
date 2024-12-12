import { c as create_ssr_component, b as add_attribute, a as subscribe, o as onDestroy, d as get_store_value, e as escape, v as validate_component, f as each, h as createEventDispatcher, m as missing_component } from "../../../chunks/ssr.js";
import { C as Canvas, u as uuid } from "../../../chunks/people.js";
import { w as writable } from "../../../chunks/index.js";
import "katex";
/* empty css                                                    */
const AppToolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { createNewSlide } = $$props;
  let { importFile } = $$props;
  let { saveSlide } = $$props;
  let { fileNameToSave } = $$props;
  if ($$props.createNewSlide === void 0 && $$bindings.createNewSlide && createNewSlide !== void 0) $$bindings.createNewSlide(createNewSlide);
  if ($$props.importFile === void 0 && $$bindings.importFile && importFile !== void 0) $$bindings.importFile(importFile);
  if ($$props.saveSlide === void 0 && $$bindings.saveSlide && saveSlide !== void 0) $$bindings.saveSlide(saveSlide);
  if ($$props.fileNameToSave === void 0 && $$bindings.fileNameToSave && fileNameToSave !== void 0) $$bindings.fileNameToSave(fileNameToSave);
  return `<div class="flex p-0 m-0 bg-gray-900 text-white gap-2 py-1"><button class="text-[10px]" data-svelte-h="svelte-1p5k4b2">New 📰</button>  <label class="text-[10px] ml-2 cursor-pointer">Import 📂
      <input type="file" accept=".js" class="hidden"></label> <button class="text-[10px]" data-svelte-h="svelte-wzkfty">Save 💾</button> <input class="text-[10px] p-0 text-white bg-gray-600 rounded-md text-center" type="text"${add_attribute("value", fileNameToSave, 0)}></div>`;
});
const ctxStore = writable(null);
const selectedItemIndexStore = writable(-1);
class Eqs {
  static availableEqsSpItems() {
    return ["code", "text", "img", "heading", "table", "tableCode"];
  }
  static getEqsSpItem(type) {
    if (!Eqs.availableEqsSpItems().includes(type)) {
      throw new Error(`Invalid item type: ${type}`);
    }
    const EqsSpItemTypes = {
      "code": { code: "", type: "code" },
      "text": { code: "", type: "text" },
      "img": { code: "wood", type: "image" },
      "heading": { code: "", type: "heading" },
      "table": { code: `[["",""],["",""]]`, type: "table" },
      "tableCode": { code: `[["",""],["",""]]`, type: "tableCode" }
    };
    const newItem = EqsSpItemTypes[type];
    if (!newItem) {
      throw new Error(`Invalid item type: ${type}`);
    }
    return newItem;
  }
  static availableEqsItems() {
    return ["hdg", "code", "txt"];
  }
  static getNewItem() {
    let newItem = SlideObject.getNewItem();
    newItem.itemExtra = {
      startTime: 0,
      endTime: 0,
      code: "",
      type: "code",
      // 'text' , 'heading'
      sp: []
    };
    return newItem;
  }
  // static checkHealth(slide, fix = false){
  //     return eqsHealth(slide,fix);
  // }
}
async function upgrade2Basic(slides) {
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    switch (slide.type) {
      case "canvas":
        upgradeCanvas(slide);
        break;
      case "Eqs":
      case "eqs":
        upgradeEqs(slide);
        break;
    }
  }
  return slides;
}
function upgradeEqs(slide) {
  if (slide.extra) {
    slide.slideExtra = null;
    slide.slideExtra = slide.extra;
    slide.extra = null;
  }
  for (let j = 0; j < slide.items.length; j++) {
    const item = slide.items[j];
    if (item.extra) {
      item.itemExtra = item.extra;
      item.itemExtra = simplifyJSON(item.itemExtra, ["sp"]);
      item.extra = null;
    }
  }
  return slide;
}
function upgradeCanvas(slide) {
  if (slide.extra) {
    slide.slideExtra = null;
    slide.slideExtra = slide.extra;
    slide.extra = null;
  }
  for (let j = 0; j < slide.items.length; j++) {
    const item = slide.items[j];
    if (item.extra) {
      item.itemExtra = item.extra;
      item.itemExtra = simplifyJSON(item.itemExtra);
      item.extra = null;
    }
  }
}
function simplifyJSON(data, dontChangeField = []) {
  if (typeof data !== "object" || data === null) {
    return data;
  }
  const simplified = {};
  for (const [key, value] of Object.entries(data)) {
    if (key === "setCommands") {
      continue;
    }
    if (dontChangeField.includes(key)) {
      simplified[key] = value;
      continue;
    }
    if (typeof value === "object" && value !== null && "initialValue" in value) {
      simplified[key] = value.initialValue;
    } else if (typeof value === "object" && value !== null) {
      simplified[key] = simplifyJSON(value, dontChangeField);
    } else {
      simplified[key] = value;
    }
  }
  return simplified;
}
class SlideObject {
  static Canvas = Canvas;
  static Eqs = Eqs;
  static upgrade2Basic(slides) {
    return upgrade2Basic(slides);
  }
  static getNewItem(itemExtra = {}, name = "", content = "") {
    if (!name) {
      const uuidValue = uuid();
      const firstSegment = uuidValue.split("-")[0];
      name = firstSegment;
    }
    return {
      uuid: uuid(),
      //added on 31-may 2024 --not used yet 
      name,
      content,
      showAt: 0,
      hideAt: null,
      //added on 31-may 2024 --not used yet
      itemExtra
    };
  }
  static getNewSlide(type) {
    if (!this.availableSlideTypes().includes(type)) {
      throw new Error(`Invalid slide type: ${type}`);
    }
    return {
      uuid: uuid(),
      version: "basic",
      startTime: 0,
      endTime: 10,
      type,
      template: "",
      items: [],
      slideExtra: {}
    };
  }
  static availableSlideTypes() {
    return ["canvas", "Eqs"];
  }
}
function loadImage(itemExtra) {
  const img = new Image();
  img.src = itemExtra.src;
  img.onload = () => {
    itemExtra.image = img;
  };
  img.onerror = () => {
    console.error(`Image failed to load: ${itemExtra.src}`);
  };
}
const CanvasPlayer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_ctxStore;
  $$unsubscribe_ctxStore = subscribe(ctxStore, (value) => value);
  let { slideExtra = {} } = $$props;
  let { items } = $$props;
  let { assets } = $$props;
  let { preDraw = () => {
  } } = $$props;
  let { postDraw = () => {
  } } = $$props;
  let { eventMouseMove = () => {
  } } = $$props;
  let { eventMouseDown = () => {
  } } = $$props;
  let { eventMouseUp = () => {
  } } = $$props;
  let { eventClick = () => {
  } } = $$props;
  let { eventDblClick = () => {
  } } = $$props;
  let canvas;
  onDestroy(() => {
  });
  if ($$props.slideExtra === void 0 && $$bindings.slideExtra && slideExtra !== void 0) $$bindings.slideExtra(slideExtra);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.assets === void 0 && $$bindings.assets && assets !== void 0) $$bindings.assets(assets);
  if ($$props.preDraw === void 0 && $$bindings.preDraw && preDraw !== void 0) $$bindings.preDraw(preDraw);
  if ($$props.postDraw === void 0 && $$bindings.postDraw && postDraw !== void 0) $$bindings.postDraw(postDraw);
  if ($$props.eventMouseMove === void 0 && $$bindings.eventMouseMove && eventMouseMove !== void 0) $$bindings.eventMouseMove(eventMouseMove);
  if ($$props.eventMouseDown === void 0 && $$bindings.eventMouseDown && eventMouseDown !== void 0) $$bindings.eventMouseDown(eventMouseDown);
  if ($$props.eventMouseUp === void 0 && $$bindings.eventMouseUp && eventMouseUp !== void 0) $$bindings.eventMouseUp(eventMouseUp);
  if ($$props.eventClick === void 0 && $$bindings.eventClick && eventClick !== void 0) $$bindings.eventClick(eventClick);
  if ($$props.eventDblClick === void 0 && $$bindings.eventDblClick && eventDblClick !== void 0) $$bindings.eventDblClick(eventDblClick);
  {
    {
      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        if (element.itemExtra.type == "image") {
          loadImage(element.itemExtra);
        }
      }
    }
  }
  $$unsubscribe_ctxStore();
  return `<div class="flex justify-center w-full"><canvas class="w-full m-2"${add_attribute("width", slideExtra.canvasWidth, 0)}${add_attribute("height", slideExtra.canvasHeight, 0)}${add_attribute("this", canvas, 0)}></canvas></div>`;
});
class ItemObject {
  constructor(itemData, assets) {
    this.itemData = itemData;
    this.assets = assets;
  }
  isVisible() {
    return true;
  }
  getBounds() {
    return {
      x: this.boundingRectangleX(),
      y: this.boundingRectangleY(),
      width: this.width,
      height: this.height
    };
  }
  // Modify isHit to use getBounds
  isHit(mouseX, mouseY) {
    const bounds = this.getBounds();
    return mouseX >= bounds.x && mouseX <= bounds.x + bounds.width && mouseY >= bounds.y && mouseY <= bounds.y + bounds.height;
  }
  // Position getters and setters
  boundingRectangleX() {
    return this.itemData.itemExtra.x;
  }
  boundingRectangleY() {
    return this.itemData.itemExtra.y;
  }
  get x() {
    return this.itemData.itemExtra.x;
  }
  set x(newX) {
    this.itemData.itemExtra.x = newX;
  }
  get y() {
    return this.itemData.itemExtra.y;
  }
  set y(newY) {
    this.itemData.itemExtra.y = newY;
  }
  // Dimension getters and setters
  get width() {
    return this.itemData.itemExtra.width;
  }
  //because we expect to get dx and dy
  set width(newWidth) {
    this.itemData.itemExtra.width += newWidth;
  }
  get height() {
    return this.itemData.itemExtra.height;
  }
  //because we expect to get dx and dy
  set height(newHeight) {
    this.itemData.itemExtra.height += newHeight;
  }
}
class Rectangle extends ItemObject {
  constructor(itemData, assets) {
    super(itemData, assets);
    this.dialogueBox = [
      {
        componentName: "Number",
        title: "x",
        props: {}
      },
      {
        componentName: "Number",
        title: "y",
        props: {}
      },
      {
        componentName: "Number",
        title: "width",
        props: {
          min: "1",
          max: "500"
        }
      },
      {
        componentName: "Number",
        title: "height",
        props: {
          min: "1",
          max: "500"
        }
      },
      {
        componentName: "Number",
        title: "lineWidth",
        props: {}
      },
      {
        componentName: "Tf",
        title: "filled",
        props: {}
      },
      {
        componentName: "Color",
        title: "color",
        props: {}
      },
      {
        componentName: "Number",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      },
      //gap-dash
      {
        componentName: "Number",
        title: "dash",
        props: {}
      },
      {
        componentName: "Number",
        title: "gap",
        props: {}
      }
    ];
  }
  ////////////////////////////////////////////////////
}
class ImageObject extends ItemObject {
  constructor(itemData, assets) {
    super(itemData, assets);
    if (this.itemData.itemExtra.src == null || this.itemData.itemExtra.image == null) {
      this.itemData.itemExtra.src = "/system_images/gen/wood.jpg";
    }
    this.loadImage();
    this.dialogueBox = [
      {
        componentName: "TrText",
        title: "src",
        props: {}
      },
      {
        componentName: "TrText",
        // Representing the button for extension type
        title: "ext",
        props: {
          options: ["jpg", "png"],
          // Custom handling for the buttons
          current: "jpg"
          // Current selected ext
        }
      },
      {
        componentName: "TrNo",
        title: "x",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "y",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "width",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "height",
        props: {}
      },
      // CommonCommands
      {
        componentName: "TrText",
        title: "name",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "color",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "showAt",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      },
      // gap-dash
      {
        componentName: "TrPropNumber",
        title: "dash",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "gap",
        props: {}
      },
      // ShadowCommands
      {
        componentName: "TrNo",
        title: "shadowOffsetX",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowOffsetY",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowBlur",
        props: {}
      },
      {
        componentName: "TrColor",
        title: "shadowColor",
        props: {}
      }
    ];
  }
  loadImage() {
    const img = new Image();
    img.src = this.itemData.itemExtra.src;
    img.onload = () => {
      this.itemData.itemExtra.image = img;
    };
    img.onerror = () => {
      console.error(`Image failed to load: ${this.itemData.itemExtra.src}`);
    };
  }
  ///////////////////////////////////////////////////
}
class Circle extends ItemObject {
  constructor(itemData, assets) {
    super(itemData, assets);
    this.dialogueBox = [
      {
        componentName: "TrPropNumber",
        title: "x",
        props: {
          min: 0,
          max: 1e3
        }
      },
      {
        componentName: "TrPropNumber",
        title: "y",
        props: {
          min: 0,
          max: 500
        }
      },
      {
        componentName: "TrPropNumber",
        title: "radius",
        props: {
          min: 0,
          max: 500
        }
      },
      {
        componentName: "TrPropNumber",
        title: "startAngle",
        props: {
          min: 0,
          max: 25
        }
      },
      {
        componentName: "TrPropNumber",
        title: "endAngle",
        props: {
          min: 0,
          max: 25
        }
      },
      {
        componentName: "TrPropNumber",
        title: "lineWidth",
        props: {
          min: 0,
          max: 25
        }
      },
      {
        componentName: "TrPropBoolean",
        title: "fill",
        props: {}
      },
      // CommonCommands
      {
        componentName: "TrText",
        title: "name",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "color",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "showAt",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      },
      // gap-dash
      {
        componentName: "TrPropNumber",
        title: "dash",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "gap",
        props: {}
      },
      // shadow
      {
        componentName: "TrNo",
        title: "shadowOffsetX",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowOffsetY",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowBlur",
        props: {}
      },
      {
        componentName: "TrColor",
        title: "shadowColor",
        props: {}
      }
    ];
  }
  draw(ctx) {
    ctx.save();
    const x = this.itemData.itemExtra.x;
    const y = this.itemData.itemExtra.y;
    const radius = this.itemData.itemExtra.radius;
    const color = this.itemData.itemExtra.color || "black";
    const fill = this.itemData.itemExtra.fill || false;
    const startAngle = this.itemData.itemExtra.startAngle || 0 * (Math.PI / 180);
    const endAngle = (this.itemData.itemExtra.endAngle || 360) * (Math.PI / 180);
    const dash = this.itemData.itemExtra.dash || 0;
    const gap = this.itemData.itemExtra.gap || 0;
    const lineWidth = this.itemData.itemExtra.lineWidth || 1;
    const globalAlpha = this.itemData.itemExtra.globalAlpha || 1;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = globalAlpha;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    if (fill) {
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.strokeStyle = color;
      if (dash === 0 && gap === 0) {
        ctx.setLineDash([]);
      } else {
        ctx.setLineDash([dash, gap]);
      }
      ctx.stroke();
    }
    ctx.restore();
  }
  ////////////////////////////////////////////////////////////////////
  // Position getters and setters
  boundingRectangleX() {
    return this.itemData.itemExtra.x - this.itemData.itemExtra.radius;
  }
  boundingRectangleY() {
    return this.itemData.itemExtra.y - this.itemData.itemExtra.radius;
  }
  get x() {
    return this.itemData.itemExtra.x;
  }
  set x(newX) {
    this.itemData.itemExtra.x = newX;
  }
  get y() {
    return this.itemData.itemExtra.y;
  }
  set y(newY) {
    this.itemData.itemExtra.y = newY;
  }
  // Dimension getters and setters
  get width() {
    return this.itemData.itemExtra.radius * 2;
  }
  set width(newWidth) {
    this.itemData.itemExtra.radius += newWidth;
  }
  get height() {
    return this.itemData.itemExtra.radius * 2;
  }
  set height(newHeight) {
    this.itemData.itemExtra.radius += newHeight;
  }
  ////////////////////////////////////////////////////////////////////
  // 
}
class RayObject extends ItemObject {
  constructor(itemData = null, assets) {
    super(itemData, assets);
  }
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  boundingRectangleX() {
    const x1 = this.itemData.itemExtra.x1;
    const x2 = this.itemData.itemExtra.x2;
    return Math.min(x1, x2);
  }
  boundingRectangleY() {
    const y1 = this.itemData.itemExtra.y1;
    const y2 = this.itemData.itemExtra.y2;
    return Math.min(y1, y2);
  }
  get x() {
    return this.boundingRectangleX();
  }
  set x(newX) {
    const deltaX = newX - this.x;
    this.itemData.itemExtra.x1 += deltaX;
    this.itemData.itemExtra.x2 += deltaX;
  }
  get y() {
    return this.boundingRectangleY();
  }
  set y(newY) {
    const deltaY = newY - this.y;
    this.itemData.itemExtra.y1 += deltaY;
    this.itemData.itemExtra.y2 += deltaY;
  }
  get width() {
    const x1 = this.itemData.itemExtra.x1;
    const x2 = this.itemData.itemExtra.x2;
    return Math.abs(x2 - x1);
  }
  set width(newWidth) {
    this.itemData.itemExtra.x2 += newWidth;
  }
  get height() {
    const y1 = this.itemData.itemExtra.y1;
    const y2 = this.itemData.itemExtra.y2;
    return Math.abs(y2 - y1);
  }
  set height(newHeight) {
    this.itemData.itemExtra.y2 += newHeight;
  }
  ///////////////////////////////////////////////////////////////////////////
}
class LinesObject extends ItemObject {
  constructor(itemData = null, assets) {
    super(itemData, assets);
    this.dialogueBox = [
      {
        componentName: "InputNumber",
        title: "x",
        props: {}
      },
      {
        componentName: "InputNumber",
        title: "y",
        props: {}
      },
      {
        componentName: "InputNumber",
        title: "width",
        props: {
          min: "1",
          max: "500"
        }
      },
      {
        componentName: "InputNumber",
        title: "height",
        props: {
          min: "1",
          max: "500"
        }
      },
      {
        componentName: "TrTf",
        title: "drawBorder"
      },
      {
        componentName: "TrTf",
        title: "fill"
      },
      {
        componentName: "TrTf",
        title: "fillBg"
      },
      {
        componentName: "TrColor",
        title: "color"
      },
      {
        componentName: "TrColor",
        title: "bgColor"
      }
    ];
  }
  // : 'yellow',
  // : 'red',
}
class LineObject extends ItemObject {
  constructor(itemData = null, assets) {
    super(itemData, assets);
  }
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  boundingRectangleX() {
    const x1 = this.itemData.itemExtra.x1;
    const x2 = this.itemData.itemExtra.x2;
    return Math.min(x1, x2);
  }
  boundingRectangleY() {
    const y1 = this.itemData.itemExtra.y1;
    const y2 = this.itemData.itemExtra.y2;
    return Math.min(y1, y2);
  }
  get x() {
    return this.boundingRectangleX();
  }
  set x(newX) {
    const deltaX = newX - this.x;
    this.itemData.itemExtra.x1 += deltaX;
    this.itemData.itemExtra.x2 += deltaX;
  }
  get y() {
    return this.boundingRectangleY();
  }
  set y(newY) {
    const deltaY = newY - this.y;
    this.itemData.itemExtra.y1 += deltaY;
    this.itemData.itemExtra.y2 += deltaY;
  }
  get width() {
    const x1 = this.itemData.itemExtra.x1;
    const x2 = this.itemData.itemExtra.x2;
    return Math.abs(x2 - x1);
  }
  set width(newWidth) {
    this.itemData.itemExtra.x2 += newWidth;
  }
  get height() {
    const y1 = this.itemData.itemExtra.y1;
    const y2 = this.itemData.itemExtra.y2;
    return Math.abs(y2 - y1);
  }
  set height(newHeight) {
    this.itemData.itemExtra.y2 += newHeight;
  }
  ///////////////////////////////////////////////////////////////////////////
}
class EllipseObject extends ItemObject {
  constructor(itemData, assets) {
    super(itemData, assets);
    this.dialogueBox = [
      {
        componentName: "TrPropNumber",
        title: "x",
        props: {
          min: 0,
          max: 50
        }
      },
      {
        componentName: "TrPropNumber",
        title: "y",
        props: {
          min: 0,
          max: 50
        }
      },
      {
        componentName: "TrPropNumber",
        title: "radiusX",
        props: {
          min: 0,
          max: 500
        }
      },
      {
        componentName: "TrPropNumber",
        title: "radiusY",
        props: {
          min: 0,
          max: 500
        }
      },
      {
        componentName: "TrPropNumber",
        title: "rotation",
        props: {
          min: 0,
          max: 200
        }
      },
      {
        componentName: "TrPropNumber",
        title: "startAngle",
        props: {
          min: 0,
          max: 500
        }
      },
      {
        componentName: "TrPropNumber",
        title: "endAngle",
        props: {
          min: 0,
          max: 500
        }
      },
      {
        componentName: "TrPropNumber",
        title: "lineWidth",
        props: {
          min: 0,
          max: 25
        }
      },
      {
        componentName: "TrPropBoolean",
        title: "fill",
        props: {}
      },
      // CommonCommands
      {
        componentName: "TrText",
        title: "name",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "color",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "showAt",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      },
      // gap-dash
      {
        componentName: "TrPropNumber",
        title: "dash",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "gap",
        props: {}
      },
      // ShadowCommands
      {
        componentName: "TrNo",
        title: "shadowOffsetX",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowOffsetY",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowBlur",
        props: {}
      },
      {
        componentName: "TrColor",
        title: "shadowColor",
        props: {}
      }
    ];
  }
  draw(ctx) {
    ctx.save();
    const x = this.itemData.itemExtra.x;
    const y = this.itemData.itemExtra.y;
    const radiusX = this.itemData.itemExtra.radiusX;
    const radiusY = this.itemData.itemExtra.radiusY;
    const color = this.itemData.itemExtra.color || "black";
    const fill = this.itemData.itemExtra.fill || false;
    const rotation = this.itemData.itemExtra.rotation || 0 * (Math.PI / 180);
    const startAngle = this.itemData.itemExtra.startAngle || 0 * (Math.PI / 180);
    const endAngle = this.itemData.itemExtra.endAngle || 360 * (Math.PI / 180);
    const lineWidth = this.itemData.itemExtra.lineWidth || 1;
    const dash = this.itemData.itemExtra.dash || 0;
    const gap = this.itemData.itemExtra.gap || 0;
    const globalAlpha = this.itemData.itemExtra.globalAlpha || 1;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = globalAlpha;
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
    if (fill) {
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.strokeStyle = color;
      if (dash === 0 && gap === 0) {
        ctx.setLineDash([]);
      } else {
        ctx.setLineDash([dash, gap]);
      }
      ctx.stroke();
    }
    ctx.restore();
  }
  ////////////////////////////////////////////////////
  boundingRectangleX() {
    return this.itemData.itemExtra.x - this.itemData.itemExtra.radiusX;
  }
  boundingRectangleY() {
    return this.itemData.itemExtra.y - this.itemData.itemExtra.radiusY;
  }
  get width() {
    return this.itemData.itemExtra.radiusX * 2;
  }
  set width(newWidth) {
    this.itemData.itemExtra.radiusX += newWidth;
  }
  get height() {
    return this.itemData.itemExtra.radiusY * 2;
  }
  set height(newHeight) {
    this.itemData.itemExtra.radiusY += newHeight;
  }
}
class TextObject extends ItemObject {
  constructor(itemData, fnList) {
    super(itemData, fnList);
    this._width = 50;
    this._height = 25;
    this.dialogueBox = [
      {
        componentName: "TrPropText",
        title: "text",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "x",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "y",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "fontSize",
        props: {}
      },
      // CommonCommands
      {
        componentName: "TrText",
        title: "name",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "color",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "showAt",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      },
      // Gap-dash
      {
        componentName: "TrPropNumber",
        title: "dash",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "gap",
        props: {}
      },
      // ShadowCommands
      {
        componentName: "TrNo",
        title: "shadowOffsetX",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowOffsetY",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowBlur",
        props: {}
      },
      {
        componentName: "TrColor",
        title: "shadowColor",
        props: {}
      }
    ];
  }
  ////////////////////////////////////////////////////
  boundingRectangleX() {
    return this.itemData.itemExtra.x;
  }
  boundingRectangleY() {
    return this.itemData.itemExtra.y;
  }
  get width() {
    return this._width;
  }
  set width(newWidth) {
    this.itemData.itemExtra.fontSize += newWidth;
  }
  get height() {
    return this._height;
  }
  set height(newHeight) {
    this.itemData.itemExtra.fontSize += newHeight;
  }
}
class TriangleObject extends ItemObject {
  constructor(itemData, fnList) {
    super(itemData, fnList);
    this.dialogueBox = [
      {
        componentName: "TrPropNumber",
        title: "x1",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "y1",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "x2",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "y2",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "x3",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "y3",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "lineWidth",
        props: {}
      },
      {
        componentName: "TrPropBoolean",
        title: "filled",
        props: {}
      },
      // GapDashCommands
      {
        componentName: "TrPropNumber",
        title: "dash",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "gap",
        props: {}
      },
      // CommonCommands
      {
        componentName: "TrText",
        title: "name",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "color",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "showAt",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      },
      // ShadowCommands
      {
        componentName: "TrNo",
        title: "shadowOffsetX",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowOffsetY",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowBlur",
        props: {}
      },
      {
        componentName: "TrColor",
        title: "shadowColor",
        props: {}
      }
    ];
  }
  get x() {
    return this.boundingRectangleX();
  }
  set x(newX) {
    const deltaX = newX - this.x;
    this.itemData.itemExtra.x1 += deltaX;
    this.itemData.itemExtra.x2 += deltaX;
    this.itemData.itemExtra.x3 += deltaX;
  }
  get y() {
    return this.boundingRectangleY();
  }
  set y(newY) {
    const deltaY = newY - this.y;
    this.itemData.itemExtra.y1 += deltaY;
    this.itemData.itemExtra.y2 += deltaY;
    this.itemData.itemExtra.y3 += deltaY;
  }
  boundingRectangleX() {
    const x1 = this.itemData.itemExtra.x1;
    const x2 = this.itemData.itemExtra.x2;
    const x3 = this.itemData.itemExtra.x3;
    return Math.min(x1, x2, x3);
  }
  boundingRectangleY() {
    const y1 = this.itemData.itemExtra.y1;
    const y2 = this.itemData.itemExtra.y2;
    const y3 = this.itemData.itemExtra.y3;
    return Math.min(y1, y2, y3);
  }
  get width() {
    const x1 = this.itemData.itemExtra.x1;
    const x2 = this.itemData.itemExtra.x2;
    const x3 = this.itemData.itemExtra.x3;
    return Math.max(x1, x2, x3) - Math.min(x1, x2, x3);
  }
  set width(deltaWidth) {
    if (deltaWidth === 0) return;
    const leftX = this.boundingRectangleX();
    const scale = (this.width + deltaWidth) / this.width;
    this.itemData.itemExtra.x1 = leftX + (this.itemData.itemExtra.x1 - leftX) * scale;
    this.itemData.itemExtra.x2 = leftX + (this.itemData.itemExtra.x2 - leftX) * scale;
    this.itemData.itemExtra.x3 = leftX + (this.itemData.itemExtra.x3 - leftX) * scale;
  }
  get height() {
    const y1 = this.itemData.itemExtra.y1;
    const y2 = this.itemData.itemExtra.y2;
    const y3 = this.itemData.itemExtra.y3;
    return Math.max(y1, y2, y3) - Math.min(y1, y2, y3);
  }
  set height(deltaHeight) {
    if (deltaHeight === 0) return;
    const topY = this.boundingRectangleY();
    const scale = (this.height + deltaHeight) / this.height;
    this.itemData.itemExtra.y1 = topY + (this.itemData.itemExtra.y1 - topY) * scale;
    this.itemData.itemExtra.y2 = topY + (this.itemData.itemExtra.y2 - topY) * scale;
    this.itemData.itemExtra.y3 = topY + (this.itemData.itemExtra.y3 - topY) * scale;
  }
}
class ParaObject extends ItemObject {
  constructor(itemData, assets) {
    super(itemData, assets);
    this._width = 50;
    this._height = 25;
    this.dialogueBox = [
      {
        componentName: "TrTextArea",
        title: "text",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "x",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "y",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "fontSize",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "lineHeightOffset",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "xOffset",
        props: {}
      },
      // CommonCommands
      {
        componentName: "TrText",
        title: "name",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "color",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "showAt",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      },
      // Gap-dash
      {
        componentName: "TrPropNumber",
        title: "dash",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "gap",
        props: {}
      },
      // ShadowCommands
      {
        componentName: "TrNo",
        title: "shadowOffsetX",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowOffsetY",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowBlur",
        props: {}
      },
      {
        componentName: "TrColor",
        title: "shadowColor",
        props: {}
      }
    ];
  }
  boundingRectangleX() {
    return this.itemData.itemExtra.x;
  }
  boundingRectangleY() {
    return this.itemData.itemExtra.y;
  }
  get width() {
    return this._width;
  }
  set width(newWidth) {
    this.itemData.itemExtra.fontSize += newWidth;
  }
  get height() {
    return this._height;
  }
  set height(newHeight) {
    this.itemData.itemExtra.fontSize += newHeight;
  }
}
class AngleObject extends ItemObject {
  constructor(itemData, assets) {
    super(itemData, assets);
    this.dialogueBox = [
      {
        componentName: "TrNo",
        title: "x",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "y",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "radius",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "ticks",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "startAngle",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "endAngle",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "lineWidth",
        props: {}
      },
      {
        componentName: "TrTf",
        title: "showOrigin",
        props: {}
      },
      // CommonCommands
      {
        componentName: "TrText",
        title: "name",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "color",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "showAt",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      },
      // ShadowCommands
      {
        componentName: "TrNo",
        title: "shadowOffsetX",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowOffsetY",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "shadowBlur",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "shadowColor",
        props: {}
      }
    ];
  }
  // Calculate the leftmost x coordinate of the arc's bounding box
  boundingRectangleX() {
    const x = this.itemData.itemExtra.x;
    const radius = this.itemData.itemExtra.radius;
    return x - radius - 10;
  }
  // Calculate the topmost y coordinate of the arc's bounding box
  boundingRectangleY() {
    const y = this.itemData.itemExtra.y;
    const radius = this.itemData.itemExtra.radius;
    return y - radius - 10;
  }
  get x() {
    return this.boundingRectangleX();
  }
  set x(newX) {
    const radius = this.itemData.itemExtra.radius;
    this.itemData.itemExtra.x = newX + radius + 10;
  }
  get y() {
    return this.boundingRectangleY();
  }
  set y(newY) {
    const radius = this.itemData.itemExtra.radius;
    this.itemData.itemExtra.y = newY + radius + 10;
  }
  get width() {
    const radius = this.itemData.itemExtra.radius;
    return (radius + 10) * 2;
  }
  set width(newWidth) {
    this.itemData.itemExtra.radius += newWidth;
  }
  get height() {
    const radius = this.itemData.itemExtra.radius;
    return (radius + 10) * 2;
  }
  set height(newHeight) {
    this.itemData.itemExtra.radius += newHeight;
  }
}
class SpriteObject extends ItemObject {
  constructor(itemData = null, assets) {
    super(itemData, assets);
    this.mouseOldX = 0;
    this.mouseOldY = 0;
    this.dialogueBox = [
      {
        componentName: "TrPropNumber",
        title: "dx",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "dy",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "wFactor",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "hFactor",
        props: {}
      },
      // CommonCommands
      {
        componentName: "TrText",
        title: "name",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "color",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "showAt",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      },
      // ShadowCommands
      {
        componentName: "TrNo",
        title: "shadowOffsetX",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowOffsetY",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "shadowBlur",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "shadowColor",
        props: {}
      }
    ];
  }
  ///////////////////////////////////////////
  // Position getters and setters
  boundingRectangleX() {
    return this.itemData.itemExtra.x;
  }
  boundingRectangleY() {
    return this.itemData.itemExtra.y;
  }
  get x() {
    return this.itemData.itemExtra.x;
  }
  set x(newX) {
    this.itemData.itemExtra.x = newX;
  }
  get y() {
    return this.itemData.itemExtra.y;
  }
  set y(newY) {
    this.itemData.itemExtra.y = newY;
  }
  // Dimension getters and setters
  get width() {
    let sprite;
    for (let i = 0; i < this.assets.spriteImages.length; i++) {
      const element = this.assets.spriteImages[i];
      if (element.name == this.itemData.itemExtra.sheet) {
        sprite = element;
        break;
      }
    }
    sprite.applyItem(this.itemData.itemExtra.sheetItem);
    return sprite.selectedData.sw * Math.abs(this.itemData.itemExtra.width);
  }
  get height() {
    let sprite;
    for (let i = 0; i < this.assets.spriteImages.length; i++) {
      const element = this.assets.spriteImages[i];
      if (element.name == this.itemData.itemExtra.sheet) {
        sprite = element;
        break;
      }
    }
    sprite.applyItem(this.itemData.itemExtra.sheetItem);
    return sprite.selectedData.sh * Math.abs(this.itemData.itemExtra.height);
  }
  set width(newWidth) {
    this.itemData.itemExtra.width += 0.01;
  }
  set height(newHeight) {
    this.itemData.itemExtra.height += 0.01;
  }
  ////////////////////////////////////////////////////
}
class DotObject extends ItemObject {
  constructor(itemData, assets) {
    super(itemData, assets);
    this.dialogueBox = [
      {
        componentName: "TrPropNumber",
        title: "x",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "y",
        props: {}
      },
      {
        componentName: "TrPropText",
        title: "label",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "dot_width",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "text_color",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "text_size",
        props: {}
      },
      // CommonCommands
      {
        componentName: "TrText",
        title: "name",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "color",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "showAt",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      }
    ];
  }
  ////////////////////////////////////////////////////////////
  draw(ctx) {
    const {
      x,
      y,
      label,
      dot_width,
      text_size,
      color,
      text_color,
      globalAlpha
    } = this.itemData.itemExtra;
    ctx.save();
    ctx.globalAlpha = globalAlpha;
    ctx.beginPath();
    ctx.arc(
      x,
      y,
      dot_width / 2,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = color;
    ctx.fill();
    ctx.font = `${text_size}px Arial`;
    ctx.fillStyle = text_color;
    ctx.fillText(
      label,
      parseInt(x) - parseInt(dot_width) / 2,
      parseInt(y) + parseInt(dot_width) * 2
    );
    ctx.restore();
  }
  ////////////////////////////////////////////////////
  boundingRectangleX() {
    return this.itemData.itemExtra.x - this.itemData.itemExtra.dot_width;
  }
  boundingRectangleY() {
    return this.itemData.itemExtra.y - this.itemData.itemExtra.dot_width;
  }
  get x() {
    return this.itemData.itemExtra.x;
  }
  set x(newX) {
    this.itemData.itemExtra.x = newX;
  }
  get y() {
    return this.itemData.itemExtra.y;
  }
  set y(newY) {
    this.itemData.itemExtra.y = newY;
  }
  // Dimension getters and setters
  get width() {
    return this.itemData.itemExtra.dot_width * 2;
  }
  set width(newWidth) {
    this.itemData.itemExtra.dot_width += newWidth;
  }
  get height() {
    return this.itemData.itemExtra.dot_width * 2;
  }
  set height(newHeight) {
    this.itemData.itemExtra.text_size += newHeight;
  }
  ////////////////////////////////////////////////////////////
}
class IconObject extends ItemObject {
  constructor(itemData, assets) {
    super(itemData, assets);
    this.dialogueBox = [
      {
        componentName: "TrPropText",
        title: "text",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "x",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "y",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "fontSize",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "iconSize",
        props: {}
      },
      {
        componentName: "TrText",
        title: "fontFamily",
        props: {}
      },
      {
        componentName: "TrTf",
        title: "showBg",
        props: {}
      },
      {
        componentName: "TrTf",
        title: "iconOnTop",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "bgColor",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "iconErrorX",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "iconErrorY",
        props: {}
      },
      // CommonCommands
      {
        componentName: "TrText",
        title: "name",
        props: {}
      },
      {
        componentName: "TrPropColor",
        title: "color",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "showAt",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      }
    ];
  }
  ////////////////////////////////////////////////////////////
  // eslint-disable-next-line no-unused-vars
  draw(ctx, currentTime) {
    ctx.save();
    const percent_rect_extra = 20;
    ctx.font = this.itemData.itemExtra.fontSize + "px " + this.itemData.itemExtra.fontFamily;
    const textWidth = ctx.measureText(this.itemData.itemExtra.text).width;
    const textHeight = ctx.measureText("W").width;
    ctx.font = this.itemData.itemExtra.iconSize + "px Arial";
    const iconWidth = ctx.measureText(this.itemData.itemExtra.icon).width;
    const iconHeight = ctx.measureText("W").width;
    const largerWidth = Math.max(textWidth, iconWidth);
    const extraWidth = percent_rect_extra * (largerWidth / 100);
    const rectangleWidth = largerWidth + extraWidth;
    const rectangleHeight = textHeight + iconHeight;
    const textXAdjust = Math.abs((rectangleWidth - textWidth) / 3);
    const iconXAdjust = Math.abs((iconWidth - rectangleWidth) / 2);
    if (this.itemData.itemExtra.showBg) {
      this.roundRect(
        ctx,
        this.itemData.itemExtra.x,
        this.itemData.itemExtra.y,
        rectangleWidth,
        rectangleHeight + 30 * rectangleHeight / 100,
        30,
        this.itemData.itemExtra.bgColor,
        true,
        1,
        0,
        0,
        this.itemData.itemExtra.globalAlpha
      );
    }
    ctx.globalAlpha = this.itemData.itemExtra.globalAlpha;
    this.text(
      ctx,
      this.itemData.itemExtra.icon,
      this.itemData.itemExtra.x + iconXAdjust + this.itemData.itemExtra.iconErrorX,
      this.itemData.itemExtra.y + this.itemData.itemExtra.iconErrorY,
      this.itemData.itemExtra.color,
      this.itemData.itemExtra.iconSize + "px Arial",
      0,
      0,
      0,
      "black",
      this.itemData.itemExtra.globalAlpha
    );
    ctx.globalAlpha = this.itemData.itemExtra.globalAlpha;
    this.text(
      ctx,
      this.itemData.itemExtra.text,
      this.itemData.itemExtra.x + textXAdjust,
      this.itemData.itemExtra.y + (iconHeight + 20 * iconHeight / 100),
      this.itemData.itemExtra.color,
      this.itemData.itemExtra.fontSize + "px " + this.itemData.itemExtra.fontFamily,
      0,
      0,
      0,
      "black",
      this.itemData.itemExtra.globalAlpha
    );
    ctx.restore();
  }
  // Implemented DrawLib methods
  roundRect(ctx, x, y, width, height, radius, color = "black", filled = false, lineWidth = 1, dash = 0, gap = 0, globalAlpha = 1) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.globalAlpha = globalAlpha;
    ctx.lineWidth = lineWidth;
    if (dash === 0 && gap === 0) {
      ctx.setLineDash([]);
    } else {
      ctx.setLineDash([dash, gap]);
    }
    if (filled) {
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.strokeStyle = color;
      ctx.stroke();
    }
    ctx.restore();
  }
  text(ctx, text, x, y, color = "black", font = "12px Arial", shadowOffsetX = 0, shadowOffsetY = 0, shadowBlur = 4, shadowColor = "gray", globalAlpha = 1) {
    ctx.save();
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.globalAlpha = globalAlpha;
    ctx.fillText(text, x, y);
    ctx.restore();
  }
  ////////////////////////////////////////////////////
  boundingRectangleX() {
    return this.itemData.itemExtra.x;
  }
  boundingRectangleY() {
    return this.itemData.itemExtra.y;
  }
  get x() {
    return this.itemData.itemExtra.x;
  }
  set x(newX) {
    this.itemData.itemExtra.x = newX;
  }
  get y() {
    return this.itemData.itemExtra.y;
  }
  set y(newY) {
    this.itemData.itemExtra.y = newY;
  }
  // Dimension getters and setters
  get width() {
    const percent_rect_extra = 20;
    get_store_value(ctxStore).font = `${this.itemData.itemExtra.fontSize}px ${this.itemData.itemExtra.fontFamily}`;
    const textWidth = get_store_value(ctxStore).measureText(this.itemData.itemExtra.text).width;
    get_store_value(ctxStore).font = `${this.itemData.itemExtra.iconSize}px Arial`;
    const iconWidth = get_store_value(ctxStore).measureText(this.itemData.itemExtra.icon).width;
    const largerWidth = Math.max(textWidth, iconWidth);
    const extraWidth = percent_rect_extra * (largerWidth / 100);
    return largerWidth + extraWidth;
  }
  set width(newWidth) {
    this.itemData.itemExtra.fontSize += newWidth;
  }
  get height() {
    get_store_value(ctxStore).font = `${this.itemData.itemExtra.fontSize}px ${this.itemData.itemExtra.fontFamily}`;
    const textHeight = get_store_value(ctxStore).measureText("W").width;
    get_store_value(ctxStore).font = `${this.itemData.itemExtra.iconSize}px Arial`;
    const iconHeight = get_store_value(ctxStore).measureText("W").width;
    return textHeight + iconHeight;
  }
  set height(newHeight) {
    this.itemData.itemExtra.iconSize += newHeight;
  }
  ////////////////////////////////////////////////////////////
}
class PieChartObject extends ItemObject {
  constructor(itemData, assets) {
    super(itemData, assets);
    this.dialogueBox = [
      {
        componentName: "TrTextArea",
        title: "data"
      },
      {
        componentName: "TrPropNumber",
        title: "x",
        props: {
          min: 0,
          max: 1e3
        }
      },
      {
        componentName: "TrPropNumber",
        title: "y",
        props: {
          min: 0,
          max: 500
        }
      },
      {
        componentName: "TrPropNumber",
        title: "radius",
        props: {
          min: 0,
          max: 500
        }
      },
      // CommonCommands
      {
        componentName: "TrText",
        title: "name",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "showAt",
        props: {}
      },
      {
        componentName: "TrPropNumber",
        title: "globalAlpha",
        props: {
          min: "0.0",
          max: "1.0",
          step: "0.1"
        }
      },
      // gap-dash
      // shadow
      {
        componentName: "TrNo",
        title: "shadowOffsetX",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowOffsetY",
        props: {}
      },
      {
        componentName: "TrNo",
        title: "shadowBlur",
        props: {}
      },
      {
        componentName: "TrColor",
        title: "shadowColor",
        props: {}
      }
    ];
  }
  // Calculate the leftmost x coordinate of the pie's bounding box
  boundingRectangleX() {
    const x = this.itemData.itemExtra.x;
    const radius = this.itemData.itemExtra.radius;
    const labelPadding = 20;
    return x - radius - labelPadding;
  }
  // Calculate the topmost y coordinate of the pie's bounding box
  boundingRectangleY() {
    const y = this.itemData.itemExtra.y;
    const radius = this.itemData.itemExtra.radius;
    const labelPadding = 20;
    return y - radius - labelPadding;
  }
  get x() {
    return this.boundingRectangleX();
  }
  set x(newX) {
    const radius = this.itemData.itemExtra.radius;
    const labelPadding = 20;
    this.itemData.itemExtra.x = newX + radius + labelPadding;
  }
  get y() {
    return this.boundingRectangleY();
  }
  set y(newY) {
    const radius = this.itemData.itemExtra.radius;
    const labelPadding = 20;
    this.itemData.itemExtra.y = newY + radius + labelPadding;
  }
  get width() {
    const radius = this.itemData.itemExtra.radius;
    const labelPadding = 20;
    return (radius + labelPadding) * 2;
  }
  set width(newWidth) {
    this.itemData.itemExtra.radius += newWidth;
  }
  get height() {
    const radius = this.itemData.itemExtra.radius;
    const labelPadding = 20;
    return (radius + labelPadding) * 2;
  }
  set height(newHeight) {
    this.itemData.itemExtra.radius += newHeight;
  }
}
function itemToObject(item, assets) {
  let selectedItem;
  let lookFor = item.itemExtra.type;
  switch (lookFor) {
    case "piechart":
      selectedItem = new PieChartObject(item, assets);
      break;
    case "repeatText":
      break;
    case "repeatDot":
      break;
    case "icon":
      selectedItem = new IconObject(item, assets);
      break;
    case "dot":
      selectedItem = new DotObject(item, assets);
      break;
    case "angle":
      selectedItem = new AngleObject(item, assets);
      break;
    case "sprite":
      selectedItem = new SpriteObject(item, assets);
      break;
    case "list":
      selectedItem = new ParaObject(item, assets);
      break;
    case "triangle":
      selectedItem = new TriangleObject(item, assets);
      break;
    case "text":
      selectedItem = new TextObject(item, assets);
      break;
    case "ellipse":
      selectedItem = new EllipseObject(item, assets);
      break;
    case "ray":
      selectedItem = new RayObject(item, assets);
      break;
    case "line":
      selectedItem = new LineObject(item, assets);
      break;
    case "lines":
      selectedItem = new LinesObject(item, assets);
      break;
    case "rectangle":
      selectedItem = new Rectangle(item, assets);
      break;
    case "image":
      selectedItem = new ImageObject(item, assets);
      break;
    case "circle":
      selectedItem = new Circle(item, assets);
      break;
    default:
      if (!selectedItem) {
        throw new Error("Item type not found");
      }
      break;
  }
  return selectedItem;
}
class Handle {
  constructor(xFn, yFn, pointer = "pointer", color = "#1a73e8") {
    this.x = xFn;
    this.y = yFn;
    this.size = 20;
    this.color = color;
    this.hoverColor = "#64b5f6";
    this.isHovered = false;
    this.cursor = pointer;
    this.icon = null;
  }
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.isHovered ? this.hoverColor : this.color;
    ctx.fillRect(this.x(), this.y(), this.size, this.size);
    if (this.icon) {
      ctx.fillStyle = "#ffffff";
      ctx.font = `${this.size * 0.8}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.icon, this.x(), this.y());
    }
    ctx.restore();
  }
  isHit(x, y) {
    if (x >= this.x() && x <= this.x() + this.size && y >= this.y() && y <= this.y() + this.size) {
      return true;
    } else {
      return false;
    }
  }
}
class SelectedItem {
  constructor(itemObject) {
    this.itemObject = itemObject;
    this.handles = [];
    this.selectedHandle = null;
    this.isDrag = false;
    this.startPositionX = 0;
    this.startPositionY = 0;
    this.initializeHandles();
  }
  initializeHandles() {
    const move = new Handle(
      () => this.itemObject.boundingRectangleX() - 10,
      () => this.itemObject.boundingRectangleY() - 10,
      "✥",
      "green"
    );
    this.handles.push(move);
    const widthHandle = new Handle(
      () => this.itemObject.boundingRectangleX() + this.itemObject.width - 10,
      () => this.itemObject.boundingRectangleY() + this.itemObject.height / 2 - 10,
      // Changed position to middle-right
      "✥",
      "orange"
    );
    this.handles.push(widthHandle);
    const heightHandle = new Handle(
      () => this.itemObject.boundingRectangleX() + this.itemObject.width / 2 - 10,
      // Changed position to middle-top
      () => this.itemObject.boundingRectangleY() - 10,
      "✥",
      "blue"
    );
    this.handles.push(heightHandle);
  }
  drawHandles(ctx) {
    ctx.save();
    ctx.strokeStyle = "#1a73e8";
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(
      this.itemObject.boundingRectangleX(),
      this.itemObject.boundingRectangleY(),
      this.itemObject.width,
      this.itemObject.height
    );
    for (const handle of this.handles) {
      handle.draw(ctx);
    }
    ctx.restore();
  }
  mouseDown(x, y) {
    this.startPositionX = x;
    this.startPositionY = y;
    this.isDrag = true;
    if (this.handles[0].isHit(x, y)) {
      this.selectedHandle = "move";
      return true;
    }
    if (this.handles[1].isHit(x, y)) {
      this.selectedHandle = "widen";
      return true;
    }
    if (this.handles[2].isHit(x, y)) {
      this.selectedHandle = "heighten";
      return true;
    }
    return false;
  }
  mouseMove(x, y) {
    if (!this.isDrag) return false;
    const dx = x - this.startPositionX;
    const dy = y - this.startPositionY;
    const isMovingRight = dx > 0;
    const isMovingLeft = dx < 0;
    const isMovingDown = dy > 0;
    const isMovingUp = dy < 0;
    switch (this.selectedHandle) {
      case "move":
        this.itemObject.x = x;
        this.itemObject.y = y;
        break;
      case "widen":
        if (isMovingRight) {
          this.itemObject.width = dx;
        } else if (isMovingLeft) {
          this.itemObject.width = dx;
        }
        this.startPositionX = x;
        break;
      case "heighten":
        if (isMovingDown) {
          this.itemObject.height = dy;
        } else if (isMovingUp) {
          this.itemObject.height = dy;
        }
        this.startPositionY = y;
        break;
    }
    return true;
  }
  mouseUp() {
    this.isDrag = false;
    this.selectedHandle = null;
  }
  isHit(x, y) {
    return this.mouseDown(x, y);
  }
}
const SmallBtnToolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { clk } = $$props;
  let { icon } = $$props;
  let { title } = $$props;
  if ($$props.clk === void 0 && $$bindings.clk && clk !== void 0) $$bindings.clk(clk);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  return `<div class="flex flex-col hover:bg-gray-500 rounded-md p-1"><button class="bg-stone-500 p-1 rounded-md text-xs ">${escape(icon)}</button> <div class="text-xs p-1">${escape(title)}</div></div>`;
});
class Icons {
  static ADD = " ➕";
  static ANGLE = " ∠";
  static BALANCE = "⚖️";
  static BAZIER = "🔷";
  static BARCHART = "📊";
  static BOOK = "📘";
  static BOOKS = "📚";
  static BUS = "🚌";
  static BULB = "💡";
  static CAR = "🚗";
  static CANVAS = "🖼️";
  static CHARTUP = "📈";
  static CHARTDOWN = "📉";
  static CIRCLE = "⭕";
  static CLOCK = "⏱️";
  static COG = "⚙";
  static COMPUTER = "💻";
  static COPY = "📋";
  static CODE = "📟";
  static COLD = "🥶";
  static CROSS = "❌";
  static CLIP = "📎";
  static CLONE = "🁜";
  static DARK = "🌃";
  static DEL = "🗑️";
  static DOOR = "🚪";
  static DOT = "🔘";
  static DOWN = "↓";
  static EMAIL = "📧";
  static EYE = "👁️";
  static EYES = "👀";
  static EXPLOSION = "💥";
  static ELLIPSE = "🥚";
  static FILESBOX = "🗃️";
  static FLOWER = "🌸";
  static FROWNFACE = "☹️";
  static HAMMER_AND_WRENCH = "🛠️";
  static HEART = "❤️";
  static HIDE = "🙈";
  static HOT = "🔥";
  static HOURGLASS = "⌛";
  static HOUSE = "🏠";
  static ICE = "🧊";
  static KEY = "🔑";
  static LOCK = "🔒";
  static LEFT = "←";
  static LINE = "➖";
  static MAGNIFYING_GLASS = "🔍";
  static MANAGER = "💼";
  static MCQ = "🔱";
  static MESSAGE = "📨";
  static MICROSCOPE = "🔬";
  static NET = "🌐";
  static NOTES = "📋";
  static NUMBER = "❶";
  static PALETTE = "🎨";
  static PENCIL = " ✏️";
  static PHONE = "📱";
  static QUESTIONMARK = "❓";
  static RULER = "📏";
  static RIGHT = "→";
  static RECYCLE = "♻️";
  static RECTANGLE = "▭";
  static RUN = "🏃";
  static ROCKET = "🚀";
  static SAVE = "💾";
  static SMILYFACE = "😊";
  static SPEECH = "🗣️";
  static SPEAKER = "📢";
  static NOSPEAKER = "🔇";
  static STAIRS = "🪜";
  static STAR = "⭐";
  static SHEEP = "🐑";
  static START = "▶";
  static STOP = "||";
  static STUDENT = "👨‍🎓";
  static SPRITE = "🕹️";
  static STUDENTCAP = "🎓";
  static SUN = "☀️";
  static SUNRISE = "🌅";
  static SUBTRACT = "➖";
  static TAG = "🏷️";
  static TEAM = "🧑‍🤝‍🧑";
  static TICK = "✔️";
  static TEMPRATURE = "🌡️";
  static TEMPLATE = "📜";
  static TEST = "🧪";
  static TEXT = "📃";
  static TEXT2 = "¶";
  static THUMBSUP = "👍";
  static THUMBSDOWN = "👎";
  static TRIANGE = "🔺";
  static TRIANGULAR_RULER = "📐";
  static TREE = "🌳";
  static TV = "📺";
  static WRENCH = "🔧";
  static UP = "↑";
  static MONEYBAG = "💰";
  static MAGNET = "🧲";
  static MAGICWAND = "🪄";
  static MAP = "🗺️";
  static MEDAL = "🎖️";
  static MEGAPHONE = "📣";
  static MICROPHONE = "🎤";
  static MILK = "🥛";
  static MOON = "🌙";
  static MOUNTAIN = "⛰️";
  static MUSIC = "🎵";
  static NETWORK = "🔗";
  static NEWSPAPER = "📰";
  static NOTEBOOK = "📓";
  static OIL = "🛢️";
  static PANDA = "🐼";
  static PARACHUTE = "🪂";
  static PEACE = "☮️";
  static PENGUIN = "🐧";
  static PET = "🐾";
  static PIGGYBANK = "🐖";
  static PINEAPPLE = "🍍";
  static PIZZA = "🍕";
  static PLANET = "🪐";
  static PRINTER = "🖨️";
  static PUZZLE = "🧩";
  static QUILL = "🖋️";
  static RAINBOW = "🌈";
  static RECORD = "🎙️";
  static ROSE = "🌹";
  static SAILBOAT = "⛵";
  static SATELLITE = "🛰️";
  static SCISSORS = "✂️";
  static SCROLL = "📜";
  static SHIELD = "🛡️";
  static SNOWFLAKE = "❄️";
  static SQUIRREL = "🐿️";
  static SUITCASE = "💼";
  static SUNGLASSES = "🕶️";
  static SURFBOARD = "🏄‍♂️";
  static TADA = "🎉";
  static TEA = "🍵";
  static TELESCOPE = "🔭";
  static TENT = "⛺";
  static TOOLS = "🛠️";
  static TORNADO = "🌪️";
  static TROPHY = "🏆";
  static UMBRELLA = "☂️";
  static UNLOCK = "🔓";
  static VAN = "🚐";
  static VIAL = "🧪";
  static VIKING = "🛡️";
  static WALLET = "👛";
  static WATERMELON = "🍉";
  static WHALE = "🐋";
  static WIFI = "📶";
  static WIND = "💨";
  static WOLF = "🐺";
  static YIN_YANG = "☯️";
  static AIRPLANE = "✈️";
  static ALARM = "⏰";
  static APPLE = "🍎";
  static AVOCADO = "🥑";
  static BALLOON = "🎈";
  static BANANA = "🍌";
  static BATTERY = "🔋";
  static BEACH = "🏖️";
  static BELL = "🔔";
  static BICYCLE = "🚲";
  static BIRD = "🐦";
  static BIRTHDAY_CAKE = "🎂";
  static BOMB = "💣";
  static BOOKMARK = "🔖";
  static BOW_AND_ARROW = "🏹";
  static BRIEFCASE2 = "👜";
  static BROOM = "🧹";
  static CACTUS = "🌵";
  static CALCULATOR = "📟";
  static CAMERA = "📷";
  static CANDY = "🍬";
  static CANDLE = "🕯️";
  static CARD = "💳";
  static CARROT = "🥕";
  static CAT = "🐱";
  static CHAMPAGNE = "🍾";
  static CHECK_MARK = "✅";
  static CHERRY = "🍒";
  static CHEESE = "🧀";
  static CHESS = "♟️";
  static CHICKEN = "🐔";
  static CLOUD = "☁️";
  static CLAPPERBOARD = "🎬";
  static COOKIE = "🍪";
  static CROWN = "👑";
  static CUPCAKE = "🧁";
  static CUTLERY = "🍴";
  static DAGGER = "🗡️";
  static DIAMOND = "💎";
  static DRUM = "🥁";
  static DUMBBELL = "🏋️";
  static ELEPHANT = "🐘";
  static ENVELOPE = "✉️";
  static FIREWORKS = "🎆";
  static FLAG = "🚩";
  static FLAME = "🔥";
  static FOOTBALL = "⚽";
  static FRIES = "🍟";
  static GEAR2 = "⚙️";
  static GIFT = "🎁";
  static GLOBE = "🌍";
  static GUITAR = "🎸";
  static HANDSHAKE = "🤝";
  static HELICOPTER = "🚁";
  static HONEY = "🍯";
  static HURRICANE = "🌀";
  static ICE_CREAM = "🍦";
  static JAM = "🍓";
  static JUICE = "🧃";
  static KITE = "🪁";
  static LAMP = "💡";
  static LEMONADE = "🍋";
  static LIGHTNING = "⚡";
  static LOCKED_BOOK = "🔏";
  static LOUDSPEAKER = "📢";
  static LUNCHBOX = "🍱";
  static MAGNETIC_TAPE = "📼";
  static MAPLE_LEAF = "🍁";
  static MASK = "🎭";
  static MEDICINE = "💊";
  static METEOR = "☄️";
  static MOLECULE = "🧬";
  static MOUSE = "🐭";
  static MUSHROOM = "🍄";
  static NUT_AND_BOLT = "🔩";
  static OCTOPUS = "🐙";
  static ORANGE = "🍊";
  static OWL = "🦉";
  static PAW_PRINT = "🐾";
  static PENCIL2 = "🖊️";
  static PILLOW = "🛏️";
  static PINE_TREE = "🌲";
  static POPCORN = "🍿";
  static RADAR = "📡";
  static ROBOT = "🤖";
  static RUBY = "💍";
  static SANDWICH = "🥪";
  static SATURN = "🪐";
  static SEA_SHELL = "🐚";
  static SHARK = "🦈";
  static SHOPPING_BAG = "🛍️";
  static SKULL = "💀";
  static SNORKEL = "🤿";
  static SPIDER = "🕷️";
  static SQUID = "🦑";
  static STETHOSCOPE = "🩺";
  static SWIMMING_POOL = "🏊";
  static SYRINGE = "💉";
  static TOOLBOX = "🧰";
  static TRAFFIC_LIGHT = "🚦";
  static TRAIN = "🚆";
  static TREE2 = "🌴";
  static TRUCK = "🚚";
  static VAMPIRE = "🧛";
  static WATERMELON_SLICE = "🍉";
  static ABACUS = "🧮";
  static ALIEN = "👽";
  static AMPHORA = "🏺";
  static ANCHOR = "⚓";
  static ANT = "🐜";
  static ASTRONAUT = "👨‍🚀";
  static ATOM = "⚛️";
  static AXE = "🪓";
  static BACKPACK = "🎒";
  static BADMINTON = "🏸";
  static BAGEL = "🥯";
  static BAGUETTE = "🥖";
  static BAMBOO = "🎍";
  static BANJO = "🪕";
  static BASKET = "🧺";
  static BAT = "🦇";
  static BEAVER = "🦫";
  static BENTO = "🍱";
  static BIOHAZARD = "☣️";
  static BLUEBERRY = "🫐";
  static BOAR = "🐗";
  static BOBSLED = "🛷";
  static BONE = "🦴";
  static BONSAI = "🎍";
  static BOOMERANG = "🪃";
  static BRAIN = "🧠";
  static BREAD = "🍞";
  static BRICK = "🧱";
  static BRIDGE = "🌉";
  static BROCCOLI = "🥦";
  static BROOM_AND_BALL = "🧹🏀";
  static BUBBLE_TEA = "🧋";
  static BUCKET = "🪣";
  static BUTTERFLY = "🦋";
  static CACTUS_IN_POT = "🌵🪴";
  static CALENDAR = "📅";
  static CAMEL = "🐪";
  static CANOE = "🛶";
  static CASTLE = "🏰";
  static CHAINSAW = "🪚";
  static CHAIR = "🪑";
  static CHESTNUT = "🌰";
  static CHIPMUNK = "🐿️";
  static CHOCOLATE_BAR = "🍫";
  static CHOPSTICKS = "🥢";
  static CLAMP = "🗜️";
  static CLOVER = "🍀";
  static COCONUT = "🥥";
  static COFFIN = "⚰️";
  static COIN = "🪙";
  static COMET = "☄️";
  static COMPASS = "🧭";
  static CORAL = "🪸";
  static CORN = "🌽";
  static CRAYON = "🖍️";
  static CRICKET = "🦗";
  static CROCODILE = "🐊";
  static CROISSANT = "🥐";
  static CRYSTAL_BALL = "🔮";
  static CUCUMBER = "🥒";
  static CUPID = "💘";
  static CURLING_STONE = "🥌";
  static CYCLONE = "🌀";
  static DANGO = "🍡";
  static DART = "🎯";
  static DEER = "🦌";
  static DESKTOP = "🖥️";
  static DICE = "🎲";
  static DINOSAUR = "🦕";
  static DIVIDER = "〰️";
  static DNA = "🧬";
  static DONUT = "🍩";
  static DOVE = "🕊️";
  static DRAGON = "🐉";
  static DRILL = "🛠️";
  static DROPLET = "💧";
  static DUCK = "🦆";
  static DUMPLING = "🥟";
  static EAR = "👂";
  static EGGPLANT = "🍆";
  static ELF = "🧝";
  static EVERGREEN = "🌲";
  static FAIRY = "🧚";
  static FALLEN_LEAF = "🍂";
  static FEATHER = "🪶";
  static FERRIS_WHEEL = "🎡";
  static FIRE_EXTINGUISHER = "🧯";
  static FIRECRACKER = "🧨";
  static FISHING_POLE = "🎣";
  static FLEUR_DE_LIS = "⚜️";
  static FLYING_DISC = "🥏";
  static FLYING_SAUCER = "🛸";
  static FOG = "🌫️";
  static FONDUE = "🫕";
  static FOOTPRINTS = "👣";
  static FOUNTAIN = "⛲";
  static FOX = "🦊";
  static FROG = "🐸";
  static GARLIC = "🧄";
  static GENIE = "🧞";
  static GERM = "🦠";
  static GHOST = "👻";
  static GIRAFFE = "🦒";
  static GLOVES = "🧤";
  static GOAT = "🐐";
  static GORILLA = "🦍";
  static GRAPES = "🍇";
  static GRASSHOPPER = "🦗";
  static HAMSA = "🧿";
  static HARMONICA = "🎹";
  static HEADSTONE = "🪦";
  static HEDGEHOG = "🦔";
  static HERB = "🌿";
  static HIBISCUS = "🌺";
  static HIPPOPOTAMUS = "🦛";
  static HOOK = "🪝";
  static HOURGLASS_DONE = "⌛";
  static IGLOO = "�iglq";
  static INFINITY = "♾️";
  static JELLYFISH = "🪼";
  static JIGSAW = "🧩";
  static JOYSTICK = "🕹️";
  static KANGAROO = "🦘";
  static KIWI = "🥝";
  static KNOT = "🪢";
  static KOALA = "🐨";
  static LABCOAT = "🥼";
  static LADDER = "🪜";
  static LADYBUG = "🐞";
  static LASSO = "🪃";
  static LEMON = "🍋";
  static LEOPARD = "🐆";
  static LEVITATE = "🕴️";
  static LIGHT_BULB = "💡";
  static LIZARD = "🦎";
  static LLAMA = "🦙";
  static LOBSTER = "🦞";
  static LOLLIPOP = "🍭";
  static LOTUS = "🪷";
  static LUGGAGE = "🧳";
  static LUNGS = "🫁";
  static MAGE = "🧙";
  static MANGO = "🥭";
  static MANTIS = "🦗";
  static MICROBE = "🦠";
  static MIRROR = "🪞";
  static MOAI = "🗿";
  static MOLE = "🐀";
  static MONKEY = "🐒";
  static MOSQUITO = "🦟";
  static MOTOR_SCOOTER = "🛵";
  static MOTORCYCLE = "🏍️";
  static MOUNTAIN_CABLEWAY = "🚠";
  static NAZAR_AMULET = "🧿";
  static NECKTIE = "👔";
  static NESTING_DOLLS = "🪆";
  static NINJA = "🥷";
  static ONION = "🧅";
  static ORANGUTAN = "🦧";
  static OTTER = "🦦";
  static OYSTER = "🦪";
  static PACKAGE = "📦";
  static PAINTBRUSH = "🖌️";
  static PALM_TREE = "🌴";
  static PANCAKES = "🥞";
  static PAPERCLIP = "📎";
  static PARROT = "🦜";
  static PEACH = "🍑";
  static PEACOCK = "🦚";
  static PEANUTS = "🥜";
  static PEARL = "🫠";
  static PEAR = "🍐";
  static PENCIL_AND_PAPER = "📝";
  static PEPPER = "🌶️";
  static PETRI_DISH = "🧫";
  static PICKAXE = "⛏️";
  static PIEZO = "🔊";
  static PIGEON = "🕊️";
  static PILL = "💊";
  static PINATA = "🪅";
  static PINCH = "🤏";
  static PINEAPPLE_SLICE = "🍍";
  static PING_PONG = "🏓";
  static PIRATE = "🏴‍☠️";
  static PLANT_IN_POT = "🪴";
  static PLATYPUS = "🦡";
  static PLUNGER = "🪠";
  static POPCORN_BUCKET = "🍿";
  static POTATO = "🥔";
  static PRETZEL = "🥨";
  static PROTOZOA = "🦠";
  static PUMPKIN = "🎃";
  static PUSHPIN = "📌";
  static RABBIT = "🐰";
  static RACCOON = "🦝";
  static RADIO = "📻";
  static RAIL_CAR = "🚃";
  static RAINBOW_FLAG = "🏳️‍🌈";
  static RAMEN = "🍜";
  static RAT = "🐀";
  static RECEIPT = "🧾";
  static RHINOCEROS = "🦏";
  static RICE = "🍚";
  static RING_BUOY = "🛟";
  static ROCK = "🪨";
  static ROOSTER = "🐓";
  static SAFETY_PIN = "🧷";
  static SAFETY_VEST = "🦺";
  static SALT = "🧂";
  static SANDAL = "👡";
  static SATELLITE_ANTENNA = "📡";
  static SAUROPOD = "🦕";
  static SCALES = "⚖️";
  static SCARF = "🧣";
  static SCORPION = "🦂";
  static SCREWDRIVER = "🪛";
  static SEAL = "🦭";
  static SEEDLING = "🌱";
  static SHAMROCK = "☘️";
  static SHRIMP = "🦐";
  static SKUNK = "🦨";
  static SLED = "🛷";
  static SLOTH = "🦥";
  static SNAIL = "🐌";
  static SNAKE = "🐍";
  static SNOWBOARDER = "🏂";
  static SNOWMAN = "☃️";
  static SOAP = "🧼";
  static SOCCER_BALL = "⚽";
  static SOCKS = "🧦";
  static SOFTBALL = "🥎";
  static SPADE = "♠️";
  static SPAGHETTI = "🍝";
  static SPARKLES = "✨";
  static SPARKLER = "🎇";
  static SPARKLING_HEART = "💖";
  static SPOON = "🥄";
  static SPORTS_MEDAL = "🏅";
  static STACKED_BOOKS = "📚";
  static STAPLER = "🗄️";
  static STOPWATCH = "⏱️";
  static STORM = "🌩️";
  static STRAWBERRY = "🍓";
  static SUNFLOWER = "🌻";
  static SUSHI = "🍣";
  static SWAN = "🦢";
  static SWEAT_DROPLETS = "💦";
  static T_REX = "🦖";
  static TACO = "🌮";
  static TAKEOUT_BOX = "🥡";
  static TAMALE = "🫔";
  static TANGERINE = "🍊";
  static TAXI = "🚕";
  static TEAPOT = "🫖";
  static TEDDY_BEAR = "🧸";
  static TENNIS = "🎾";
  static THERMOMETER = "🌡️";
  static THONG_SANDAL = "🩴";
  static THREAD = "🧵";
  static TICKET = "🎟️";
  static TIGER = "🐯";
  static TOILET = "🚽";
  static TOMATO = "🍅";
  static TONGUE = "👅";
  static TRACTOR = "🚜";
  static TROLLEYBUS = "🚎";
  static TSHIRT = "👕";
  static TULIP = "🌷";
  static TURKEY = "🦃";
  static TURTLE = "🐢";
  static UNICORN = "🦄";
  static VIOLIN = "🎻";
  static VOLLEYBALL = "🏐";
  static WAFFLE = "🧇";
  static WASTEBASKET = "🗑️";
  static WATCH = "⌚";
  static WATER_BUFFALO = "🐃";
  static WATER_POLO = "🤽";
  static WATER_WAVE = "🌊";
  static WATERFALL = "🧗‍♀️";
  static WINDMILL = "🏰";
  static WINDOW = "🪟";
  static WINE_GLASS = "🍷";
  static WOOD = "🪵";
  static WORM = "🪱";
  static WREATH = "🎍";
  static WRITING_HAND = "✍️";
  static X_RAY = "🦴";
  static YARN = "🧶";
  static YO_YO = "🪀";
  static ZEBRA = "🦓";
  static ZOMBIE = "🧟";
  ////////////////////////
}
const AddToolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const ItemsMap = SlideObject.Canvas.ItemsMap;
  let icons = Icons;
  let { clone = () => {
  } } = $$props;
  let { deleteFn = () => {
  } } = $$props;
  let { showCanvas = () => {
  } } = $$props;
  let { addNewItem } = $$props;
  if ($$props.clone === void 0 && $$bindings.clone && clone !== void 0) $$bindings.clone(clone);
  if ($$props.deleteFn === void 0 && $$bindings.deleteFn && deleteFn !== void 0) $$bindings.deleteFn(deleteFn);
  if ($$props.showCanvas === void 0 && $$bindings.showCanvas && showCanvas !== void 0) $$bindings.showCanvas(showCanvas);
  if ($$props.addNewItem === void 0 && $$bindings.addNewItem && addNewItem !== void 0) $$bindings.addNewItem(addNewItem);
  return `<div class="flex justify-between text-white "><div class="flex text-white ">${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("rectangle").data()),
      icon: icons.RECTANGLE,
      title: "Rect"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("ellipse").data()),
      icon: icons.ELLIPSE,
      title: "Ellipse"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("circle").data()),
      icon: icons.ELLIPSE,
      title: "Circle"
    },
    {},
    {}
  )}  ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("text").data()),
      icon: icons.TEXT,
      title: "Text"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("list").data()),
      icon: icons.TEMPLATE,
      title: "List"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("line").data()),
      icon: icons.LINE,
      title: "Line"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("triangle").data()),
      icon: icons.TRIANGE,
      title: "Tri"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("ray").data()),
      icon: icons.SUNRISE,
      title: "Ray"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("icon").data()),
      icon: "🦏",
      title: "Icon"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("dot").data()),
      icon: icons.DOT,
      title: "Dot"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("angle").data()),
      icon: icons.ANGLE,
      title: "Angle"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("lines").data()),
      icon: icons.BICYCLE,
      title: "Lines"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("sprite").data()),
      icon: icons.SPRITE,
      title: "Sprite"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("image").data()),
      icon: icons.MAP,
      title: "Image"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: () => addNewItem(ItemsMap.get("piechart").data()),
      icon: icons.PIZZA,
      title: "Pie"
    },
    {},
    {}
  )}</div> <div class="flex border-2 border-gray-500 rounded-md">${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: clone,
      icon: icons.SHEEP,
      title: "Clone"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: showCanvas,
      icon: icons.CANVAS,
      title: "Canvas"
    },
    {},
    {}
  )} ${validate_component(SmallBtnToolbar, "SmallBtnToolbar").$$render(
    $$result,
    {
      clk: deleteFn,
      icon: icons.WASTEBASKET,
      title: "Delete"
    },
    {},
    {}
  )}</div></div>`;
});
function getMouseData(e) {
  const canvas = e.target;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  return { x, y, canvas, rect };
}
const SelectItemMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items } = $$props;
  let { selectedItemIndex } = $$props;
  let { setSelectedItemIndex } = $$props;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.selectedItemIndex === void 0 && $$bindings.selectedItemIndex && selectedItemIndex !== void 0) $$bindings.selectedItemIndex(selectedItemIndex);
  if ($$props.setSelectedItemIndex === void 0 && $$bindings.setSelectedItemIndex && setSelectedItemIndex !== void 0) $$bindings.setSelectedItemIndex(setSelectedItemIndex);
  return `<select class="bg-stone-800 text-gray-300 text-xs p-1.5 m-1 rounded-md border border-stone-600 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 shadow-sm"${add_attribute("value", selectedItemIndex, 0)}>${each(items, (item, index) => {
    return `<option class="bg-stone-700 text-gray-300"${add_attribute("value", index, 0)}>${escape(item.name)} </option>`;
  })}</select>`;
});
const InputNumber = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let valueWithoutDecimal;
  let { value } = $$props;
  let { config } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.config === void 0 && $$bindings.config && config !== void 0) $$bindings.config(config);
  valueWithoutDecimal = value ? Math.trunc(value) : value;
  return `  <input type="number"${add_attribute("min", config.min, 0)}${add_attribute("max", config.max, 0)}${add_attribute("step", config.step, 0)}${add_attribute("value", valueWithoutDecimal, 0)} class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500 text-xs">`;
});
const InputFloat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formattedValue;
  let { value } = $$props;
  let { config } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.config === void 0 && $$bindings.config && config !== void 0) $$bindings.config(config);
  formattedValue = value === null || value === void 0 ? "" : value.toFixed(2);
  return `<input type="number"${add_attribute("min", config?.min || 0, 0)}${add_attribute("max", config?.max || 1, 0)}${add_attribute("step", config?.step || 0.01, 0)}${add_attribute("value", formattedValue, 0)} class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500 text-xs">`;
});
const InputText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { value } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  return `  <input type="text" class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500"${add_attribute("value", value, 0)}>`;
});
const InputTextArea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { value } = $$props;
  let { redraw } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.redraw === void 0 && $$bindings.redraw && redraw !== void 0) $$bindings.redraw(redraw);
  return `  <textarea class="bg-gray-900 text-white text-sm p-1 rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500">${escape(value || "")}</textarea>`;
});
const InputCheckbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value } = $$props;
  let { redraw } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.redraw === void 0 && $$bindings.redraw && redraw !== void 0) $$bindings.redraw(redraw);
  return `  <input type="checkbox" ${value ? "checked" : ""} class="bg-gray-900 text-white rounded-md border border-gray-600 focus:ring-1 focus:ring-pink-500">`;
});
const InputColor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { value } = $$props;
  let { redraw } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.redraw === void 0 && $$bindings.redraw && redraw !== void 0) $$bindings.redraw(redraw);
  return `  <input type="color" class="bg-gray-900 text-white rounded-md border border-gray-600 p-1 focus:ring-1 focus:ring-pink-500"${add_attribute("value", value, 0)}>`;
});
const FontFamilyDD = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value } = $$props;
  const options = [
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Impact",
    "Gill Sans"
  ];
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  return `<select class="bg-gray-900 text-white text-xs"><option value="" data-svelte-h="svelte-lzn8xl">Select Font</option>${each(options, (option) => {
    return `<option${add_attribute("value", option, 0)}>${escape(option)}</option>`;
  })}</select>`;
});
const StudentOptions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sheetItem } = $$props;
  if ($$props.sheetItem === void 0 && $$bindings.sheetItem && sheetItem !== void 0) $$bindings.sheetItem(sheetItem);
  return `<option value="student_w_tablet" ${sheetItem === "student_w_tablet" ? "selected" : ""}>student_w_tablet</option> <option value="student_red" ${sheetItem === "student_red" ? "selected" : ""}>student_red</option> <option value="student_black" ${sheetItem === "student_black" ? "selected" : ""}>student_black</option> <option value="student_female" ${sheetItem === "student_female" ? "selected" : ""}>student_female</option> `;
});
const FigOptions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sheetItem } = $$props;
  if ($$props.sheetItem === void 0 && $$bindings.sheetItem && sheetItem !== void 0) $$bindings.sheetItem(sheetItem);
  return ` <option value="flower1" ${sheetItem === "flower1" ? "selected" : ""}>flower1</option> <option value="flower2" ${sheetItem === "flower2" ? "selected" : ""}>flower2</option> <option value="flower3" ${sheetItem === "flower3" ? "selected" : ""}>flower3</option> <option value="flowe4" ${sheetItem === "flowe4" ? "selected" : ""}>flowe4</option> <option value="female_stick" ${sheetItem === "female_stick" ? "selected" : ""}>female_stick</option> <option value="male_stick" ${sheetItem === "male_stick" ? "selected" : ""}>male_stick</option> <option value="bear_face" ${sheetItem === "bear_face" ? "selected" : ""}>bear_face</option> <option value="apple" ${sheetItem === "apple" ? "selected" : ""}>apple</option>  <option value="plant_pot" ${sheetItem === "plant_pot" ? "selected" : ""}>plant_pot</option> <option value="penguin" ${sheetItem === "penguin" ? "selected" : ""}>penguin</option> <option value="drum_face" ${sheetItem === "drum_face" ? "selected" : ""}>drum_face</option> <option value="carrot" ${sheetItem === "carrot" ? "selected" : ""}>carrot</option> <option value="dimond" ${sheetItem === "dimond" ? "selected" : ""}>dimond</option> <option value="spring" ${sheetItem === "spring" ? "selected" : ""}>spring</option> <option value="bomb" ${sheetItem === "bomb" ? "selected" : ""}>bomb</option> <option value="paw" ${sheetItem === "paw" ? "selected" : ""}>paw</option>  <option value="line_design1" ${sheetItem === "line_design1" ? "selected" : ""}>line_design1</option> <option value="line_design2" ${sheetItem === "line_design2" ? "selected" : ""}>line_design2</option> <option value="line_design3" ${sheetItem === "line_design3" ? "selected" : ""}>line_design3</option> <option value="line_design4" ${sheetItem === "line_design4" ? "selected" : ""}>line_design4</option> <option value="line_design5" ${sheetItem === "line_design5" ? "selected" : ""}>line_design5</option> <option value="line_design6" ${sheetItem === "line_design6" ? "selected" : ""}>line_design6</option> <option value="line_design7" ${sheetItem === "line_design7" ? "selected" : ""}>line_design7</option> <option value="line_design8" ${sheetItem === "line_design8" ? "selected" : ""}>line_design8</option>  <option value="line_design9" ${sheetItem === "line_design9" ? "selected" : ""}>line_design9</option> <option value="leaf_left" ${sheetItem === "leaf_left" ? "selected" : ""}>leaf_left</option> <option value="leaf_right" ${sheetItem === "leaf_right" ? "selected" : ""}>leaf_right</option> <option value="cherry" ${sheetItem === "cherry" ? "selected" : ""}>cherry</option> <option value="drop_face" ${sheetItem === "drop_face" ? "selected" : ""}>drop_face</option> <option value="spring2" ${sheetItem === "spring2" ? "selected" : ""}>spring2</option> <option value="clock" ${sheetItem === "clock" ? "selected" : ""}>clock</option> <option value="water_tap_face" ${sheetItem === "water_tap_face" ? "selected" : ""}>water_tap_face</option>  <option value="smily_face_right" ${sheetItem === "smily_face_right" ? "selected" : ""}>smily_face_right</option> <option value="frying_pan_right" ${sheetItem === "frying_pan_right" ? "selected" : ""}>frying_pan_right</option> <option value="spatula_right" ${sheetItem === "spatula_right" ? "selected" : ""}>spatula_right</option> <option value="fox_face_left" ${sheetItem === "fox_face_left" ? "selected" : ""}>fox_face_left</option> <option value="evil_moon_face_left" ${sheetItem === "evil_moon_face_left" ? "selected" : ""}>evil_moon_face_left</option> <option value="telephone" ${sheetItem === "telephone" ? "selected" : ""}>telephone</option> <option value="tram_right" ${sheetItem === "tram_right" ? "selected" : ""}>tram_right</option> <option value="train" ${sheetItem === "train" ? "selected" : ""}>train</option>  <option value="car_left" ${sheetItem === "car_left" ? "selected" : ""}>car_left</option> <option value="puff_right" ${sheetItem === "puff_right" ? "selected" : ""}>puff_right</option> <option value="signal_right" ${sheetItem === "signal_right" ? "selected" : ""}>signal_right</option> <option value="plane_right" ${sheetItem === "plane_right" ? "selected" : ""}>plane_right</option> <option value="sun" ${sheetItem === "sun" ? "selected" : ""}>sun</option> <option value="umbrella" ${sheetItem === "umbrella" ? "selected" : ""}>umbrella</option> <option value="ice_man" ${sheetItem === "ice_man" ? "selected" : ""}>ice_man</option> <option value="cat_face_normal" ${sheetItem === "cat_face_normal" ? "selected" : ""}>cat_face_normal</option>  <option value="octopus_right" ${sheetItem === "octopus_right" ? "selected" : ""}>octopus_right</option> <option value="bow" ${sheetItem === "bow" ? "selected" : ""}>bow</option> <option value="fish_right" ${sheetItem === "fish_right" ? "selected" : ""}>fish_right</option> <option value="ant_left" ${sheetItem === "ant_left" ? "selected" : ""}>ant_left</option> <option value="duck_left" ${sheetItem === "duck_left" ? "selected" : ""}>duck_left</option> <option value="chicken_left" ${sheetItem === "chicken_left" ? "selected" : ""}>chicken_left</option> <option value="heart" ${sheetItem === "heart" ? "selected" : ""}>heart</option> <option value="mouse" ${sheetItem === "mouse" ? "selected" : ""}>mouse</option>  <option value="mouse_right" ${sheetItem === "mouse_right" ? "selected" : ""}>mouse_right</option> <option value="ghost_left" ${sheetItem === "ghost_left" ? "selected" : ""}>ghost_left</option> <option value="leaf_big_left" ${sheetItem === "leaf_big_left" ? "selected" : ""}>leaf_big_left</option> <option value="pencil_right" ${sheetItem === "pencil_right" ? "selected" : ""}>pencil_right</option> <option value="fork" ${sheetItem === "fork" ? "selected" : ""}>fork</option> <option value="mickey_mouse_face" ${sheetItem === "mickey_mouse_face" ? "selected" : ""}>mickey_mouse_face</option> <option value="rabit_face" ${sheetItem === "rabit_face" ? "selected" : ""}>rabit_face</option> <option value="crown" ${sheetItem === "crown" ? "selected" : ""}>crown</option>  <option value="smily_face_left" ${sheetItem === "smily_face_left" ? "selected" : ""}>smily_face_left</option> <option value="frying_pan_left" ${sheetItem === "frying_pan_left" ? "selected" : ""}>frying_pan_left</option> <option value="spatula_left" ${sheetItem === "spatula_left" ? "selected" : ""}>spatula_left</option> <option value="fox_face_right" ${sheetItem === "fox_face_right" ? "selected" : ""}>fox_face_right</option> <option value="evil_moon_face_right" ${sheetItem === "evil_moon_face_right" ? "selected" : ""}>evil_moon_face_right</option> <option value="mobile_phone" ${sheetItem === "mobile_phone" ? "selected" : ""}>mobile_phone</option> <option value="tram_left" ${sheetItem === "tram_left" ? "selected" : ""}>tram_left</option> <option value="tv" ${sheetItem === "tv" ? "selected" : ""}>tv</option>  <option value="car_right" ${sheetItem === "car_right" ? "selected" : ""}>car_right</option> <option value="puff_left" ${sheetItem === "puff_left" ? "selected" : ""}>puff_left</option> <option value="signal_left" ${sheetItem === "signal_left" ? "selected" : ""}>signal_left</option> <option value="plane_left" ${sheetItem === "plane_left" ? "selected" : ""}>plane_left</option> <option value="cloud_face" ${sheetItem === "cloud_face" ? "selected" : ""}>cloud_face</option> <option value="cloud_rain" ${sheetItem === "cloud_rain" ? "selected" : ""}>cloud_rain</option> <option value="paw_big" ${sheetItem === "paw_big" ? "selected" : ""}>paw_big</option> <option value="cat_face_evil" ${sheetItem === "cat_face_evil" ? "selected" : ""}>cat_face_evil</option>  <option value="octopus_left" ${sheetItem === "octopus_left" ? "selected" : ""}>octopus_left</option> <option value="hot_tea" ${sheetItem === "hot_tea" ? "selected" : ""}>hot_tea</option> <option value="fish_left" ${sheetItem === "fish_left" ? "selected" : ""}>fish_left</option> <option value="ant_right" ${sheetItem === "ant_right" ? "selected" : ""}>ant_right</option> <option value="duck_right" ${sheetItem === "duck_right" ? "selected" : ""}>duck_right</option> <option value="chicken_right" ${sheetItem === "chicken_right" ? "selected" : ""}>chicken_right</option> <option value="shinning_star" ${sheetItem === "shinning_star" ? "selected" : ""}>shinning_star</option> <option value="robot" ${sheetItem === "robot" ? "selected" : ""}>robot</option>  <option value="mouse_left" ${sheetItem === "mouse_left" ? "selected" : ""}>mouse_left</option> <option value="ghost_right" ${sheetItem === "ghost_right" ? "selected" : ""}>ghost_right</option> <option value="leaf_big_right" ${sheetItem === "leaf_big_right" ? "selected" : ""}>leaf_big_right</option> <option value="pencil_left" ${sheetItem === "pencil_left" ? "selected" : ""}>pencil_left</option> <option value="spoon" ${sheetItem === "spoon" ? "selected" : ""}>spoon</option> <option value="octopus_wave" ${sheetItem === "octopus_wave" ? "selected" : ""}>octopus_wave</option> <option value="dimon2" ${sheetItem === "dimon2" ? "selected" : ""}>dimon2</option>`;
});
const AlbhabetOptions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sheetItem } = $$props;
  if ($$props.sheetItem === void 0 && $$bindings.sheetItem && sheetItem !== void 0) $$bindings.sheetItem(sheetItem);
  return ` <option value="A" ${sheetItem === "A" ? "selected" : ""}>A</option> <option value="B" ${sheetItem === "B" ? "selected" : ""}>B</option> <option value="C" ${sheetItem === "C" ? "selected" : ""}>C</option> <option value="D" ${sheetItem === "D" ? "selected" : ""}>D</option> <option value="E" ${sheetItem === "E" ? "selected" : ""}>E</option> <option value="F" ${sheetItem === "F" ? "selected" : ""}>F</option> <option value="G" ${sheetItem === "G" ? "selected" : ""}>G</option> <option value="H" ${sheetItem === "H" ? "selected" : ""}>H</option> <option value="I" ${sheetItem === "I" ? "selected" : ""}>I</option> <option value="J" ${sheetItem === "J" ? "selected" : ""}>J</option> <option value="K" ${sheetItem === "K" ? "selected" : ""}>K</option> <option value="L" ${sheetItem === "L" ? "selected" : ""}>L</option>  <option value="M" ${sheetItem === "M" ? "selected" : ""}>M</option> <option value="N" ${sheetItem === "N" ? "selected" : ""}>N</option> <option value="O" ${sheetItem === "O" ? "selected" : ""}>O</option> <option value="P" ${sheetItem === "P" ? "selected" : ""}>P</option> <option value="Q" ${sheetItem === "Q" ? "selected" : ""}>Q</option> <option value="R" ${sheetItem === "R" ? "selected" : ""}>R</option> <option value="S" ${sheetItem === "S" ? "selected" : ""}>S</option> <option value="T" ${sheetItem === "T" ? "selected" : ""}>T</option> <option value="U" ${sheetItem === "U" ? "selected" : ""}>U</option> <option value="V" ${sheetItem === "V" ? "selected" : ""}>V</option> <option value="W" ${sheetItem === "W" ? "selected" : ""}>W</option> <option value="X" ${sheetItem === "X" ? "selected" : ""}>X</option>  <option value="Y" ${sheetItem === "Y" ? "selected" : ""}>Y</option> <option value="Z" ${sheetItem === "Z" ? "selected" : ""}>Z</option> <option value="a" ${sheetItem === "a" ? "selected" : ""}>a</option> <option value="b" ${sheetItem === "b" ? "selected" : ""}>b</option> <option value="c" ${sheetItem === "c" ? "selected" : ""}>c</option> <option value="d" ${sheetItem === "d" ? "selected" : ""}>d</option> <option value="e" ${sheetItem === "e" ? "selected" : ""}>e</option> <option value="f" ${sheetItem === "f" ? "selected" : ""}>f</option> <option value="g" ${sheetItem === "g" ? "selected" : ""}>g</option> <option value="h" ${sheetItem === "h" ? "selected" : ""}>h</option> <option value="i" ${sheetItem === "i" ? "selected" : ""}>i</option> <option value="j" ${sheetItem === "j" ? "selected" : ""}>j</option>  <option value="k" ${sheetItem === "k" ? "selected" : ""}>k</option> <option value="l" ${sheetItem === "l" ? "selected" : ""}>l</option> <option value="m" ${sheetItem === "m" ? "selected" : ""}>m</option> <option value="n" ${sheetItem === "n" ? "selected" : ""}>n</option> <option value="o" ${sheetItem === "o" ? "selected" : ""}>o</option> <option value="p" ${sheetItem === "p" ? "selected" : ""}>p</option> <option value="q" ${sheetItem === "q" ? "selected" : ""}>q</option> <option value="r" ${sheetItem === "r" ? "selected" : ""}>r</option> <option value="s" ${sheetItem === "s" ? "selected" : ""}>s</option> <option value="t" ${sheetItem === "t" ? "selected" : ""}>t</option> <option value="u" ${sheetItem === "u" ? "selected" : ""}>u</option> <option value="v" ${sheetItem === "v" ? "selected" : ""}>v</option>  <option value="w" ${sheetItem === "w" ? "selected" : ""}>w</option> <option value="x" ${sheetItem === "x" ? "selected" : ""}>x</option> <option value="y" ${sheetItem === "y" ? "selected" : ""}>y</option> <option value="z" ${sheetItem === "z" ? "selected" : ""}>z</option> <option value="0" ${sheetItem === "0" ? "selected" : ""}>0</option> <option value="1" ${sheetItem === "1" ? "selected" : ""}>1</option> <option value="2" ${sheetItem === "2" ? "selected" : ""}>2</option> <option value="3" ${sheetItem === "3" ? "selected" : ""}>3</option> <option value="4" ${sheetItem === "4" ? "selected" : ""}>4</option> <option value="5" ${sheetItem === "5" ? "selected" : ""}>5</option> <option value="6" ${sheetItem === "6" ? "selected" : ""}>6</option> <option value="7" ${sheetItem === "7" ? "selected" : ""}>7</option>  <option value="8" ${sheetItem === "8" ? "selected" : ""}>8</option> <option value="9" ${sheetItem === "9" ? "selected" : ""}>9</option> <option value="fullstio" ${sheetItem === "fullstio" ? "selected" : ""}>fullstio</option> <option value="comma" ${sheetItem === "comma" ? "selected" : ""}>comma</option> <option value="semi_colon" ${sheetItem === "semi_colon" ? "selected" : ""}>semi_colon</option> <option value="colon" ${sheetItem === "colon" ? "selected" : ""}>colon</option> <option value="question_mark" ${sheetItem === "question_mark" ? "selected" : ""}>question_mark</option> <option value="exclamation" ${sheetItem === "exclamation" ? "selected" : ""}>exclamation</option> <option value="dash" ${sheetItem === "dash" ? "selected" : ""}>dash</option> <option value="pound" ${sheetItem === "pound" ? "selected" : ""}>pound</option> <option value="double_quote" ${sheetItem === "double_quote" ? "selected" : ""}>double_quote</option> <option value="single_quote" ${sheetItem === "single_quote" ? "selected" : ""}>single_quote</option>  <option value="ampersand" ${sheetItem === "ampersand" ? "selected" : ""}>ampersand</option> <option value="left_bracket" ${sheetItem === "left_bracket" ? "selected" : ""}>left_bracket</option> <option value="right_bracket" ${sheetItem === "right_bracket" ? "selected" : ""}>right_bracket</option> <option value="right_angle_bracket" ${sheetItem === "right_angle_bracket" ? "selected" : ""}>right_angle_bracket</option> <option value="left_angle_bracket" ${sheetItem === "left_angle_bracket" ? "selected" : ""}>left_angle_bracket</option> <option value="tilda" ${sheetItem === "tilda" ? "selected" : ""}>tilda</option> <option value="backslash" ${sheetItem === "backslash" ? "selected" : ""}>backslash</option> <option value="frontslash" ${sheetItem === "frontslash" ? "selected" : ""}>frontslash</option> <option value="registered" ${sheetItem === "registered" ? "selected" : ""}>registered</option> <option value="foot_mark" ${sheetItem === "foot_mark" ? "selected" : ""}>foot_mark</option> <option value="degree_mark" ${sheetItem === "degree_mark" ? "selected" : ""}>degree_mark</option> <option value="plus" ${sheetItem === "plus" ? "selected" : ""}>plus</option>  <option value="isequal" ${sheetItem === "isequal" ? "selected" : ""}>isequal</option> <option value="multiply" ${sheetItem === "multiply" ? "selected" : ""}>multiply</option> <option value="dollar" ${sheetItem === "dollar" ? "selected" : ""}>dollar</option> <option value="greatherThan" ${sheetItem === "greatherThan" ? "selected" : ""}>greatherThan</option> <option value="smallerThan" ${sheetItem === "smallerThan" ? "selected" : ""}>smallerThan</option> <option value="divide" ${sheetItem === "divide" ? "selected" : ""}>divide</option>`;
});
const PeopleOptions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sheetItem } = $$props;
  if ($$props.sheetItem === void 0 && $$bindings.sheetItem && sheetItem !== void 0) $$bindings.sheetItem(sheetItem);
  return ` <option value="man_tblt_stndg" ${sheetItem === "man_tblt_stndg" ? "selected" : ""}>man_tblt_stndg</option> <option value="mf_wlk_biz" ${sheetItem === "mf_wlk_biz" ? "selected" : ""}>mf_wlk_biz</option> <option value="mf_stnd_read" ${sheetItem === "mf_stnd_read" ? "selected" : ""}>mf_stnd_read</option> <option value="gp_selfy" ${sheetItem === "gp_selfy" ? "selected" : ""}>gp_selfy</option> <option value="boy_googles" ${sheetItem === "boy_googles" ? "selected" : ""}>boy_googles</option> <option value="mf_travellers" ${sheetItem === "mf_travellers" ? "selected" : ""}>mf_travellers</option> <option value="m_h_phone_wlk" ${sheetItem === "m_h_phone_wlk" ? "selected" : ""}>m_h_phone_wlk</option> <option value="crowd" ${sheetItem === "crowd" ? "selected" : ""}>crowd</option> <option value="mf_mbl_wlk" ${sheetItem === "mf_mbl_wlk" ? "selected" : ""}>mf_mbl_wlk</option> <option value="old_cpl_jog" ${sheetItem === "old_cpl_jog" ? "selected" : ""}>old_cpl_jog</option> <option value="mom_kids_study" ${sheetItem === "mom_kids_study" ? "selected" : ""}>mom_kids_study</option> <option value="sofa_3people_rdng" ${sheetItem === "sofa_3people_rdng" ? "selected" : ""}>sofa_3people_rdng</option> <option value="3teen_Students" ${sheetItem === "3teen_Students" ? "selected" : ""}>3teen_Students</option> <option value="f_lazy_chair_tblt" ${sheetItem === "f_lazy_chair_tblt" ? "selected" : ""}>f_lazy_chair_tblt</option> <option value="biz_dnr" ${sheetItem === "biz_dnr" ? "selected" : ""}>biz_dnr</option> <option value="sun_bathing" ${sheetItem === "sun_bathing" ? "selected" : ""}>sun_bathing</option>`;
});
const SheetItemsDD = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sheet } = $$props;
  let { sheetItem } = $$props;
  if ($$props.sheet === void 0 && $$bindings.sheet && sheet !== void 0) $$bindings.sheet(sheet);
  if ($$props.sheetItem === void 0 && $$bindings.sheetItem && sheetItem !== void 0) $$bindings.sheetItem(sheetItem);
  return `${sheet == "figs" ? `${validate_component(FigOptions, "FigOptions").$$render($$result, { sheetItem }, {}, {})}` : ``} ${sheet == "alphabets" ? `${validate_component(AlbhabetOptions, "AlbhabetOptions").$$render($$result, { sheetItem }, {}, {})}` : ``} ${sheet == "students" ? `${validate_component(StudentOptions, "StudentOptions").$$render($$result, { sheetItem }, {}, {})}` : ``} ${sheet == "people" ? `${validate_component(PeopleOptions, "PeopleOptions").$$render($$result, { sheetItem }, {}, {})}` : ``}`;
});
const SpriteDD = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { extra } = $$props;
  if ($$props.extra === void 0 && $$bindings.extra && extra !== void 0) $$bindings.extra(extra);
  return `<div class="flex flex-col w-full space-y-2"><div class="border-b border-gray-700"><div class="px-2 text-[10px] text-yellow-200 text-left" data-svelte-h="svelte-1qlrink">Sheet</div> <div class="border border-gray-700 px-2 py-1"><select class="bg-gray-900 text-yellow-200 text-[10px] rounded w-full focus:outline-none focus:ring focus:ring-yellow-400"${add_attribute("value", extra.sheet, 0)}><option value="students" data-svelte-h="svelte-374bv2">Students</option><option value="alphabets" data-svelte-h="svelte-l030lq">Alphabets</option><option value="figs" data-svelte-h="svelte-19yba46">Figs</option><option value="people" data-svelte-h="svelte-1wgqkmi">People</option></select></div></div> <div class="border-b border-gray-700"><div class="px-2 text-[10px] text-yellow-200 text-left" data-svelte-h="svelte-npji2h">S-Items</div> <div class="border border-gray-700 px-2 py-1"><select class="bg-gray-900 text-yellow-200 text-[10px] rounded w-full focus:outline-none focus:ring focus:ring-yellow-400">${validate_component(SheetItemsDD, "SheetItemsDd").$$render(
    $$result,
    {
      sheet: extra.sheet,
      sheetItem: extra.sheetItem
    },
    {},
    {}
  )}</select></div></div></div>`;
});
const IconDD = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { extra } = $$props;
  let icons = [
    { label: "ADD", value: " ➕" },
    { label: "ANGLE", value: " ∠" },
    { label: "BALANCE", value: "⚖️" },
    { label: "BAZIER", value: "🔷" },
    { label: "BARCHART", value: "📊" },
    { label: "BOOK", value: "📘" },
    { label: "BOOKS", value: "📚" },
    { label: "BUS", value: "🚌" },
    { label: "BULB", value: "💡" },
    { label: "CAR", value: "🚗" },
    { label: "CANVAS", value: "🖼️" },
    { label: "CHARTUP", value: "📈" },
    { label: "CHARTDOWN", value: "📉" },
    { label: "CIRCLE", value: "⭕" },
    { label: "CLOCK", value: "⏱️" },
    { label: "COG", value: "⚙" },
    { label: "COMPUTER", value: "💻" },
    { label: "COPY", value: "📋" },
    { label: "CODE", value: "📟" },
    { label: "COLD", value: "🥶" },
    { label: "CROSS", value: "❌" },
    { label: "CLIP", value: "📎" },
    { label: "CLONE", value: "🁜" },
    { label: "DARK", value: "🌃" },
    { label: "DEL", value: "🗑️" },
    { label: "DOOR", value: "🚪" },
    { label: "DOT", value: "🔘" },
    { label: "DOWN", value: "↓" },
    { label: "EMAIL", value: "📧" },
    { label: "EYE", value: "👁️" },
    { label: "EYES", value: "👀" },
    { label: "EXPLOSION", value: "💥" },
    { label: "ELLIPSE", value: "🥚" },
    { label: "FILESBOX", value: "🗃️" },
    { label: "FLOWER", value: "🌸" },
    { label: "FROWNFACE", value: "☹️" },
    { label: "HAMMER_AND_WRENCH", value: "🛠️" },
    { label: "HEART", value: "❤️" },
    { label: "HIDE", value: "🙈" },
    { label: "HOT", value: "🔥" },
    { label: "HOURGLASS", value: "⌛" },
    { label: "HOUSE", value: "🏠" },
    { label: "ICE", value: "🧊" },
    { label: "KEY", value: "🔑" },
    { label: "LOCK", value: "🔒" },
    { label: "LEFT", value: "←" },
    { label: "LINE", value: "➖" },
    { label: "MAGNIFYING_GLASS", value: "🔍" },
    { label: "MANAGER", value: "💼" },
    { label: "MCQ", value: "🔱" },
    { label: "MESSAGE", value: "📨" },
    { label: "MICROSCOPE", value: "🔬" },
    { label: "NET", value: "🌐" },
    { label: "NOTES", value: "📋" },
    { label: "NUMBER", value: "❶" },
    { label: "PALETTE", value: "🎨" },
    { label: "PENCIL", value: " ✏️" },
    { label: "PHONE", value: "📱" },
    { label: "QUESTIONMARK", value: "❓" },
    { label: "RULER", value: "📏" },
    { label: "RIGHT", value: "→" },
    { label: "RECYCLE", value: "♻️" },
    { label: "RECTANGLE", value: "▭" },
    { label: "RUN", value: "🏃" },
    { label: "ROCKET", value: "🚀" },
    { label: "SAVE", value: "💾" },
    { label: "SMILYFACE", value: "😊" },
    { label: "SPEECH", value: "🗣️" },
    { label: "SPEAKER", value: "📢" },
    { label: "NOSPEAKER", value: "🔇" },
    { label: "STAIRS", value: "🪜" },
    { label: "STAR", value: "⭐" },
    { label: "SHEEP", value: "🐑" },
    { label: "START", value: "▶" },
    { label: "STOP", value: "||" },
    { label: "STUDENT", value: "👨‍🎓" },
    { label: "SPRITE", value: "🕹️" },
    { label: "STUDENTCAP", value: "🎓" },
    { label: "SUN", value: "☀️" },
    { label: "SUNRISE", value: "🌅" },
    { label: "SUBTRACT", value: "➖" },
    { label: "TAG", value: "🏷️" },
    { label: "TEAM", value: "🧑‍🤝‍🧑" },
    { label: "TICK", value: "✔️" },
    { label: "TEMPRATURE", value: "🌡️" },
    { label: "TEMPLATE", value: "📜" },
    { label: "TEST", value: "🧪" },
    { label: "TEXT", value: "📃" },
    { label: "TEXT2", value: "¶" },
    { label: "THUMBSUP", value: "👍" },
    { label: "THUMBSDOWN", value: "👎" },
    { label: "TRIANGE", value: "🔺" },
    { label: "TRIANGULAR_RULER", value: "📐" },
    { label: "TREE", value: "🌳" },
    { label: "TV", value: "📺" },
    { label: "WRENCH", value: "🔧" },
    { label: "UP", value: "↑" },
    { label: "MONEYBAG", value: "💰" },
    { label: "MAGNET", value: "🧲" },
    { label: "MAGICWAND", value: "🪄" },
    { label: "MAP", value: "🗺️" },
    { label: "MEDAL", value: "🎖️" },
    { label: "MEGAPHONE", value: "📣" },
    { label: "MICROPHONE", value: "🎤" },
    { label: "MILK", value: "🥛" },
    { label: "MOON", value: "🌙" },
    { label: "MOUNTAIN", value: "⛰️" },
    { label: "MUSIC", value: "🎵" },
    { label: "NETWORK", value: "🔗" },
    { label: "NEWSPAPER", value: "📰" },
    { label: "NOTEBOOK", value: "📓" },
    { label: "OIL", value: "🛢️" },
    { label: "PANDA", value: "🐼" },
    { label: "PARACHUTE", value: "🪂" },
    { label: "PEACE", value: "☮️" },
    { label: "PENGUIN", value: "🐧" },
    { label: "PET", value: "🐾" },
    { label: "PIGGYBANK", value: "🐖" },
    { label: "PINEAPPLE", value: "🍍" },
    { label: "PIZZA", value: "🍕" },
    { label: "PLANET", value: "🪐" },
    { label: "PRINTER", value: "🖨️" },
    { label: "PUZZLE", value: "🧩" },
    { label: "QUILL", value: "🖋️" },
    { label: "RAINBOW", value: "🌈" },
    { label: "RECORD", value: "🎙️" },
    { label: "ROSE", value: "🌹" },
    { label: "SAILBOAT", value: "⛵" },
    { label: "SATELLITE", value: "🛰️" },
    { label: "SCISSORS", value: "✂️" },
    { label: "SCROLL", value: "📜" },
    { label: "SHIELD", value: "🛡️" },
    { label: "SNOWFLAKE", value: "❄️" },
    { label: "SQUIRREL", value: "🐿️" },
    { label: "SUITCASE", value: "💼" },
    { label: "SUNGLASSES", value: "🕶️" },
    { label: "SURFBOARD", value: "🏄‍♂️" },
    { label: "TADA", value: "🎉" },
    { label: "TEA", value: "🍵" },
    { label: "TELESCOPE", value: "🔭" },
    { label: "TENT", value: "⛺" },
    { label: "TOOLS", value: "🛠️" },
    { label: "TORNADO", value: "🌪️" },
    { label: "TROPHY", value: "🏆" },
    { label: "UMBRELLA", value: "☂️" },
    { label: "UNLOCK", value: "🔓" },
    { label: "VAN", value: "🚐" },
    { label: "VIAL", value: "🧪" },
    { label: "VIKING", value: "🛡️" },
    { label: "WALLET", value: "👛" },
    { label: "WATERMELON", value: "🍉" },
    { label: "WHALE", value: "🐋" },
    { label: "WIFI", value: "📶" },
    { label: "WIND", value: "💨" },
    { label: "WOLF", value: "🐺" },
    { label: "YIN_YANG", value: "☯️" },
    { label: "AIRPLANE", value: "✈️" },
    { label: "ALARM", value: "⏰" },
    { label: "APPLE", value: "🍎" },
    { label: "AVOCADO", value: "🥑" },
    { label: "BALLOON", value: "🎈" },
    { label: "BANANA", value: "🍌" },
    { label: "BATTERY", value: "🔋" },
    { label: "BEACH", value: "🏖️" },
    { label: "BELL", value: "🔔" },
    { label: "BICYCLE", value: "🚲" },
    { label: "BIRD", value: "🐦" },
    { label: "BIRTHDAY_CAKE", value: "🎂" },
    { label: "BOMB", value: "💣" },
    { label: "BOOKMARK", value: "🔖" },
    { label: "BOW_AND_ARROW", value: "🏹" },
    { label: "BRIEFCASE2", value: "👜" },
    { label: "BROOM", value: "🧹" },
    { label: "CACTUS", value: "🌵" },
    { label: "CALCULATOR", value: "📟" },
    { label: "CAMERA", value: "📷" },
    { label: "CANDY", value: "🍬" },
    { label: "CANDLE", value: "🕯️" },
    { label: "CARD", value: "💳" },
    { label: "CARROT", value: "🥕" },
    { label: "CAT", value: "🐱" },
    { label: "CHAMPAGNE", value: "🍾" },
    { label: "CHECK_MARK", value: "✅" },
    { label: "CHERRY", value: "🍒" },
    { label: "CHEESE", value: "🧀" },
    { label: "CHESS", value: "♟️" },
    { label: "CHICKEN", value: "🐔" },
    { label: "CLOUD", value: "☁️" },
    { label: "CLAPPERBOARD", value: "🎬" },
    { label: "COOKIE", value: "🍪" },
    { label: "CROWN", value: "👑" },
    { label: "CUPCAKE", value: "🧁" },
    { label: "CUTLERY", value: "🍴" },
    { label: "DAGGER", value: "🗡️" },
    { label: "DIAMOND", value: "💎" },
    { label: "DRUM", value: "🥁" },
    { label: "DUMBBELL", value: "🏋️" },
    { label: "ELEPHANT", value: "🐘" },
    { label: "ENVELOPE", value: "✉️" },
    { label: "FIREWORKS", value: "🎆" },
    { label: "FLAG", value: "🚩" },
    { label: "FLAME", value: "🔥" },
    { label: "FOOTBALL", value: "⚽" },
    { label: "FRIES", value: "🍟" },
    { label: "GEAR2", value: "⚙️" },
    { label: "GIFT", value: "🎁" },
    { label: "GLOBE", value: "🌍" },
    { label: "GUITAR", value: "🎸" },
    { label: "HANDSHAKE", value: "🤝" },
    { label: "HELICOPTER", value: "🚁" },
    { label: "HONEY", value: "🍯" },
    { label: "HURRICANE", value: "🌀" },
    { label: "ICE_CREAM", value: "🍦" },
    { label: "JAM", value: "🍓" },
    { label: "JUICE", value: "🧃" },
    { label: "KITE", value: "🪁" },
    { label: "LAMP", value: "💡" },
    { label: "LEMONADE", value: "🍋" },
    { label: "LIGHTNING", value: "⚡" },
    { label: "LOCKED_BOOK", value: "🔏" },
    { label: "LOUDSPEAKER", value: "📢" },
    { label: "LUNCHBOX", value: "🍱" },
    { label: "MAGNETIC_TAPE", value: "📼" },
    { label: "MAPLE_LEAF", value: "🍁" },
    { label: "MASK", value: "🎭" },
    { label: "MEDICINE", value: "💊" },
    { label: "METEOR", value: "☄️" },
    { label: "MOLECULE", value: "🧬" },
    { label: "MOUSE", value: "🐭" },
    { label: "MUSHROOM", value: "🍄" },
    { label: "NUT_AND_BOLT", value: "🔩" },
    { label: "OCTOPUS", value: "🐙" },
    { label: "ORANGE", value: "🍊" },
    { label: "OWL", value: "🦉" },
    { label: "PAW_PRINT", value: "🐾" },
    { label: "PENCIL2", value: "🖊️" },
    { label: "PILLOW", value: "🛏️" },
    { label: "PINE_TREE", value: "🌲" },
    { label: "POPCORN", value: "🍿" },
    { label: "RADAR", value: "📡" },
    { label: "ROBOT", value: "🤖" },
    { label: "RUBY", value: "💍" },
    { label: "SANDWICH", value: "🥪" },
    { label: "SATURN", value: "🪐" },
    { label: "SEA_SHELL", value: "🐚" },
    { label: "SHARK", value: "🦈" },
    { label: "SHOPPING_BAG", value: "🛍️" },
    { label: "SKULL", value: "💀" },
    { label: "SNORKEL", value: "🤿" },
    { label: "SPIDER", value: "🕷️" },
    { label: "SQUID", value: "🦑" },
    { label: "STETHOSCOPE", value: "🩺" },
    { label: "SWIMMING_POOL", value: "🏊" },
    { label: "SYRINGE", value: "💉" },
    { label: "TOOLBOX", value: "🧰" },
    { label: "TRAFFIC_LIGHT", value: "🚦" },
    { label: "TRAIN", value: "🚆" },
    { label: "TREE2", value: "🌴" },
    { label: "TRUCK", value: "🚚" },
    { label: "VAMPIRE", value: "🧛" },
    { label: "WATERMELON_SLICE", value: "🍉" },
    { label: "ABACUS", value: "🧮" },
    { label: "ALIEN", value: "👽" },
    { label: "AMPHORA", value: "🏺" },
    { label: "ANCHOR", value: "⚓" },
    { label: "ANT", value: "🐜" },
    { label: "ASTRONAUT", value: "👨‍🚀" },
    { label: "ATOM", value: "⚛️" },
    { label: "AXE", value: "🪓" },
    { label: "BACKPACK", value: "🎒" },
    { label: "BADMINTON", value: "🏸" },
    { label: "BAGEL", value: "🥯" },
    { label: "BAGUETTE", value: "🥖" },
    { label: "BAMBOO", value: "🎍" },
    { label: "BANJO", value: "🪕" },
    { label: "BASKET", value: "🧺" },
    { label: "BAT", value: "🦇" },
    { label: "BEAVER", value: "🦫" },
    { label: "BENTO", value: "🍱" },
    { label: "BIOHAZARD", value: "☣️" },
    { label: "BLUEBERRY", value: "🫐" },
    { label: "BOAR", value: "🐗" },
    { label: "BOBSLED", value: "🛷" },
    { label: "BONE", value: "🦴" },
    { label: "BONSAI", value: "🎍" },
    { label: "BOOMERANG", value: "🪃" },
    { label: "BRAIN", value: "🧠" },
    { label: "BREAD", value: "🍞" },
    { label: "BRICK", value: "🧱" },
    { label: "BRIDGE", value: "🌉" },
    { label: "BROCCOLI", value: "🥦" },
    { label: "BROOM_AND_BALL", value: "🧹🏀" },
    { label: "BUBBLE_TEA", value: "🧋" },
    { label: "BUCKET", value: "🪣" },
    { label: "BUTTERFLY", value: "🦋" },
    { label: "CACTUS_IN_POT", value: "🌵🪴" },
    { label: "CALENDAR", value: "📅" },
    { label: "CAMEL", value: "🐪" },
    { label: "CANOE", value: "🛶" },
    { label: "CASTLE", value: "🏰" },
    { label: "CHAINSAW", value: "🪚" },
    { label: "CHAIR", value: "🪑" },
    { label: "CHESTNUT", value: "🌰" },
    { label: "CHIPMUNK", value: "🐿️" },
    { label: "CHOCOLATE_BAR", value: "🍫" },
    { label: "CHOPSTICKS", value: "🥢" },
    { label: "CLAMP", value: "🗜️" },
    { label: "CLOVER", value: "🍀" },
    { label: "COCONUT", value: "🥥" },
    { label: "COFFIN", value: "⚰️" },
    { label: "COIN", value: "🪙" },
    { label: "COMET", value: "☄️" },
    { label: "COMPASS", value: "🧭" },
    { label: "CORAL", value: "🪸" },
    { label: "CORN", value: "🌽" },
    { label: "CRAYON", value: "🖍️" },
    { label: "CRICKET", value: "🦗" },
    { label: "CROCODILE", value: "🐊" },
    { label: "CROISSANT", value: "🥐" },
    { label: "CRYSTAL_BALL", value: "🔮" },
    { label: "CUCUMBER", value: "🥒" },
    { label: "CUPID", value: "💘" },
    { label: "CURLING_STONE", value: "🥌" },
    { label: "CYCLONE", value: "🌀" },
    { label: "DANGO", value: "🍡" },
    { label: "DART", value: "🎯" },
    { label: "DEER", value: "🦌" },
    { label: "DESKTOP", value: "🖥️" },
    { label: "DICE", value: "🎲" },
    { label: "DINOSAUR", value: "🦕" },
    { label: "DIVIDER", value: "〰️" },
    { label: "DNA", value: "🧬" },
    { label: "DONUT", value: "🍩" },
    { label: "DOVE", value: "🕊️" },
    { label: "DRAGON", value: "🐉" },
    { label: "DRILL", value: "🛠️" },
    { label: "DROPLET", value: "💧" },
    { label: "DUCK", value: "🦆" },
    { label: "DUMPLING", value: "🥟" },
    { label: "EAR", value: "👂" },
    { label: "EGGPLANT", value: "🍆" },
    { label: "ELF", value: "🧝" },
    { label: "EVERGREEN", value: "🌲" },
    { label: "FAIRY", value: "🧚" },
    { label: "FALLEN_LEAF", value: "🍂" },
    { label: "FEATHER", value: "🪶" },
    { label: "FERRIS_WHEEL", value: "🎡" },
    { label: "FIRE_EXTINGUISHER", value: "🧯" },
    { label: "FIRECRACKER", value: "🧨" },
    { label: "FISHING_POLE", value: "🎣" },
    { label: "FLEUR_DE_LIS", value: "⚜️" },
    { label: "FLYING_DISC", value: "🥏" },
    { label: "FLYING_SAUCER", value: "🛸" },
    { label: "FOG", value: "🌫️" },
    { label: "FONDUE", value: "🫕" },
    { label: "FOOTPRINTS", value: "👣" },
    { label: "FOUNTAIN", value: "⛲" },
    { label: "FOX", value: "🦊" },
    { label: "FROG", value: "🐸" },
    { label: "GARLIC", value: "🧄" },
    { label: "GENIE", value: "🧞" },
    { label: "GERM", value: "🦠" },
    { label: "GHOST", value: "👻" },
    { label: "GIRAFFE", value: "🦒" },
    { label: "GLOVES", value: "🧤" },
    { label: "GOAT", value: "🐐" },
    { label: "GORILLA", value: "🦍" },
    { label: "GRAPES", value: "🍇" },
    { label: "GRASSHOPPER", value: "🦗" },
    { label: "HAMSA", value: "🧿" },
    { label: "HARMONICA", value: "🎹" },
    { label: "HEADSTONE", value: "🪦" },
    { label: "HEDGEHOG", value: "🦔" },
    { label: "HERB", value: "🌿" },
    { label: "HIBISCUS", value: "🌺" },
    { label: "HIPPOPOTAMUS", value: "🦛" },
    { label: "HOOK", value: "🪝" },
    { label: "HOURGLASS_DONE", value: "⌛" },
    { label: "IGLOO", value: "�iglq" },
    { label: "INFINITY", value: "♾️" },
    { label: "JELLYFISH", value: "🪼" },
    { label: "JIGSAW", value: "🧩" },
    { label: "JOYSTICK", value: "🕹️" },
    { label: "KANGAROO", value: "🦘" },
    { label: "KIWI", value: "🥝" },
    { label: "KNOT", value: "🪢" },
    { label: "KOALA", value: "🐨" },
    { label: "LABCOAT", value: "🥼" },
    { label: "LADDER", value: "🪜" },
    { label: "LADYBUG", value: "🐞" },
    { label: "LASSO", value: "🪃" },
    { label: "LEMON", value: "🍋" },
    { label: "LEOPARD", value: "🐆" },
    { label: "LEVITATE", value: "🕴️" },
    { label: "LIGHT_BULB", value: "💡" },
    { label: "LIZARD", value: "🦎" },
    { label: "LLAMA", value: "🦙" },
    { label: "LOBSTER", value: "🦞" },
    { label: "LOLLIPOP", value: "🍭" },
    { label: "LOTUS", value: "🪷" },
    { label: "LUGGAGE", value: "🧳" },
    { label: "LUNGS", value: "🫁" },
    { label: "MAGE", value: "🧙" },
    { label: "MANGO", value: "🥭" },
    { label: "MANTIS", value: "🦗" },
    { label: "MICROBE", value: "🦠" },
    { label: "MIRROR", value: "🪞" },
    { label: "MOAI", value: "🗿" },
    { label: "MOLE", value: "🐀" },
    { label: "MONKEY", value: "🐒" },
    { label: "MOSQUITO", value: "🦟" },
    { label: "MOTOR_SCOOTER", value: "🛵" },
    { label: "MOTORCYCLE", value: "🏍️" },
    { label: "MOUNTAIN_CABLEWAY", value: "🚠" },
    { label: "NAZAR_AMULET", value: "🧿" },
    { label: "NECKTIE", value: "👔" },
    { label: "NESTING_DOLLS", value: "🪆" },
    { label: "NINJA", value: "🥷" },
    { label: "ONION", value: "🧅" },
    { label: "ORANGUTAN", value: "🦧" },
    { label: "OTTER", value: "🦦" },
    { label: "OYSTER", value: "🦪" },
    { label: "PACKAGE", value: "📦" },
    { label: "PAINTBRUSH", value: "🖌️" },
    { label: "PALM_TREE", value: "🌴" },
    { label: "PANCAKES", value: "🥞" },
    { label: "PAPERCLIP", value: "📎" },
    { label: "PARROT", value: "🦜" },
    { label: "PEACH", value: "🍑" },
    { label: "PEACOCK", value: "🦚" },
    { label: "PEANUTS", value: "🥜" },
    { label: "PEARL", value: "🫠" },
    { label: "PEAR", value: "🍐" },
    { label: "PENCIL_AND_PAPER", value: "📝" },
    { label: "PEPPER", value: "🌶️" },
    { label: "PETRI_DISH", value: "🧫" },
    { label: "PICKAXE", value: "⛏️" },
    { label: "PIEZO", value: "🔊" },
    { label: "PIGEON", value: "🕊️" },
    { label: "PILL", value: "💊" },
    { label: "PINATA", value: "🪅" },
    { label: "PINCH", value: "🤏" },
    { label: "PINEAPPLE_SLICE", value: "🍍" },
    { label: "PING_PONG", value: "🏓" },
    { label: "PIRATE", value: "🏴‍☠️" },
    { label: "PLANT_IN_POT", value: "🪴" },
    { label: "PLATYPUS", value: "🦡" },
    { label: "PLUNGER", value: "🪠" },
    { label: "POPCORN_BUCKET", value: "🍿" },
    { label: "POTATO", value: "🥔" },
    { label: "PRETZEL", value: "🥨" },
    { label: "PROTOZOA", value: "🦠" },
    { label: "PUMPKIN", value: "🎃" },
    { label: "PUSHPIN", value: "📌" },
    { label: "RABBIT", value: "🐰" },
    { label: "RACCOON", value: "🦝" },
    { label: "RADIO", value: "📻" },
    { label: "RAIL_CAR", value: "🚃" },
    { label: "RAINBOW_FLAG", value: "🏳️‍🌈" },
    { label: "RAMEN", value: "🍜" },
    { label: "RAT", value: "🐀" },
    { label: "RECEIPT", value: "🧾" },
    { label: "RHINOCEROS", value: "🦏" },
    { label: "RICE", value: "🍚" },
    { label: "RING_BUOY", value: "🛟" },
    { label: "ROCK", value: "🪨" },
    { label: "ROOSTER", value: "🐓" },
    { label: "SAFETY_PIN", value: "🧷" },
    { label: "SAFETY_VEST", value: "🦺" },
    { label: "SALT", value: "🧂" },
    { label: "SANDAL", value: "👡" },
    { label: "SATELLITE_ANTENNA", value: "📡" },
    { label: "SAUROPOD", value: "🦕" },
    { label: "SCALES", value: "⚖️" },
    { label: "SCARF", value: "🧣" },
    { label: "SCORPION", value: "🦂" },
    { label: "SCREWDRIVER", value: "🪛" },
    { label: "SEAL", value: "🦭" },
    { label: "SEEDLING", value: "🌱" },
    { label: "SHAMROCK", value: "☘️" },
    { label: "SHRIMP", value: "🦐" },
    { label: "SKUNK", value: "🦨" },
    { label: "SLED", value: "🛷" },
    { label: "SLOTH", value: "🦥" },
    { label: "SNAIL", value: "🐌" },
    { label: "SNAKE", value: "🐍" },
    { label: "SNOWBOARDER", value: "🏂" },
    { label: "SNOWMAN", value: "☃️" },
    { label: "SOAP", value: "🧼" },
    { label: "SOCCER_BALL", value: "⚽" },
    { label: "SOCKS", value: "🧦" },
    { label: "SOFTBALL", value: "🥎" },
    { label: "SPADE", value: "♠️" },
    { label: "SPAGHETTI", value: "🍝" },
    { label: "SPARKLES", value: "✨" },
    { label: "SPARKLER", value: "🎇" },
    { label: "SPARKLING_HEART", value: "💖" },
    { label: "SPOON", value: "🥄" },
    { label: "SPORTS_MEDAL", value: "🏅" },
    { label: "STACKED_BOOKS", value: "📚" },
    { label: "STAPLER", value: "🗄️" },
    { label: "STOPWATCH", value: "⏱️" },
    { label: "STORM", value: "🌩️" },
    { label: "STRAWBERRY", value: "🍓" },
    { label: "SUNFLOWER", value: "🌻" },
    { label: "SUSHI", value: "🍣" },
    { label: "SWAN", value: "🦢" },
    { label: "SWEAT_DROPLETS", value: "💦" },
    { label: "T_REX", value: "🦖" },
    { label: "TACO", value: "🌮" },
    { label: "TAKEOUT_BOX", value: "🥡" },
    { label: "TAMALE", value: "🫔" },
    { label: "TANGERINE", value: "🍊" },
    { label: "TAXI", value: "🚕" },
    { label: "TEAPOT", value: "🫖" },
    { label: "TEDDY_BEAR", value: "🧸" },
    { label: "TENNIS", value: "🎾" },
    { label: "THERMOMETER", value: "🌡️" },
    { label: "THONG_SANDAL", value: "🩴" },
    { label: "THREAD", value: "🧵" },
    { label: "TICKET", value: "🎟️" },
    { label: "TIGER", value: "🐯" },
    { label: "TOILET", value: "🚽" },
    { label: "TOMATO", value: "🍅" },
    { label: "TONGUE", value: "👅" },
    { label: "TRACTOR", value: "🚜" },
    { label: "TROLLEYBUS", value: "🚎" },
    { label: "TSHIRT", value: "👕" },
    { label: "TULIP", value: "🌷" },
    { label: "TURKEY", value: "🦃" },
    { label: "TURTLE", value: "🐢" },
    { label: "UNICORN", value: "🦄" },
    { label: "VIOLIN", value: "🎻" },
    { label: "VOLLEYBALL", value: "🏐" },
    { label: "WAFFLE", value: "🧇" },
    { label: "WASTEBASKET", value: "🗑️" },
    { label: "WATCH", value: "⌚" },
    { label: "WATER_BUFFALO", value: "🐃" },
    { label: "WATER_POLO", value: "🤽" },
    { label: "WATER_WAVE", value: "🌊" },
    { label: "WATERFALL", value: "🧗‍♀️" },
    { label: "WINDMILL", value: "🏰" },
    { label: "WINDOW", value: "🪟" },
    { label: "WINE_GLASS", value: "🍷" },
    { label: "WOOD", value: "🪵" },
    { label: "WORM", value: "🪱" },
    { label: "WREATH", value: "🎍" },
    { label: "WRITING_HAND", value: "✍️" },
    { label: "X_RAY", value: "🦴" },
    { label: "YARN", value: "🧶" },
    { label: "YO_YO", value: "🪀" },
    { label: "ZEBRA", value: "🦓" },
    { label: "ZOMBIE", value: "🧟" }
  ];
  if ($$props.extra === void 0 && $$bindings.extra && extra !== void 0) $$bindings.extra(extra);
  return `<select class="bg-gray-900 text-yellow-200 text-[10px] rounded w-full p-1 focus:outline-none focus:ring focus:ring-yellow-400">${each(icons, (icon) => {
    return `<option${add_attribute("value", icon.value, 0)} class="bg-gray-800 text-yellow-200 text-[10px] p-1">${escape(icon.value)} ${escape(icon.label)} </option>`;
  })}</select>`;
});
const LinesDD = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { extra } = $$props;
  if ($$props.extra === void 0 && $$bindings.extra && extra !== void 0) $$bindings.extra(extra);
  return `<div class="flex flex-col w-full space-y-2"><div class="border-b border-gray-700"><div class="px-2 text-[10px] text-yellow-200 text-left" data-svelte-h="svelte-rkhdmx">Shapes</div> <div class="border border-gray-700 px-2 py-1"><select class="bg-gray-900 text-yellow-200 text-[10px] rounded w-full focus:outline-none focus:ring focus:ring-yellow-400"><option value="arrowLeft" data-svelte-h="svelte-vkwnya">Arrow Left</option><option value="arrowRight" data-svelte-h="svelte-b54tus">Arrow Right</option><option value="arrowUp" data-svelte-h="svelte-13evpfa">Arrow Up</option><option value="arrowDown" data-svelte-h="svelte-op3uvi">Arrow Down</option><option value="pentagon" data-svelte-h="svelte-k90dy6">Pentagon</option><option value="hexagon" data-svelte-h="svelte-22zgru">Hexagon</option><option value="equilateralTriangle" data-svelte-h="svelte-zldim2">Equilateral Triangle</option><option value="rightTriangle" data-svelte-h="svelte-1hn956o">Right Triangle</option><option value="isoscelesUp" data-svelte-h="svelte-17lnlmf">Isosceles Triangle (Up)</option><option value="isoscelesDown" data-svelte-h="svelte-1vshl63">Isosceles Triangle (Down)</option><option value="rightTriangleLeft" data-svelte-h="svelte-6iuafz">Right-Angled Triangle (Left)</option><option value="rightTriangleRight" data-svelte-h="svelte-atblhh">Right-Angled Triangle (Right)</option><option value="scaleneTriangle" data-svelte-h="svelte-1pq74k2">Scalene Triangle</option><option value="sword" data-svelte-h="svelte-1mqi5fs">Sword</option><option value="shield" data-svelte-h="svelte-prxbly">Shield</option><option value="star" data-svelte-h="svelte-fvc1gu">Star</option><option value="heart" data-svelte-h="svelte-12wxiju">Heart</option><option value="lightning" data-svelte-h="svelte-qfzdwz">Lightning Bolt</option><option value="crown" data-svelte-h="svelte-vruejk">Crown</option></select></div></div></div>`;
});
const DialogueBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  let { dialogueBox } = $$props;
  const componentMap = {
    Number: InputNumber,
    Float: InputFloat,
    TextArea: InputTextArea,
    Text: InputText,
    Boolean: InputCheckbox,
    Color: InputColor,
    FontFamily: FontFamilyDD
  };
  if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
  if ($$props.dialogueBox === void 0 && $$bindings.dialogueBox && dialogueBox !== void 0) $$bindings.dialogueBox(dialogueBox);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${item ? `<div class="flex flex-col overflow-y-auto max-h-[70vh] rounded-lg shadow mx-2 my-2">    ${item.itemExtra.type === "sprite" ? `<div><div>${validate_component(SpriteDD, "SpriteDD").$$render(
      $$result,
      { extra: item.itemExtra },
      {
        extra: ($$value) => {
          item.itemExtra = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : ``} ${item.itemExtra.type === "icon" ? `<div><div>${validate_component(IconDD, "IconDD").$$render(
      $$result,
      { extra: item.itemExtra },
      {
        extra: ($$value) => {
          item.itemExtra = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : ``} ${item.itemExtra.type === "lines" ? `<div><div>${validate_component(LinesDD, "LinesDD").$$render(
      $$result,
      { extra: item.itemExtra },
      {
        extra: ($$value) => {
          item.itemExtra = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : ``}  <div class="border-b border-gray-700">${each(dialogueBox, (dialogueItem) => {
      return `${componentMap[dialogueItem.type] ? `<div class="border border-gray-700 px-2 text-[10px] text-yellow-200 text-left">${escape(dialogueItem.name)}</div> <div class="border border-gray-700 px-2 py-1">${validate_component(componentMap[dialogueItem.type] || missing_component, "svelte:component").$$render(
        $$result,
        {
          config: dialogueItem.config || {},
          value: item.itemExtra[dialogueItem.name]
        },
        {
          value: ($$value) => {
            item.itemExtra[dialogueItem.name] = $$value;
            $$settled = false;
          }
        },
        {}
      )} </div>` : ``}`;
    })}</div></div>` : `<h6 class="text-sm text-gray-400" data-svelte-h="svelte-14jc0mw">No item selected</h6>`}`;
  } while (!$$settled);
  return $$rendered;
});
const CanvasCommand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { extra } = $$props;
  if ($$props.extra === void 0 && $$bindings.extra && extra !== void 0) $$bindings.extra(extra);
  return `<div class="flex w-full text-white rounded-md justify-center bg-stone-700 p-1 m-1 border-2 border-white"><div class="flex justify-end gap-1"><button class="p-1 m-1 text-xs rounded-md hover:bg-slate-700" data-svelte-h="svelte-1p2p7ch">Canvas</button></div></div> ${`<div class="flex flex-col w-full"><div class="flex justify-between items-center border border-white p-1"><div class="text-white" data-svelte-h="svelte-k09gu7">Templates</div> <select class="bg-gray-900 text-white p-1"><option value="" data-svelte-h="svelte-1vbnolo">None</option><option value="blue" data-svelte-h="svelte-jwqbke">blue</option></select></div> <div class="flex justify-between items-center border border-white p-1"><div class="text-white" data-svelte-h="svelte-19vtxbk">Bg Img</div> <select class="bg-gray-900 text-white p-1"><option value="null" data-svelte-h="svelte-1rt94z7">None</option><option value="system_images/bg_images/paper01.jpg" data-svelte-h="svelte-1rvk0vj">paper01</option></select></div></div>`}`;
});
function itemsToitemObjects(items, assets) {
  let itemObjects = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemObj = itemToObject(item, assets);
    if (itemObj) {
      itemObjects.push(itemObj);
    }
  }
  return itemObjects;
}
let interval = null;
const CanvasEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedItemIndexStore, $$unsubscribe_selectedItemIndexStore;
  $$unsubscribe_selectedItemIndexStore = subscribe(selectedItemIndexStore, (value) => $selectedItemIndexStore = value);
  let { items } = $$props;
  let { slideExtra } = $$props;
  let { assets } = $$props;
  let { showAddToolbar: showAddToolbar2 = true } = $$props;
  let selectedItem = null;
  let showCanvasFlag = false;
  let currentMouseX = 0;
  let currentMouseY = 0;
  onDestroy(async () => {
    clearInterval(interval);
  });
  function getDialogueBox(itemType) {
    const staticItem = SlideObject.Canvas.ItemsMap.get(itemType);
    return staticItem.dialogueBox();
  }
  function addNewItem(newItemExtra) {
    const firstSegment = uuid().split("-")[0];
    const name = newItemExtra.type + "_" + firstSegment;
    const newItem = SlideObject.getNewItem(newItemExtra, name);
    items.unshift(newItem);
    items = [...items];
    selectedItemIndexStore.set(0);
    selectedItem = new SelectedItem(getSelectedItemObject());
  }
  function eventMouseDown(e, ctx) {
    if (selectedItem) {
      const { x, y } = getMouseData(e);
      selectedItem.mouseDown(x, y);
    }
  }
  function eventMouseMove(e, ctx) {
    const { x, y } = getMouseData(e);
    currentMouseX = x.toFixed(0);
    currentMouseY = y.toFixed(0);
    if (selectedItem) {
      selectedItem.mouseMove(x, y);
    }
  }
  function eventMouseUp() {
    if (selectedItem) {
      selectedItem.mouseUp();
      items = [...items];
    }
  }
  async function eventDblClick(e, ctx) {
    await checkHit(e, ctx);
  }
  async function checkHit(e, ctx) {
    const { x, y } = getMouseData(e);
    for (let i = 0; i < items.length; i++) {
      const itemObject = itemToObject(items[i], assets);
      if (itemObject && itemObject.isHit(x, y, ctx)) {
        setSelectedItemIndex(i);
        return;
      }
    }
    selectedItemIndexStore.set(-1);
    selectedItem = null;
  }
  function getSelectedItemObject() {
    const currentIndex = $selectedItemIndexStore;
    if (currentIndex === -1) return null;
    const itemData = items[currentIndex];
    return itemToObject(itemData, assets);
  }
  function setSelectedItemIndex(index) {
    selectedItemIndexStore.set(index);
    selectedItem = new SelectedItem(getSelectedItemObject());
  }
  function postDraw(ctx) {
    const selectedObj = getSelectedItemObject();
    if (selectedObj) {
      const selected = new SelectedItem(selectedObj);
      selected.drawHandles(ctx);
    }
  }
  function showCanvas() {
    showCanvasFlag = !showCanvasFlag;
  }
  function clone() {
    if (selectedItem) {
      const currentIndex = $selectedItemIndexStore;
      const clonedItem = JSON.parse(JSON.stringify(items[currentIndex]));
      delete clonedItem._id;
      clonedItem.itemExtra.x = (clonedItem.itemExtra.x || 0) + 20;
      clonedItem.itemExtra.y = (clonedItem.itemExtra.y || 0) + 20;
      items.splice(currentIndex, 0, clonedItem);
      items = [...items];
    }
  }
  function deleteFn() {
    const currentIndex = $selectedItemIndexStore;
    if (currentIndex !== -1) {
      items.splice(currentIndex, 1);
      items = [...items];
      selectedItemIndexStore.set(-1);
      selectedItem = null;
    }
  }
  function logSlideLocal() {
    console.log("items", items);
    console.log("slideExtra", slideExtra);
  }
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.slideExtra === void 0 && $$bindings.slideExtra && slideExtra !== void 0) $$bindings.slideExtra(slideExtra);
  if ($$props.assets === void 0 && $$bindings.assets && assets !== void 0) $$bindings.assets(assets);
  if ($$props.showAddToolbar === void 0 && $$bindings.showAddToolbar && showAddToolbar2 !== void 0) $$bindings.showAddToolbar(showAddToolbar2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if (items.length > 0) {
          itemsToitemObjects(items, assets);
        } else {
          selectedItemIndexStore.set(-1);
        }
      }
    }
    $$rendered = `${items ? `${showAddToolbar2 ? `<div class="flex w-full p-0 m-0">${validate_component(AddToolbar, "AddToolbar").$$render(
      $$result,
      {
        icons: assets.icons,
        addNewItem,
        clone,
        deleteFn,
        logSlideLocal,
        showCanvas
      },
      {},
      {}
    )}</div>` : ``} <div class="flex w-full p-0 m-0 bg-stone-900 text-white p-2 gap-1"><div class="mx-1">${validate_component(CanvasPlayer, "CanvasPlayer").$$render(
      $$result,
      {
        items,
        slideExtra,
        assets,
        postDraw,
        eventMouseDown,
        eventMouseUp,
        eventDblClick,
        eventMouseMove
      },
      {},
      {}
    )} <div class="bg-gray-900 text-[10px] text-yellow-600"><span class="bg-stone-700 rounded-md p-1">${escape(`x: ${currentMouseX} y: ${currentMouseY}`)}</span> <span class="bg-stone-700 rounded-md p-1">${escape(`Total Items = ${items.length}`)}</span> <span class="bg-stone-700 rounded-md p-1">${escape(`Selected Index = ${$selectedItemIndexStore === -1 ? "null" : $selectedItemIndexStore}`)}</span> ${$selectedItemIndexStore != -1 ? `<span class="bg-stone-700 rounded-md p-1">${escape(`Selected Item = ${items[$selectedItemIndexStore].itemExtra.name}`)}</span>` : `<span class="bg-stone-700 rounded-md p-1">${escape(`Selected Item = Null`)}</span>`}</div></div> <div class="w-3/12 text-center">${showCanvasFlag ? `${validate_component(CanvasCommand, "CanvasCommand").$$render($$result, { extra: slideExtra }, {}, {})}` : `${validate_component(SelectItemMenu, "SelectItemMenu").$$render(
      $$result,
      {
        selectedItemIndex: $selectedItemIndexStore,
        setSelectedItemIndex,
        items
      },
      {
        items: ($$value) => {
          items = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${selectedItem ? `${validate_component(DialogueBox, "DialogueBox").$$render(
      $$result,
      {
        dialogueBox: getDialogueBox(items[$selectedItemIndexStore].itemExtra.type),
        item: items[$selectedItemIndexStore]
      },
      {
        item: ($$value) => {
          items[$selectedItemIndexStore] = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}`}</div></div>` : ``}`;
  } while (!$$settled);
  $$unsubscribe_selectedItemIndexStore();
  return $$rendered;
});
let showAddToolbar = true;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slide = null;
  let assets = null;
  let fileNameToSave = "slide";
  function createNewSlide() {
    slide = SlideObject.Canvas.getNewSlide();
  }
  function saveSlide() {
    const jsonString = `export const Slide = ${JSON.stringify(slide, null, 2)}`;
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileNameToSave}.js`;
    a.click();
    URL.revokeObjectURL(url);
  }
  async function importFile(event) {
    const file = event.target.files[0];
    if (file) {
      try {
        const text = await file.text();
        const cleanedText = text.replace(/export\s+const\s+\w+\s*=\s*/, "");
        const slideData = new Function(`return ${cleanedText}`)();
        slide = slideData;
      } catch (error) {
        console.error(
          "Error loading JS file:",
          error
        );
        alert("Error loading file. Please ensure it is a valid JS file with a slide object.");
      }
    }
  }
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(AppToolbar, "AppToolbar").$$render(
      $$result,
      {
        createNewSlide,
        importFile,
        saveSlide,
        fileNameToSave
      },
      {
        fileNameToSave: ($$value) => {
          fileNameToSave = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="w-full bg-gray-700 text-white py-2 px-1 min-h-screen ">${slide && assets ? `${validate_component(CanvasEditor, "CanvasEditor").$$render(
      $$result,
      {
        assets,
        showAddToolbar,
        items: slide.items,
        slideExtra: slide.slideExtra
      },
      {
        items: ($$value) => {
          slide.items = $$value;
          $$settled = false;
        },
        slideExtra: ($$value) => {
          slide.slideExtra = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
