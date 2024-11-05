import { toast } from "@zerodevx/svelte-toast";
import getNewItem from './getNewItem.js';

export function addNewItem(items, newItemExtraFn) {
  const newItemExtra = newItemExtraFn();
  const newItem = getNewItem();
  newItem.extra = newItemExtra;    
  items.unshift(newItem);      
  return [...items];
}

export function moveUp(items, index) {
  if (index > 0) {
    const item = items.splice(index, 1)[0];
    items.splice(index - 1, 0, item);
    return [...items];
  }
  return items;
}

export function moveDown(items, index) {
  if (index >= 0 && index < items.length - 1) {
    const item = items.splice(index, 1)[0];
    items.splice(index + 1, 0, item);
    return [...items];
  }
  return items;
}

export function copyItem(items, index) {
  if (index >= 0) {
    localStorage.setItem("copiedItem", JSON.stringify(items[index]));
    toast.push("item copied");
  }
}

export function pasteItem(items) {
  const copiedItem = localStorage.getItem("copiedItem");
  if (copiedItem) {
    const item = JSON.parse(copiedItem);
    item._id = null;
    return [...items, item];
  } else {
    toast.push("no copied item found");
    return items;
  }
}

export function cloneItem(items, index) {
  if (index >= 0) {
    const clonedItem = JSON.parse(JSON.stringify(items[index]));
    delete clonedItem._id;
    items.unshift(clonedItem);
    return [...items];
  }
  return items;
}

export function deleteItem(items, index) {
  if (index >= 0) {
    items.splice(index, 1);
    return [...items];
  }
  return items;
}