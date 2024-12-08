
# Canvas Slide / App

This canvas slide can be its own app. 
After working for more than 2 years on canvas app I have reached a conclusion that a canvas app consists of following elements:
    
    1: An agreed upon format: slideExtra, itemExtra, assets (the json). This json is other than the itemExtras mentioned in point no 2.

    2: a set of itemExtras (i object containing all the fields required for each item) and draw functions related to those itemExtra fields.

### What can break the canvas app 

    1: Unknow Item Type.
    2: Missing fields in item itemExtra
<small>The missing slide-type is not applicable at canvas level.</small>     
<small>The library must export a list of all the supported canvas items. For now it is manual but later will auto-update.</small>     

### Canvas Checker:

    1. Must check for unknown item types.
    2. Must check for missing fields in itemExtra.
