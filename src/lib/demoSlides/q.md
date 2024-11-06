


This is the data (slide data) that i use to draw this data on html5 canvas. 
I need a js class "Slide" which takes in this data and presents methods for manipulation.

Here are some details
    - here are global variables
            - "startTime": 0, // startTime should be less than endTime
            - "endTime": 3, //should always be more than startTime.
            - "type": "canvas",
            - "template": "",
    - items: 
        this is an array of objects (we have objects for items so i use it in oop manner.  will add the code for ComponentObject.js as well).
        items are the main content of a slide and each has methods like "draw" etc 
    - slideExtra
        this is data that is used at slide level available to all items

--- you can use ComponentObject.js as template for creating slide objects.


// a slide is single object slides is array of objects. this is just 1 slide.
export const slide = [{
  
    "startTime": 0,
    "endTime": 3,
    "type": "canvas",
    "template": "",
    
    "items": [
        {
          "name": "",
          "content": "",
          "showAt": 0,
          "itemExtra": {
            "text": {
              "initialValue": "Chapter 4 Ex 4.1 Q 5",
              "setCommands": []
            },
            "x": {
              "initialValue": 8,
              "setCommands": []
            },
            "y": {
              "initialValue": 5,
              "setCommands": []
            },
            "font": "60px Arial",
            "translate": true,
            "command": "text",
            "name": "Chapter ",
            "color": {
              "initialValue": "#1e58cc",
              "setCommands": []
            },
            "hideAt": 0,
            "showAt": 0,
            "visibility": 0,
            "globalAlpha": {
              "initialValue": 1,
              "setCommands": []
            },
            "gap": {
              "initialValue": 0,
              "setCommands": []
            },
            "dash": {
              "initialValue": 0,
              "setCommands": []
            },
            "shadowOffsetX": 0,
            "shadowOffsetY": 0,
            "shadowColor": "#7261f5",
            "shadowBlur": 0,
            "useShowHide": false,
            "setCommands": []
          },
        
        }
      ],

    slideExtra  : {
        "backgroundColor": "#575772",
                "canvasWidth": 1000,
                "canvasHeight": 360,
                "cellHeight": 25,
                "cellWidth": 25,
                "bgImg": "system_images/bg_images/white_mat.jpg",
                "bgGlobalAlpha": 1,
                "xFactor": 0,
                "yFactor": 0,
                "showGrid": false,
                "gridLineWidth": 1,
                "gridLineColor": "gray"
    },
}];