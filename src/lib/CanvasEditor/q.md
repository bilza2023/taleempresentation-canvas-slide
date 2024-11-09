Look at this code selection,handles and edit feature

CanvasEditorPlayer has SelectedItem. if an item is selected it display handles which allow user to edit the item (move,widen,heighten).

For Handles we have HandleManager and Handle object.

in this process we are using itemObject (ComponentObj).

THE PROBLEM:
        - The handles are drawn at different place while the isHit is looking for a different place. i know this when mouse is moved on top left cornor of Handle it has hover:color. so user has to place mouse a little out of Handle (top left) to actually click it.
        - the second problem is also almost the same . when the width / height is changed the offset of the Handle and the click area also increases. 

What can be the reason for this ? All i want that the Handles should be clicked on top of the drawn handles.

CanvasEditorPlayer.svelte
<script>
  import { onMount, onDestroy } from "svelte";
  import itemToObject from "../componentObjects/itemToObject";
  import CanvasPlayer from "../canvasPlayer/CanvasPlayer.svelte";
  import SelectedItem from "./SelectedItem";
  import AddToolbar from "./AddToolbar.svelte";
  import getNewItem from "./getNewItem";
  import getMouseData from "./getMouseData";
  import uuid from "./uuid";
  
  export let currentTime = 0;
  export let items;
  export let slideData;
  export let slideExtra;
  export let assets;
  export let showAddToolbar = true;
  
  export let itemObjects = [];
  let selectedItem = null;
  let interval = null;
  
  onMount(async () => {
      interval = setInterval(update, 20);
  });
  
  onDestroy(async () => {
      clearInterval(interval);
  });
  
  function addNewItem(newItemExtraFn) {
      const newItemExtra = newItemExtraFn();
      const newItem = getNewItem();
      newItem.itemExtra = newItemExtra;
      items.unshift(newItem);
      items = [...items];
  }
  
  function update() {
      console.log("update");
  }
  
  function updateItemObjects() {
      itemObjects = [];
      for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const itemObj = itemToObject(item, {}, assets.spriteImages);
          if (itemObj) {
              itemObjects.push(itemObj);
          }
      }
  }
  
  $: {
      items;
      updateItemObjects();
  }
  
  function deleteSelectedItem() {
      if (selectedItem) {
          const index = items.findIndex(item => item.uuid === selectedItem.itemObject.itemData.uuid);
          if (index !== -1) {
              items.splice(index, 1);
              items = [...items];
              selectedItem = null;
          }
      }
  }
  
  function eventMouseDown(e, ctx) {
      if (selectedItem) {
          const {x, y} = getMouseData(e);
          selectedItem.mouseDown(x, y);
      }
  }
  
  function eventMouseMove(e, ctx) {
      if (selectedItem) {
          const {x, y} = getMouseData(e);
          selectedItem.mouseMove(x, y);
      }
  }
  
  function eventMouseUp() {
      if (selectedItem) {
          selectedItem.mouseUp();
      }
  }
  
  async function eventDblClick(e, ctx) {
      await checkHit(e, ctx);
  }
  
  async function checkHit(e, ctx) {
      const canvas = e.target;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      for (let i = 0; i < itemObjects.length; i++) {
          const itemObject = itemObjects[i];
          if (itemObject.isHit(x, y, ctx)) {
              selectedItem = new SelectedItem(itemObject);
              selectedItem.setDeleteCallback(deleteSelectedItem);
              return;
          }
      }
      selectedItem = null;
  }
  
  function postDraw(ctx) {
      if (selectedItem !== null) {
          selectedItem.drawHandles(ctx);
      }
  }

  // function deleteItem(){
  //   console.log("Deleting selected item");
  // }
  </script>
  
  {#if items}
      {#if showAddToolbar}
          <div class="flex justify-center w-full p-0 m-0">
              <AddToolbar icons={assets.icons} {addNewItem} />
          </div>
      {/if}
      <div class='p-0 m-0 bg-stone-900'>
          <CanvasPlayer
              {currentTime}
              slideData={slideData}
              {items}
              slideExtra={slideExtra}
              {assets}
              {postDraw}
              {eventMouseDown}
              {eventMouseUp}
              {eventDblClick}
              {eventMouseMove}
          />
      </div>
  {/if}

  SelectedItem.js
  // SelectedItem.js
import HandleManager from './HandleManager.js';

export default class SelectedItem {
    constructor(itemObject) {
        
        this.itemObject = itemObject;
        this.handleManager = new HandleManager(itemObject);
    }

    drawHandles(ctx) {
        this.handleManager.draw(ctx);
    }

    mouseDown(x, y) {
        return this.handleManager.handleMouseDown(x, y);
    }

    mouseMove(x, y) {
        return this.handleManager.handleMouseMove(x, y);
    }

    mouseUp() {
        this.handleManager.handleMouseUp();
    }

    isHit(x, y) {
        return this.handleManager.handleMouseDown(x, y);
    }

    setDeleteCallback(callback) {
        this.handleManager.setDeleteCallback(callback);
    }

}
HandleManage.js
// HandleManager.js
import Handle from './Handle.js';

export default class HandleManager {
    constructor(itemObject) {

        this.itemObject = itemObject;
        this.handles = new Map();
        this.activeHandle = null;
        this.startPos = { x: 0, y: 0 };
        this.startBounds = { x: 0, y: 0, width: 0, height: 0 };

        this.initializeHandles();
    }

    initializeHandles() {
        // Resize handles
    
        this.addHandle('widthHandle', new Handle('top-right', { 
            cursor: 'ne-resize',
            color: '#2196f3'
        }));

        // this.addHandle('delete', new Handle('bottom-left', { 
        //     icon: '🗑️',
        //     size: 15,
        //     color: '#f44336'
        // }));

        this.addHandle('heightHandle', new Handle('bottom-right', { 
            cursor: 'se-resize',
            color: '#2196f3'
        }));
        // Action handles
        this.addHandle('move', new Handle('center', { 
            icon: '✥',
            size: 15,
            color: '#4caf50'
        }));
        // this.addHandle('clone', new Handle('top', { 
        //     icon: '🐑',
        //     size: 15,
        //     color: '#afafe0'
        // }));
      
    }

    addHandle(id, handle) {
        this.handles.set(id, handle);
    }
/// This is the place that needs to be changed.
    getBounds() {
        return {
            x: this.itemObject.x,
            y: this.itemObject.y,
            width: this.itemObject.width,
            height: this.itemObject.height
        };
    }

    draw(ctx) {
        const bounds = this.getBounds();

        // Draw selection rectangle
        ctx.save();
        ctx.strokeStyle = '#1a73e8';
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
        ctx.restore();

        // Draw all handles
        this.handles.forEach(handle => handle.draw(ctx, bounds));
    }

    handleMouseDown(x, y) {
        const bounds = this.getBounds();
        this.startPos = { x, y };
        this.startBounds = { ...bounds };

        for (const [id, handle] of this.handles) {
            if (handle.isHit(x, y, bounds)) {
                this.activeHandle = id;
                return true;
            }
        }
        return false;
    }

    handleMouseMove(x, y) {
        if (!this.activeHandle) {
            const bounds = this.getBounds();
            this.handles.forEach(handle => {
                handle.isHovered = handle.isHit(x, y, bounds);
            });
            return false;
        }

        const dx = x - this.startPos.x;
        const dy = y - this.startPos.y;

        switch (this.activeHandle) {
            case 'move':
                this.itemObject.x = this.startBounds.x + dx;
                this.itemObject.y = this.startBounds.y + dy;
                console.log("move");
                break;

            case 'heightHandle':
                this.itemObject.height =  this.startBounds.height + dy;
                console.log("heightHandle");
                break;


            case 'widthHandle':
                this.itemObject.width =  Math.max(10, this.startBounds.width + dx);
                console.log("resize-ne");
                break;

     

            // case 'clone':
            //     console.log("rotate");
            //     break;

            // case 'delete':
            //     debugger;
            //     // Handle deletion through a callback
            //     if (this.onDelete) {
            //         this.onDelete();
            //     }
            //     console.log("delete");
            //     break;
        }

        return true;
    }

    handleMouseUp() {
        this.activeHandle = null;
    }

    setDeleteCallback(callback) {
        this.onDelete = callback;
    }
}
ComponentObject.js
//@ts-nocheck

export default class ComponentObject {
   constructor(itemData) {
       this.itemData = itemData;
   }
   isVisible(currentTime) {
       if (!this.itemData.itemExtra.showAt) {
           return true;
       } else {
           return currentTime >= this.itemData.itemExtra.showAt;
       }
   }

   // eslint-disable-next-line no-unused-vars
   draw(ctx , currentTime=0){
      console.log("ComponentObject draw");
   }

   get x() {
       return this.itemData.itemExtra.x.initialValue;
   }
   set x(newX) {
       this.itemData.itemExtra.x.initialValue=newX;
   }
   get y() {
       return this.itemData.itemExtra.y.initialValue;
   }
   set y(newY) {
       this.itemData.itemExtra.y.initialValue=newY;
   }

  get width() {
    return this.itemData.itemExtra.width.initialValue;
}
set width(newWidth) {
    this.itemData.itemExtra.width.initialValue = newWidth;
}

get height() {
    return this.itemData.itemExtra.height.initialValue;
}
set height(newHeight) {
    this.itemData.itemExtra.height.initialValue = newHeight;
}
//getX and getY are depricated
   getY() {
       return this.itemData.itemExtra.y.initialValue;
   }
   getX() {
    return this.itemData.itemExtra.x.initialValue;
}

   isHit(mouseX, mouseY) {
    return (
        mouseX >= this.x &&
        mouseX <= this.x + this.width &&
        mouseY >= this.y &&
        mouseY <= this.y + this.height
    );
}
//////////////////////////////////////////////////////////////////////useful ?
 
   get command() {
     return this.itemData.itemExtra.command;
   }
   set command(value) {
     this.itemData.itemExtra.command = value;
   }
 
   // Getter and setter for 'name' property
   get name() {
     return this.itemData.itemExtra.name;
   }
   set name(value) {
     this.itemData.itemExtra.name = value;
   }
 
   // Getter and setter for 'color' property
   get color() {
     return this.itemData.itemExtra.color;
   }
   set color(value) {
     this.itemData.itemExtra.color = value;
   }
 
   // Getter and setter for 'showAt' property
   get showAt() {
     return this.itemData.itemExtra.showAt;
   }
   set showAt(value) {
     this.itemData.itemExtra.showAt = value;
   }
 
   // Getter and setter for 'globalAlpha' property
   get globalAlpha() {
     return this.itemData.itemExtra.globalAlpha;
   }
   set globalAlpha(value) {
     this.itemData.itemExtra.globalAlpha = value;
   }
 
   // Getter and setter for 'gap' property
   get gap() {
     return this.itemData.itemExtra.gap;
   }
   set gap(value) {
     this.itemData.itemExtra.gap = value;
   }
 
   // Getter and setter for 'dash' property
   get dash() {
     return this.itemData.itemExtra.dash;
   }
   set dash(value) {
     this.itemData.itemExtra.dash = value;
   }
 
   // Getter and setter for 'shadowOffsetX' property
   get shadowOffsetX() {
     return this.itemData.itemExtra.shadowOffsetX;
   }
   set shadowOffsetX(value) {
     this.itemData.itemExtra.shadowOffsetX = value;
   }
 
   // Getter and setter for 'shadowOffsetY' property
   get shadowOffsetY() {
     return this.itemData.itemExtra.shadowOffsetY;
   }
   set shadowOffsetY(value) {
     this.itemData.itemExtra.shadowOffsetY = value;
   }
 
   // Getter and setter for 'shadowColor' property
   get shadowColor() {
     return this.itemData.itemExtra.shadowColor;
   }
   set shadowColor(value) {
     this.itemData.itemExtra.shadowColor = value;
   }
 
   // Getter and setter for 'shadowBlur' property
   get shadowBlur() {
     return this.itemData.itemExtra.shadowBlur;
   }
   set shadowBlur(value) {
     this.itemData.itemExtra.shadowBlur = value;
   }   
//////////////////////////////////////////////////////////////////////   
}
Handle.js
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

Please ask questions and do not print code unless i tell you. tell me where can this problem exists and let me go and check .. lets discuss first and then code. you have all the code so use you AI to understand first and find out the solution