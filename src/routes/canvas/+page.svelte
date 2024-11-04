<svelte:head>
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">
</svelte:head>

<script>
 import CanvasPlayer from "../../lib/slides/canvas/canvasPlayer/CanvasPlayer.svelte";
  let pulse = 0;
  let currentTime = 0;
  let currentSlide = {
        "startTime": 0,
        "endTime": 3,
        "type": "canvas",
        "template": "",
        "items": [
          {
            "name": "",
            "content": "",
            "showAt": 0,
            "extra": {
              "text": {
                "initialValue": "Chapter 4 Ex 4.1 Q 5",
                "setCommands": []
              },
              "x": {
                "initialValue": 200,
                "setCommands": []
              },
              "y": {
                "initialValue": 200,
                "setCommands": []
              },
              "font": "60px Arial",
              "translate": true,
              "command": "text",
              "name": "Chapter ",
              "color": {
                "initialValue": "red",
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
              "shadowColor": "black",
              "shadowBlur": 0,
              "useShowHide": false,
              "setCommands": []
            },
            "arr": []
           
          }
        ],
        "slideExtra": [],
        "extra": {
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
        }
      };

/**
      
///////////====These Are the Props Required====

 //== Time Related Props

      {currentTime} 
      {pulse}

//== items

        items={currentSlide.items}
        
//== startTime and endTime

        startTime={currentSlide.startTime}
        endTime={currentSlide.endTime}
      
//== The Data for the slide other than items 
        // slideExtra is a key-value pair array of object.
        slideExtra={currentSlide.slideExtra}
        // extra is slide-extra NOT item.extra !!!!!! importantay
        extra={currentSlide.extra}
      
//== These are images which must be modularized - injected into the slide (other slides as well)         
      spriteImgArray=[]
      bgImages=[]
      
//== The functions that are provided to slides
      setPulse={()=>{}}
 * */      
</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class=" h-full w-full bg-gray-800 text-white p-0 m-0" >

      <CanvasPlayer 
     
      {currentTime} 
      {pulse}
      
        items={currentSlide.items}
        
        startTime={currentSlide.startTime}
        endTime={currentSlide.endTime}
      
        slideExtra={currentSlide.slideExtra}
        extra={currentSlide.extra}
      
      spriteImgArray=[]
      bgImages=[]

      setPulse={()=>{}}
  />

</div>

