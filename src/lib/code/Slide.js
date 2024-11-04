import uuid from "./uuid.js";


export default class SlideObject{

    constructor(type,items,assets,args={}){

        this.items = items || [];
        this.type = type;
      
        this.name = args.name || ""; // this is slide name
      
        this.startTime = args.startTime || 0;
        this.endTime = args.endTime || 10;
        this.slideExtra = args.slideExtra || [];
        this.extra = args.extra || {};
        // here spriteImgArray converts into Images    
        this.assets = assets;

    }
    addItem(slide, item) {
        if (!item.uuid) item.uuid = uuid();
        slide.items.push(item);
    }

    removeItem(slide, uuid) {
        slide.items = slide.items.filter(item => item.uuid !== uuid);
    }

    updateItem(slide, uuid, updates) {
        const index = slide.items.findIndex(item => item.uuid === uuid);
        if (index !== -1) {
            slide.items[index] = { ...slide.items[index], ...updates };
        }
    }

    getItemByUuid(slide, uuid) {
        return slide.items.find(item => item.uuid === uuid);
    }

    updateItemTiming(slide, uuid, showAt, hideAt) {
        const item = slide.items.find(item => item.uuid === uuid);
        if (item) {
            item.showAt = showAt;
            item.hideAt = hideAt;
        }
    }

    updateItemExtra(slide, uuid, extraKey, extraValue) {
        const item = slide.items.find(item => item.uuid === uuid);
        if (item) {
            item.extra = { ...item.extra, [extraKey]: extraValue };
        }
    }

    updateItemArray(slide, uuid, newArray) {
        const item = slide.items.find(item => item.uuid === uuid);
        if (item) {
            item.arr = [...newArray];
        }
    }
//Time
    setStartTime(slide, time) {
        if (typeof time === 'number' && time >= 0) {
            slide.startTime = time;
        }
    }

    setEndTime(slide, time) {
        if (typeof time === 'number' && time > slide.startTime) {
            slide.endTime = time;
        }
    }

    getDuration(slide) {
        return slide.endTime - slide.startTime;
    }

    isTimeInRange(slide, time) {
        return time >= slide.startTime && time <= slide.endTime;
    }

// SlideExtra Management Methods
    addSlideExtra(slide, key, value) {
        slide.slideExtra.push({ key, value });
    }

    removeSlideExtra(slide, key) {
        slide.slideExtra = slide.slideExtra.filter(extra => extra.key !== key);
    }

    getSlideExtra(slide, key) {
        return slide.slideExtra.find(extra => extra.key === key);
    }

    updateSlideExtra(slide, key, newValue) {
        const extra = slide.slideExtra.find(extra => extra.key === key);
        if (extra) {
            extra.value = newValue;
        }
    }


//  (Image) Management Methods
    addImage(slide, name, image) {
        slide.extra[name] = { name, image };
    }

    removeImage(slide, name) {
        delete slide.extra[name];
    }

    getImage(slide, name) {
        return slide.extra[name]?.image;
    }

    updateImage(slide, name, newImage) {
        if (slide.extra[name]) {
            slide.extra[name].image = newImage;
        }
    }
// Image Arrays Management Methods
    // Sprite Images
    addSpriteImage(slide, image) {
        slide.spriteImages.push(image);
    }

    removeSpriteImage(slide, index) {
        slide.spriteImages.splice(index, 1);
    }

    // Background Images
    addBgImage(slide, image) {
        slide.bgImages.push(image);
    }

    removeBgImage(slide, index) {
        slide.bgImages.splice(index, 1);
    }

    // Get methods
    getSpriteImage(slide, index) {
        return slide.spriteImages[index];
    }

    getBgImage(slide, index) {
        return slide.bgImages[index];
    }

    getGeneralImage(slide, index) {
        return slide.images[index];
    }
}