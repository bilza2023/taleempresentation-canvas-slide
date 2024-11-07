I have a CanvasPlayer.svelte component which in simple words draw (a data json) an array of items "items" on html5 canvas. it also provide mouse-events to parent

--> i want to keep CanvasPlayer.svelte as simple as possible with just 1 purpose and that is to draw items on canvas and thats all. if it gets correct data it draws it and that all .

    
    But i need to use the CanvasPlayer.svelte component in other components. so i want to write a wrapper around CanvasPlayer.svelte.

    For example i want to create a CanvasEditorPlayer.svelte which
        - allow user to select one item at a time
        - draw handles around selected item (for rotate,scale etc)
        - find which item is Hit 
        - edit item vlaues
        - etc etc etc

i am uploading  CanvasPlayer.svelte and CanvasEditorPlayer.svelte

Requirement :
    I want a simple plugin system using which i can write plugins for CanvasEditorPlayer.svelte (a wrapper over CanvasPlayer.svelte) and those plugins can change the display of CanasPlayer.svelte.

    Here are some rough ideas:
        1: preDraw and postDraw:  i can draw onto canvas using preDraw and postDraw functions my plugins can use these
        function postDraw(ctx) {
        ctx.fillStyle = 'red';
        ctx.font = '60px Arial';
        ctx.textBaseline = 'top';
        ctx.globalAlpha = 1;

        // Draw the text
        ctx.fillText("This is a Warning..!", 100, 100);
        }
        function preDraw() {
        // console.log("postDraw");
        }

        2: ComponentObject: i am using itemObjects in CanvasPlayer.svelte my plugins can also use them independently
        let me also upload ComponentObject.js

        3: items: the main thing drawn by CanvasPlayer.svelte are items the plugins can edit items and the CanvasPlayer.svelte will just draw them.

        4: plugin can use the mouse events in CanvasPlayer.svelte
            export let eventMouseMove = () => {};
            export let eventMouseDown = () => {};
            export let eventMouseUp = () => {};  

Before answering please ask questions and let understand the issue first -- code in not important concept is.