# React Native Leader Line

[![npm version](https://badge.fury.io/js/react-native-leader-line.svg)](https://badge.fury.io/js/react-native-leader-line)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.60+-blue.svg)](https://reactnative.dev/)
[![LLM Optimized](https://img.shields.io/badge/LLM-Optimized-brightgreen.svg)](https://github.com/puppetmaster886/react-native-leader-line)

A React Native port of the popular [leader-line](https://github.com/anseki/leader-line) library for drawing arrow lines and connectors between UI components. This library brings the powerful line-drawing capabilities of leader-line to React Native applications, with additional fixes and enhancements from community forks.

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

- 🎯 **Multiple API Styles**: Functional components, class-based API (like original), and hooks
- 🔄 **Dynamic Updates**: Change line properties in real-time
- 🎨 **Rich Styling**: Colors, gradients, outlines, shadows, dash patterns
- 📐 **Path Types**: Straight lines, arcs, and custom curvature
- 🔌 **Socket System**: Flexible connection points with gravity
- 🏷️ **Multiple Labels**: Start, middle, end, caption, and path labels
- ⚡ **Animations**: Show/hide effects with smooth transitions
- 🎪 **Plug Types**: Arrows, discs, squares, and custom markers
- 📱 **Mobile Optimized**: Performance tuned for React Native
- 🔧 **TypeScript**: Full type safety and IntelliSense support

## 📦 Installation

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
    backgroundColor: "#f39c12",
    color: "white",
    borderRadius: 8,
    padding: 6,
  }}
  endLabel="Complete"
/>
```

## 📚 Examples

Check out the complete examples in the [`examples/`](./examples) directory:

### Basic Example

Simple usage demonstrating core functionality:

```bash
cd examples/basic
npm install
npm run android  # or npm run ios
```

### Advanced Example

Comprehensive demos with all features:

```bash
cd examples/advanced
npm install
npm run android  # or npm run ios
```

Both examples use the published npm package, so you can see exactly how to integrate the library in your own projects.

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

| Prop          | Type             | Default      | Description                                            |
| ------------- | ---------------- | ------------ | ------------------------------------------------------ |
| `start`       | `Attachment`     | **required** | Starting attachment point                              |
| `end`         | `Attachment`     | **required** | Ending attachment point                                |
| `color`       | `string`         | `"#ff6b6b"`  | Line color (CSS color string)                          |
| `strokeWidth` | `number`         | `2`          | Line thickness in pixels                               |
| `path`        | `PathType`       | `"straight"` | Line path type: `"straight"`, `"arc"`, `"fluid"`       |
| `endPlug`     | `PlugType`       | `"arrow1"`   | End marker: `"none"`, `"arrow1"`, `"arrow2"`, `"disc"` |
| `startSocket` | `SocketPosition` | `"center"`   | Connection point on start element                      |
| `endSocket`   | `SocketPosition` | `"center"`   | Connection point on end element                        |

### Socket Positions

```tsx
type SocketPosition =
  | "auto" // Auto-detect best connection point
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
type PathType = "straight" | "arc";
```

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

## 📝 Class-based API (Original Compatibility)

For users migrating from the original leader-line library:

```tsx
import { useLeaderLineManager } from "react-native-leader-line";

const MyComponent = () => {
  const { createLeaderLine, renderLines } = useLeaderLineManager();

  useEffect(() => {
    const line = createLeaderLine(startRef, endRef, {
      color: "red",
      size: 3,
      endPlug: "arrow2",
    });

    // Dynamic updates (original API style)
    line.color = "blue";
    line.size = 5;
    line.show("fade");

    return () => line.remove();
  }, []);

  return (
    <View>
      <View ref={startRef} />
      <View ref={endRef} />
      {renderLines()}
    </View>
  );
};
```

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
