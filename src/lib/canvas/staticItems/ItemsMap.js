
import TextObject from "./items/TextObject";
import ImageObject from "./items/image";
// ... other imports

const ItemsMap = new Map();
ItemsMap.set('text', TextObject);
ItemsMap.set('image', ImageObject);
// ... other mappings

export default ItemsMap;