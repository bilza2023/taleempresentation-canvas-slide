 [Important Technical Concepts](important-technical-concepts.md) , [Canvas Items Fields](canvas-items-fields.md) , [How Canvas Works](how-canvas-works.md)

# Canvas Slide / App


This canvas slide / app. It is a slide because it is a slide module for `taleempresentation` project and its is an app since this module can very easily be exported as a separate app.


After working for more than 2 years on canvas app I have reached one major conclusion that is under all the layer of an app is a `data layer`. This should be a static class which exports the basic structures (think of it as structs in Rust) of the app. It also exports basic static methods which form core of the app. The important part here is that:

    1: At `data layer` there should be no state or code. Simple structs (in js we export objects and arrays) along with static methods.
    2: The `data layer` should not import anything from outside. If it does then it is not the lowest level of an app. 
    3: The `data layer` should be the `main source of truth` and should validate everything above. For example in canvas app we have  methods like `getAllItemsExtras()` , `ItemMap.getAll()`. 


Incase of canvas module it is:
    1: An agreed upon format: slideExtra, itemExtra, assets (the json). This json is other than the itemExtras mentioned in point no 2.

    2: a set of itemExtras (i object containing all the fields required for each item) and draw functions related to those itemExtra fields.

    3: ItemMap object exported from Slide object which export all the canvas items in form of a map and their keys are item.itemExtra.type.

## Usage CanvasPlayer 

```javascript

<CanvasPlayer 
  items ={slide.items}        
  slideExtra={slide.slideExtra} 
  {assets}
/>
```

## Usage CanvasEditor

```javascript

<div class="w-full bg-gray-700 text-white py-2 px-1 min-h-screen ">
  {#if slide && assets}
    <CanvasEditor
     bind:items = {slide.items}
     bind:slideExtra = {slide.slideExtra}
     {assets}
     {showAddToolbar}
    />
  {/if}
</div>
```

### What can break the canvas app 

    1: Unknow Item Type.
    2: Missing fields in item itemExtra
<small>The missing slide-type is not applicable at canvas level.</small>     
<small>The library must export a list of all the supported canvas items. For now it is manual but later will auto-update.</small>     

### Canvas Checker:

    1. Must check for unknown item types.
    2. Must check for missing fields in itemExtra.
