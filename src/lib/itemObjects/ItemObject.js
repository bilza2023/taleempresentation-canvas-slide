//@ts-nocheck

export default class ItemObject {
  constructor(itemData, assets) {
      this.itemData = itemData;
      this.assets = assets;
  }

  isVisible(currentTime) {
      if (!this.itemData.itemExtra.showAt) {
          return true;
      }
      return currentTime >= this.itemData.itemExtra.showAt;
  }

  // eslint-disable-next-line no-unused-vars
  draw(ctx, currentTime = 0) {
      console.log("ComponentObject draw");
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
    return (
        mouseX >= bounds.x &&
        mouseX <= bounds.x + bounds.width &&
        mouseY >= bounds.y &&
        mouseY <= bounds.y + bounds.height
    );
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

  set width(newWidth) {
      this.itemData.itemExtra.width = newWidth;
  }

  get height() {
      return this.itemData.itemExtra.height;
  }

  set height(newHeight) {
      this.itemData.itemExtra.height = newHeight;
  }

  // Properties getters and setters
  get command() {
      return this.itemData.itemExtra.command;
  }

  set command(value) {
      this.itemData.itemExtra.command = value;
  }

  get name() {
      return this.itemData.itemExtra.name;
  }

  set name(value) {
      this.itemData.itemExtra.name = value;
  }

  get color() {
      return this.itemData.itemExtra.color;
  }

  set color(value) {
      this.itemData.itemExtra.color = value;
  }

  get showAt() {
      return this.itemData.itemExtra.showAt;
  }

  set showAt(value) {
      this.itemData.itemExtra.showAt = value;
  }

  // Appearance properties
  get globalAlpha() {
      return this.itemData.itemExtra.globalAlpha;
  }

  set globalAlpha(value) {
      this.itemData.itemExtra.globalAlpha = value;
  }

  get gap() {
      return this.itemData.itemExtra.gap;
  }

  set gap(value) {
      this.itemData.itemExtra.gap = value;
  }

  get dash() {
      return this.itemData.itemExtra.dash;
  }

  set dash(value) {
      this.itemData.itemExtra.dash = value;
  }

  // Shadow properties
  get shadowOffsetX() {
      return this.itemData.itemExtra.shadowOffsetX;
  }

  set shadowOffsetX(value) {
      this.itemData.itemExtra.shadowOffsetX = value;
  }

  get shadowOffsetY() {
      return this.itemData.itemExtra.shadowOffsetY;
  }

  set shadowOffsetY(value) {
      this.itemData.itemExtra.shadowOffsetY = value;
  }

  get shadowColor() {
      return this.itemData.itemExtra.shadowColor;
  }

  set shadowColor(value) {
      this.itemData.itemExtra.shadowColor = value;
  }

  get shadowBlur() {
      return this.itemData.itemExtra.shadowBlur;
  }

  set shadowBlur(value) {
      this.itemData.itemExtra.shadowBlur = value;
  }
}