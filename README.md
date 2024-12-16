# TaleemPresentation Library

TaleemPresentation is a lightweight Svelte-based library designed to create and run simple JavaScript/JSON-based presentations. With its modular design, the library allows users to build and display slides easily using `Editor` and `Player` components. Currently, it supports two types of slides (`Canvas` and `Eqs`), with more types planned for future releases.

## Purpose
The primary goal of TaleemPresentation is to provide a simple, flexible solution for managing and presenting slide-based content. It empowers developers to:

- **Create Slides**: Use the `Editor` component to design slides with interactive and customizable content.
- **Display Presentations**: Use the `Player` component to render and run the slides seamlessly.

This library abstracts the complexity of slide structure, offering a user-friendly API for integration into educational apps or web projects.

---

## Installation

Install the library via npm:

```bash
npm install taleempresentation
```

---

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

