# React Native Leader Line

[![npm version](https://badge.fury.io/js/react-native-leader-line.svg)](https://badge.fury.io/js/react-native-leader-line)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.64+-blue.svg)](https://reactnative.dev/)
[![LLM Optimized](https://img.shields.io/badge/LLM-Optimized-brightgreen.svg)](https://github.com/puppetmaster886/react-native-leader-line)
[![Expo Snacks](https://img.shields.io/badge/Expo-Snacks%20Available-000020.svg)](https://snack.expo.dev)
[![Live Demo](https://img.shields.io/badge/Live-Demo-ff69b4.svg)](https://puppetmaster886.github.io/react-native-leader-line)
[![Test Coverage](https://img.shields.io/badge/Coverage-80%25+-green.svg)](https://github.com/puppetmaster886/react-native-leader-line)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A React Native port of the popular [leader-line](https://github.com/anseki/leader-line) library for drawing arrow lines and connectors between UI components. This library brings the powerful line-drawing capabilities of leader-line to React Native applications, with additional fixes and enhancements from community forks.

## 🎮 Live Demo

**Try it live:** [https://puppetmaster886.github.io/react-native-leader-line](https://puppetmaster886.github.io/react-native-leader-line)

Experience all features interactively:
- ✅ **Intelligent Auto Socket Selection** (NEW in v1.4.2)
- ✅ All socket positions (auto, center, top, right, bottom, left, corners)
- ✅ Different path types (straight, arc, fluid, magnet, grid)
- ✅ Various plug types (arrows, discs, squares, diamonds)
- ✅ Labels, animations, and styling options
- ✅ Performance optimization demos

*Click and explore - no installation required!*

---

## 🎉 What's New in v1.4.2

### 🧠 Intelligent Auto Socket Selection

The `socket="auto"` option now intelligently selects the **closest connection point** from 9 available positions (center, 4 sides, 4 corners) instead of always using the center. This creates more natural-looking connections automatically!

```tsx
<LeaderLine
  start={{ element: sourceRef }}
  end={{ element: targetRef }}
  startSocket="auto"  // 🎯 Automatically chooses optimal socket
  endSocket="auto"    // 🎯 Smart connection points
  color="#3498db"
/>
```

**Perfect for:** Dynamic layouts, flow diagrams, org charts, mind maps, and any UI where elements move or resize.

See the full changelog and interactive demo in the "Socket Positions Demo" screen!

---

## 🤖 LLM-Optimized Library

This library is specifically optimized for **Large Language Model (LLM) consumption** with:

- 📚 **Comprehensive JSDoc** - Every interface, type, and function is extensively documented
- 🔍 **JSON Schemas** - Structured validation schemas for all component props
- 💡 **Embedded Examples** - Complete working examples in documentation
- 🎯 **Pattern Library** - Pre-defined patterns for common use cases
- 🛡️ **Type Safety** - Strict TypeScript types with detailed descriptions
- 🤝 **AI-Friendly** - Designed to be easily understood and used by AI coding assistants

### For AI Tools & LLMs

```javascript
// The library includes specialized files for LLM consumption:
// - docs/llm-guide.js - Comprehensive examples and patterns
// - .llmconfig.js - Configuration and metadata for AI tools
// - Extensive JSDoc with @example tags throughout
// - JSON Schema validation for all props
```

## ✨ Features

- 🎯 **Multiple API Styles**: Functional components, Hook-based API, Imperative API (leader-line compatible)
- 🧠 **Intelligent Auto Socket** (v1.4.2+): Automatically selects optimal connection points from 9 positions
- 🔄 **Dynamic Updates**: Change line properties in real-time
- 🎨 **Rich Styling**: Colors, gradients, outlines, shadows, dash patterns
- 📐 **Path Types**: Straight lines, arcs, and custom curvature
- 🔌 **Socket System**: Flexible connection points with gravity (9 positions: center, 4 sides, 4 corners)
- 🏷️ **Multiple Labels**: Start, middle, end, caption, and path labels
- ⚡ **Animations**: Show/hide effects with smooth transitions
- 🎪 **Plug Types**: Arrows, discs, squares, and custom markers
- 📱 **Mobile Optimized**: Performance tuned for React Native with React.memo
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- 🔀 **Migration Ready**: Backward compatible with original leader-line API
- ⚡ **Performance**: Optimized components with memoization and smart re-rendering

## 📦 Installation

> ⚠️ **Note**: This library does **NOT** require Expo. It works with any React Native project (bare workflow, Expo managed workflow, etc.).

### Requirements

- React Native 0.64 or higher
- react-native-svg 12.0.0 or higher

```bash
npm install react-native-leader-line react-native-svg
# or
yarn add react-native-leader-line react-native-svg
```

### iOS Setup

```bash
cd ios && pod install
```

## 🚀 Quick Start

### Functional Component API (Recommended)

```tsx
import React, { useRef } from 'react';
import { View } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

const MyComponent = () => {
  const startRef = useRef(null);
  const endRef = useRef(null);

  return (
    <View>
      <View ref={startRef} style={{...}} />
      <View ref={endRef} style={{...}} />

      <LeaderLine
        start={{ element: startRef }}
        end={{ element: endRef }}
        color="#3498db"
        strokeWidth={3}
        endPlug="arrow1"
        startLabel="Start"
        endLabel="End"
      />
    </View>
  );
};
```

### Imperative API (leader-line compatibility)

```tsx
import { useLeaderLineCompatibility } from 'react-native-leader-line';

const MyComponent = () => {
  const { LeaderLine, LeaderLineContainer } = useLeaderLineCompatibility();
  const startRef = useRef(null);
  const endRef = useRef(null);

  const createLine = () => {
    // Same API as original leader-line!
    const line = new LeaderLine(startRef, endRef, {
      color: 'coral',
      size: 4,  // legacy property supported
      endPlug: 'arrow1'
    });

    // Imperative methods work the same
    line.setOptions({ color: 'blue' });
    line.hide();
    setTimeout(() => line.show(), 1000);
  };

  return (
    <View>
      <View ref={startRef} style={{...}} />
      <View ref={endRef} style={{...}} />
      <LeaderLineContainer />
      <Button onPress={createLine} title="Create Line" />
    </View>
  );
};
```

## 🎨 Advanced Styling

```tsx
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#e74c3c"
  strokeWidth={4}
  path="arc"
  curvature={0.3}
  endPlug="arrow2"
  outline={{
    enabled: true,
    color: "white",
    size: 2,
  }}
  dropShadow={{
    dx: 2,
    dy: 2,
    blur: 4,
    color: "rgba(0,0,0,0.3)",
  }}
  dash={{
    pattern: "8,4",
    animation: true,
  }}
  startLabel="Begin"
  middleLabel={{
    text: "Processing",
    backgroundColor: "#f39c",
    color: "white",
    borderRadius: 8,
    padding: 6,
  }}
  endLabel="Complete"
/>
```

## 📚 Examples & Live Demos

### 🎮 Interactive Expo Snacks

Try react-native-leader-line directly in your browser with these interactive examples:

| Demo                                                                                                       | Description                         | Features                                      |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------- |
| [🎯 **Basic Demo**](https://snack.expo.dev/@your-username/react-native-leader-line-basic-demo)             | Simple usage and core functionality | Basic connections, colors, socket positioning |
| [🚀 **Advanced Features**](https://snack.expo.dev/@your-username/react-native-leader-line-advanced-demo)   | Complex styling and effects         | Path types, outlines, shadows, labels         |
| [⚡ **Imperative API**](https://snack.expo.dev/@your-username/react-native-leader-line-imperative-demo)    | Programmatic control                | Dynamic creation, batch operations            |
| [🎮 **Interactive Playground**](https://snack.expo.dev/@your-username/react-native-leader-line-playground) | Real-time property editor           | Live adjustments, code generation             |
| [🏭 **Real-world Examples**](https://snack.expo.dev/@your-username/react-native-leader-line-real-world)    | Production use cases                | Workflows, networks, dashboards               |

### 📱 Local Examples

For complete integration examples, check out the [`examples/`](./examples) directory:

#### Basic Example

Simple usage demonstrating core functionality:

```bash
cd examples/basic && npm install && npm run android
```

#### Advanced Example

Comprehensive demos with all features:

```bash
cd examples/advanced && npm install && npm run android
```

Both examples use the published npm package, showing exactly how to integrate the library in your projects.

## 🤖 AI Assistant Integration

This library is designed to work seamlessly with AI coding assistants. The comprehensive documentation and type definitions enable AI tools to:

- Generate accurate code examples
- Suggest proper prop combinations
- Validate configurations automatically
- Provide context-aware completions

### For ChatGPT, Copilot, and other AI tools:

```tsx
// The library provides extensive type information and examples
// that AI tools can understand and use effectively

import {
  LeaderLineProps,
  SocketPosition,
  PathType,
} from "react-native-leader-line";

// All types are thoroughly documented with JSDoc
const props: LeaderLineProps = {
  start: { element: startRef },
  end: { element: endRef },
  // AI tools will suggest valid values with descriptions
  endPlug: "arrow1", // Standard arrow (recommended)
  path: "arc", // Simple curved arc
  color: "#3498db", // Line color (CSS color string)
};
```

## 🔧 API Reference

### LeaderLine Props

| Prop                         | Type             | Default      | Description                                                       |
| ---------------------------- | ---------------- | ------------ | ----------------------------------------------------------------- |
| `start`                      | `Attachment`     | **required** | Starting attachment point                                         |
| `end`                        | `Attachment`     | **required** | Ending attachment point                                           |
| `color`                      | `string`         | `"#ff6b6b"`  | Line color (CSS color string)                                     |
| `strokeWidth`                | `number`         | `2`          | Line thickness in pixels                                          |
| `path`                       | `PathType`       | `"straight"` | Line path type: `"straight"`, `"arc"`, `"fluid"`. See `PathType`. |
| `endPlug`                    | `PlugType`       | `"arrow1"`   | End marker style. See `PlugType` definition.                      |
| `startSocket`                | `SocketPosition` | `"center"`   | Connection point on start element                                 |
| `endSocket`                  | `SocketPosition` | `"center"`   | Connection point on end element                                   |
| `debugSvgBackground`         | `boolean`        | `false`      | Show green background on SVG element for debugging                |
| `debugContainerBackground`   | `boolean`        | `false`      | Show magenta background on container for debugging                |
| `debugEarlyReturnBackground` | `boolean`        | `false`      | Show blue background when component early returns                 |

### Socket Positions

Socket positions determine where lines connect to elements. You can specify different sockets for start and end points.

```tsx
type SocketPosition =
  | "auto" // 🎯 Intelligently selects closest socket (NEW in v1.4.2)
  | "center" // Center of element
  | "top" // Top center
  | "right" // Right center
  | "bottom" // Bottom center
  | "left" // Left center
  | "top_left" // Top-left corner
  | "top_right" // Top-right corner
  | "bottom_left" // Bottom-left corner
  | "bottom_right"; // Bottom-right corner
```

#### 🎯 Intelligent Auto Socket (v1.4.2+)

The `"auto"` socket now intelligently selects the **closest connection point** from all 9 available positions based on the target element's location. This creates the most natural-looking connections automatically.

**How it works:**
1. Calculates the center position of the target element
2. Measures distance from each of the 9 socket positions to the target center
3. Selects the socket with the shortest distance
4. Creates optimal connection paths automatically

**Example:**
```tsx
// Auto socket intelligently chooses the best connection points
<LeaderLine
  start={{ element: sourceRef }}
  end={{ element: targetRef }}
  startSocket="auto"  // Will use closest socket on source (e.g., "right" if target is to the right)
  endSocket="auto"    // Will use closest socket on target (e.g., "left" if source is to the left)
  color="#3498db"
  strokeWidth={2}
/>

// Mix auto with fixed sockets
<LeaderLine
  start={{ element: sourceRef }}
  end={{ element: targetRef }}
  startSocket="auto"     // Automatically choose best socket on source
  endSocket="top"        // Always connect to top of target
  color="#e74c3c"
/>
```

**Use cases:**
- **Dynamic layouts**: Elements that move or resize
- **Flow diagrams**: Automatically optimal connections
- **Org charts**: Natural hierarchical connections
- **Mind maps**: Adaptive branch connections

**Visual demo:** Check the "Socket Positions Demo" in the expo-example app to see auto socket selection in action with 8 live examples!

### Plug Types

```typescript
type PlugType =
  | "none"
  | "arrow1"
  | "arrow2"
  | "arrow3"
  | "disc"
  | "square"
  | "behind";
```

### Path Types

```typescript
type PathType = "straight" | "arc" | "fluid";
```

## 🔄 Migrating from leader-line

Coming from the original [leader-line](https://github.com/anseki/leader-line) library? We've got you covered!

### Quick Migration

**Before (leader-line):**

```javascript
const line = new LeaderLine(
  document.getElementById("start"),
  document.getElementById("end"),
  { color: "coral", size: 4 }
);
```

**After (react-native-leader-line):**

```tsx
// Option 1: Declarative (Recommended)
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="coral"
  strokeWidth={4}
/>;

// Option 2: Imperative (Same API!)
const { LeaderLine } = useLeaderLineCompatibility();
const line = new LeaderLine(startRef, endRef, {
  color: "coral",
  size: 4, // legacy property still works!
});
```

### Compatibility Features

- ✅ **Same API**: `new LeaderLine(start, end, options)`
- ✅ **Same methods**: `show()`, `hide()`, `setOptions()`, `remove()`
- ✅ **Same properties**: `color`, `size`, `path`, `endPlug`, etc.
- ✅ **Legacy support**: `size` property works alongside `strokeWidth`

👉 **[Full Migration Guide](./MIGRATION_GUIDE.md)** - Complete step-by-step migration instructions

## 🎯 Common Patterns

### Basic Arrow

```tsx
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#3498db"
  strokeWidth={2}
  endPlug="arrow1"
/>
```

### Styled Connection

```tsx
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#e74c3c"
  strokeWidth={4}
  path="arc"
  curvature={0.3}
  endPlug="arrow2"
  outline={{ enabled: true, color: "white", size: 2 }}
/>
```

### Animated Flow

```tsx
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#2ecc71"
  strokeWidth={3}
  dash={{ pattern: "8,4", animation: true }}
  endPlug="arrow1"
/>
```

## 🧠 For LLM Development

If you're an AI or working with LLMs to generate code using this library, check out:

- [`docs/llm-guide.js`](./docs/llm-guide.js) - Comprehensive examples and patterns
- [`.llmconfig.js`](./.llmconfig.js) - Library metadata and configuration
- Type definitions in [`src/types/index.ts`](./src/types/index.ts) - Complete TypeScript interfaces

## 📝 Hook-based API (Manager Pattern)

For users who need to manage multiple lines programmatically:

```tsx
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useLeaderLineManager, LeaderLine } from "react-native-leader-line";

const MyComponent = () => {
  const manager = useLeaderLineManager();
  const startRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    // Create lines using the manager
    const lineId = manager.createLine('my-line', {
      start: { element: startRef },
      end: { element: endRef },
      color: "red",
      strokeWidth: 3,
      endPlug: "arrow2",
    });

    // Dynamic updates
    setTimeout(() => {
      manager.updateLine(lineId, { color: "blue", strokeWidth: 5 });
    }, 1000);

    // Show/hide with opacity changes
    setTimeout(() => {
      manager.hideLine(lineId); // Sets opacity to 0
      setTimeout(() => manager.showLine(lineId), 500); // Sets opacity to 1
    }, 2000);

    return () => manager.removeLine(lineId);
  }, []);

  return (
    <View>
      <View ref={startRef} style={{...}} />
      <View ref={endRef} style={{...}} />

      {/* Render managed lines using functional components */}
      {manager.lines.map((lineData) => (
        <LeaderLine
          key={lineData.id}
          {...lineData.props}
        />
      ))}
    </View>
  );
};
```

### useLeaderLineManager API

The hook returns an object with the following methods and properties:

#### Methods

| Method       | Parameters                                       | Description                     |
| ------------ | ------------------------------------------------ | ------------------------------- |
| `createLine` | `(id: string, props?: Partial<LeaderLineProps>)` | Create a new line with given ID |
| `addLine`    | `(id: string, props?: Partial<LeaderLineProps>)` | Alias for `createLine`          |
| `updateLine` | `(id: string, props: Partial<LeaderLineProps>)`  | Update line properties          |
| `removeLine` | `(id: string)`                                   | Remove a line by ID             |
| `showLine`   | `(id: string)`                                   | Show a line (sets opacity to 1) |
| `hideLine`   | `(id: string)`                                   | Hide a line (sets opacity to 0) |
| `refreshAll` | `()`                                             | Force refresh all lines         |
| `clear`      | `()`                                             | Remove all lines                |
| `clearAll`   | `()`                                             | Alias for `clear`               |
| `getLine`    | `(id: string)`                                   | Get line data by ID             |
| `hasLine`    | `(id: string)`                                   | Check if line exists            |

#### Properties

| Property        | Type              | Description                  |
| --------------- | ----------------- | ---------------------------- |
| `lines`         | `Array<LineData>` | Array of all managed lines   |
| `isInitialized` | `boolean`         | Whether the manager is ready |

#### LineData Structure

```tsx
interface LineData {
  id: string;
  props: Partial<LeaderLineProps>;
  isVisible: boolean;
  lastUpdate: number;
}
```

## 🐛 Debug Features

The library includes built-in debugging capabilities to help with development and troubleshooting:

### Debug Props

Use these boolean props to visualize different aspects of the LeaderLine component:

```tsx
<LeaderLine
  start={startRef}
  end={endRef}
  debugSvgBackground={true} // Green background on SVG
  debugContainerBackground={true} // Magenta background on container
  debugEarlyReturnBackground={true} // Blue background on early return
/>
```

### Debug Use Cases

- **SVG Background**: Helps identify the actual SVG rendering area
- **Container Background**: Shows the component's container boundaries
- **Early Return Background**: Indicates when the component returns early (refs not ready)

These debug features are particularly useful when:

- Troubleshooting layout issues
- Understanding component boundaries
- Debugging reference timing problems
- Developing custom layouts

See the [expo-example app](../../apps/expo-example/README.md#-debug-system) for a complete debug system implementation.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and ensure your code follows the TypeScript and documentation standards.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original [leader-line](https://github.com/anseki/leader-line) library by anseki
- React Native SVG team for the excellent SVG support
- Community contributors and feedback

---

**Made with ❤️ for the React Native community and optimized for AI development tools**
