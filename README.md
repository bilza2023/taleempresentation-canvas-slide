
# Taleem Presentation

`Taleem Presentation` is a library for creating `simple animated slides` and presentations for students , educators etc.

<span style="color: red;">**21-Dec-2024 =>  At the moment we are at version 0.5.X which is just suitable for testing and playing but not suitable for serious projects. Also the complete code of the library is not uploaded yet. Docs and Help files are being written. Examples are being written and THE CODE IS NOT FINALLY TESTED. I am atleast 1 month away from releasing some stable version.**</span>

taleem-presentation library is hosted at https://taleem.vercel.app/:

---

<a href='https://taleem.vercel.app/'>
<img src='https://taleem.vercel.app/app-deployed-pic.png' alt='app-deployed-pic.png'>
</a>


<span style="color: red;">Thelibrary is under heavy development and the code is being changed on regualr basis.</span> 

## Taleem Presentation library in Brief:

    1. The presentation is a javascript `.js` file. It is text based and can be opened in any text editor and edited manually.

    2. The library is based on sveltkit.
    
    3. The library exports 2 main components `Editor` and `Player`. The `Editor`: is for editing presentations and the `Player` is for playing the presentations.

    4. The main concept is that we create slides (currently we have just 2 slide types). Once the slides are created we give them startTime and endTime respectively such that they run one after another in sequence. Inside each slide we have items which have its own timings etc.

    5: The 2 main file types that we have are `canvas` (for creating a drawing canvas to create slide based on shapes, images ,sprites etc)  and `Eqs` (the equations slides are ment for explaning subject matter in point form , one by one , line by line).

    6: The library can load `sound` using url from any online / hosted source. We can  also use sound files converted into `hexadecimal` and feed it to the Player.

    7: Slies Timings:
        -   Slides run one after another in sequence given to them according to their start and end time.
        - If there is some error in the timing that will be indicated by the `Editor` as `timing error`.
        - Inside `Eqs` slide type you also have items and each has item own start and end time.

    8: The Presentation is designed to run as a `video` and not as a slide show.      

    9: I intend to create a small youtube video series on this library after i have reached version # 1

    10: TaleemPresentation is a lightweight Svelte-based library designed to create and run simple JavaScript/JSON-based presentations.

    11: The Presentation is designed to run as a `video` and not as a slide show.

---

## Installation

Install the library via npm:

```bash
npm install taleempresentation
```

---

## Hosted Editor

<a href="https://taleem.vercel.app/editor">
<img src='https://taleem.vercel.app/editor.png' alt='editor.png'>
</a>


## Hosted Player

<a href="https://taleem.vercel.app/player">
<img src='https://taleem.vercel.app/player.png' alt='player.png'>
</a>


## Usage

### 1. Using the `Editor` Component
The `Editor` component allows users to create or edit slides interactively. It binds to `items` and `slideExtra` properties, enabling dynamic updates.

#### Example:
```svelte
<script>
  import { Editor } from 'taleempresentation';
  let slide = {
    items: [],
    slideExtra: {},
  };
  let assets = { /* external assets */ };
  let showAddToolbar = true;
</script>

<div class="editor-container">
  {#if slide && assets}
    <Editor
      bind:items={slide.items}
      bind:slideExtra={slide.slideExtra}
      {assets}
      {showAddToolbar}
    />
  {/if}
</div>
```

#### Props:
- `items`: Array of objects defining the slide content.
- `slideExtra`: Additional slide configuration data.
- `assets`: External assets provided by the app.
- `showAddToolbar`: (Optional) Boolean to toggle the addition toolbar (default: `true`).

---

### 2. Using the `Player` Component
The `Player` component displays slides interactively. It supports various events and lifecycle hooks for customization.

#### Example:
```svelte
<script>
  import { Player } from 'taleempresentation';
  let slide = {
    items: [],
    slideExtra: {},
  };
  let assets = { /* external assets */ };
</script>

<div class="player-container">
  <Player
    {items}
    {slideExtra}
    {assets}
    postDraw={() => console.log('Post-draw callback')}
    eventMouseDown={() => console.log('Mouse down')}
    eventMouseUp={() => console.log('Mouse up')}
  />
</div>
```

#### Props:
- `items`: Array of objects defining the slide content.
- `slideExtra`: Additional slide configuration data.
- `assets`: External assets provided by the app.
- Event Hooks (Optional):
  - `postDraw`: Function executed after drawing.
  - `eventMouseDown`: Function triggered on mouse down.
  - `eventMouseUp`: Function triggered on mouse up.
  - `eventDblClick`: Function triggered on double click.
  - `eventMouseMove`: Function triggered on mouse move.

---

## Supported Slide Types
1. **Canvas Slide**:
   - Ideal for graphical and customizable content.
   - Supports commands like `text`, `image`, `rect`, and more.

2. **Eqs Slide**:
   - Tailored for educational content, including equations and structured text.

> Note: Slide-specific features are handled internally by the library and do not require user-level configuration.

---

## Roadmap
- Add support for new slide types.
- Enhance animation and interactivity features.
- Improve documentation and examples.

---

## License
MIT © 2024 Bilal Tariq

