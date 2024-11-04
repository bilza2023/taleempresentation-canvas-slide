# Taleem Presentation Data Format Guide

This guide explains the data structure expected by Taleem Presentation components.

## Core Structure

Each presentation consists of an array of slides, where each slide follows this structure:

```typescript
interface Slide {
  startTime?: number;    // Start time for audio sync
  endTime?: number;      // End time for audio sync
  type?: string;         // Slide type identifier
  soundFileType?: string;// Audio file type (default: "opus")
  template?: string;     // Template identifier
  items: Item[];        // Slide content items
  slideExtra: KVPair[]; // Additional slide metadata
  extra: any;          // Custom slide data
}
```

### Item Structure

Each slide contains items that represent content elements:

```typescript
interface Item {
  name?: string;        // Item identifier
  content?: string;     // Main content
  showAt: number;       // Timing for appearance
  extra: any;          // Custom item data
  arr: any[];          // Additional array data
}
```

### Key-Value Pairs

Additional metadata can be stored in slideExtra:

```typescript
interface KVPair {
  key: string;         // Metadata key
  value: string;       // Metadata value
}
```

## Important Notes

1. The `extra` field appears in three different contexts:
   - `slide.extra`: Custom data at slide level
   - `slide.slideExtra`: Array of KVPairs for slide metadata
   - `item.extra`: Custom data at item level

2. Each context serves a different purpose:
   - Slide `extra`: General slide configuration
   - `slideExtra`: Structured metadata in key-value format
   - Item `extra`: Item-specific configuration

## Example

```javascript
const examplePresentation = [{
  startTime: 0,
  endTime: 15,
  type: "basic",
  items: [{
    name: "title",
    content: "Introduction",
    showAt: 0,
    extra: {
      fontSize: "2em"
    },
    arr: []
  }],
  slideExtra: [{
    key: "background",
    value: "dark"
  }],
  extra: {
    transition: "fade"
  }
}];
```

This structure provides flexibility for various presentation types while maintaining a consistent format for the player and editor components.