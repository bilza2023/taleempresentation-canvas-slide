I have a CanvasEditor.svelte which is responsible for Editing slides (items)

It has "items" which are slides data from database.CanvasEditor.svelte is continuously converting items into itemObjects which convert items data into js objects so that they have methods and can be used.

Now I have added a CanvasFrame.svelte and moved some of the code there

What i want is that

    - The CanvasEditor should just deal with items where as
    - CanvasFrame should deal with itemObjects since using both of these entities are confusing in the same component.

I will upload  CanvasEditor.svelte and CanvasEditor.svelte check both of them such that items and its related functionality is in CanvasEditor.svelte and itemObjects and its related activity is in  CanvasFrame.svelte.

i would recommend to keep function like moveUp, moveDown,copyItem,pasteItem,clone,del -- be kept in CanvasEditor and they should be dealing with "items" and not itemObjects (as they are doing currently). This will allow us to manipulate the items simply and then convert into itemObjects.

all functionlaity related to itemObjects be in CanvasFrame..
befor writing the code ask questions. thanks