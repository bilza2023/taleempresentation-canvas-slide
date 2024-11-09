// Handle.js
export default class Handle {
  constructor(position = 'center', options = {}) {
      this.position = position; //center
      this.size = options.size || 10;
      this.color = options.color || '#1a73e8';
      this.hoverColor = options.hoverColor || '#64b5f6';
      this.isHovered = false;
      this.cursor = options.cursor || 'pointer';
      this.icon = options.icon || null;
  }

  getPosition(bounds) {
      const { x, y, width, height } = bounds;
      const positions = {
          'top-left': { x, y },
          'top-right': { x: x + width, y },
          'bottom-left': { x, y: y + height },
          'bottom-right': { x: x + width, y: y + height },
          'top': { x: x + width/2, y },
          'bottom': { x: x + width/2, y: y + height },
          'left': { x, y: y + height/2 },
          'right': { x: x + width, y: y + height/2 },
          'center': { x: x + width/2, y: y + height/2 }
      };
      // get the correct position(field) from positions OBJ using this.position
      return positions[this.position] || positions.center;
  }

  draw(ctx, bounds) {
      const pos = this.getPosition(bounds);
      const halfSize = this.size / 2;

      ctx.save();
      ctx.fillStyle = this.isHovered ? this.hoverColor : this.color;
      ctx.fillRect(pos.x - halfSize, pos.y - halfSize, this.size, this.size);

      if (this.icon) {
          ctx.fillStyle = '#ffffff';
          ctx.font = `${this.size * 0.8}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.icon, pos.x, pos.y);
      }

      ctx.restore();
  }

  isHit(x, y, bounds) {
      const pos = this.getPosition(bounds);
      const halfSize = this.size / 2;
      return (
          x >= pos.x - halfSize &&
          x <= pos.x + halfSize &&
          y >= pos.y - halfSize &&
          y <= pos.y + halfSize
      );
  }
}