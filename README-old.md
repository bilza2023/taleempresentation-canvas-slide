# Taleem Presentation v0.3.6

A Svelte-based library for creating and running educational presentations with or without sound support.

## Installation

```bash
npm i taleempresentation
```

## Problems with the Library

  - The code is under heavy development and may see a lot of changes in near future.
  - Editor component is incomplete.
  - There is no theming support for slides created.
  - Currently there is not hosted app to display its presentation.
  - Not many example Presentations ready.
  - Documentation is not complete.
  - Example not available.
  - Wait till version 1.0 before using in serious project.
  - YOU CAN TEST THIS IF YOU LIKE FOR FUN FOR NOW
  
## Required Dependencies

- **Svelte**: Core framework dependency
- **Tailwind CSS**: Required for component styling

## Components

### 1. Player
Full-featured presentation player with audio support.
This is example code of +page.svelte (sound file uses a url in this case)

```svelte
<script>
//@ts-nocheck 
// import audioData from "./audioData.js";
import {presentationData} from "./presentationData.js";
import {Player} from "$lib";
</script> 

<div class='bg-gray-800 text-white w-full' >
  {#if presentationData}
    <div class="flex justify-center w-full   border-white border-2 text-center  rounded-lg  ">
          <Player
            isBlob = {false}
            {presentationData} 
            audioData= "/music1.opus"    
          />
    </div>
  {/if}
</div>
```

### 2. PlayerNs (No Sound)
Presentation player without audio support - perfect for silent presentations.

```svelte
<script>
  //@ts-nocheck 
  import {presentationData} from "./presentationData";
  import {PlayerNs} from "$lib";
  </script> 
  
  <div class='bg-gray-800 text-white w-full' >
    {#if presentationData}
      <div class="flex justify-center w-full   border-white border-2 text-center  rounded-lg  ">
            <PlayerNs
              {presentationData}     
            />
      </div>
    {/if}
  </div>
```

### 3. Editor
Full-featured presentation editor with live preview.

```svelte
<script>
  import { Editor } from "$lib";
  import audioData from "./audioData.js";
  import {presentationData} from "./presentationData2.js";

  let showToolbar=true;

</script>

<div class="w-full bg-gray-800">

{#if presentationData && audioData}

  <Editor
    isBlob={true}
    {showToolbar}
    slides={presentationData}
    {audioData}
   
  />

{/if}

</div>
```

## Features

- **Auto-hiding Toolbar**: Shows on mouse movement, hides after 5 seconds
- **Audio Support**: Optional audio synchronization (Player component)
- **Dark Theme**: Built-in dark theme with Tailwind CSS
- **Responsive Design**: Adapts to container size
- **Full Editor**: Complete editing capabilities with live preview
- **Slide Management**: Add, delete, and reorder slides
- **Multiple Slide Types**: Support for various presentation formats

## Data Format

The library expects presentation data in a specific format. See our [Data Format Guide](data_format_guide.md) for detailed schema information.

## Styling

Components use Tailwind CSS for styling with a dark theme by default:

```html
<div class="bg-gray-800 text-white">
  <!-- Component content -->
</div>
```

You can wrap the components in your own container to customize the styling.

---

## License

MIT © [Bilal Tariq](https://github.com/bilaltariq)

## Author

**Bilal Tariq**  
Released: October 25, 2024  
Version: 0.3.6

## Contributing

Contributions, issues and feature requests are welcome!  
Feel free to check [issues page](link-to-issues).

## Support

Having trouble? Open an issue.

---

<div align="center">
  <sub>Built with ❤️ by Bilal Tariq</sub>
</div>