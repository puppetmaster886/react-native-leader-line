# React Native Leader Line

[![npm version](https://badge.fury.io/js/react-native-leader-line.svg)](https://badge.fury.io/js/react-native-leader-line)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.60+-blue.svg)](https://reactnative.dev/)

A React Native port of the popular [leader-line](https://github.com/anseki/leader-line) library for drawing arrow lines and connectors between UI components. This library brings the powerful line-drawing capabilities of leader-line to React Native applications, with additional fixes and enhancements from community forks.

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

### Class-based API (Original Leader Line Compatible)

```tsx
import { LeaderLineClass, useLeaderLineManager } from 'react-native-leader-line';

const MyComponent = () => {
  const { createLeaderLine, renderLines } = useLeaderLineManager();
  const startRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    // Create line exactly like original leader-line
    const line = createLeaderLine(startRef, endRef, {
      color: 'red',
      size: 3,
      endPlug: 'arrow2',
      startSocket: 'right',
      endSocket: 'left'
    });

    // Dynamic updates
    setTimeout(() => {
      line.color = 'blue';  // Change color
      line.size = 5;        // Change thickness
      line.show('fade');    // Show with animation
    }, 1000);
  }, []);

  return (
    <View>
      <View ref={startRef} style={{...}} />
      <View ref={endRef} style={{...}} />
      {renderLines()}
    </View>
  );
};
```

## 📖 API Documentation

### LeaderLine Component Props

| Prop          | Type                | Default      | Description             |
| ------------- | ------------------- | ------------ | ----------------------- |
| `start`       | `Attachment`        | -            | Start element reference |
| `end`         | `Attachment`        | -            | End element reference   |
| `color`       | `string`            | `"#ff6b6b"`  | Line color              |
| `strokeWidth` | `number`            | `2`          | Line thickness          |
| `startSocket` | `SocketPosition`    | `"center"`   | Start connection point  |
| `endSocket`   | `SocketPosition`    | `"center"`   | End connection point    |
| `path`        | `PathType`          | `"straight"` | Line path type          |
| `curvature`   | `number`            | `0.2`        | Arc curvature (0-1)     |
| `endPlug`     | `PlugType`          | `"arrow1"`   | End marker type         |
| `startPlug`   | `PlugType`          | `"none"`     | Start marker type       |
| `dash`        | `DashOptions`       | `false`      | Dash pattern            |
| `outline`     | `OutlineOptions`    | `false`      | Line outline            |
| `dropShadow`  | `DropShadowOptions` | `false`      | Drop shadow             |

### Socket Positions

```typescript
type SocketPosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
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

## 🎨 Advanced Examples

### Multiple Labels

```tsx
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  startLabel="Begin"
  middleLabel={{
    text: "Processing",
    backgroundColor: "#f39c12",
    color: "white",
    borderRadius: 8,
  }}
  endLabel="Complete"
  captionLabel="Workflow"
  pathLabel="Data Flow"
/>
```

### Styled Line with Effects

```tsx
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#2196F3"
  strokeWidth={4}
  path="arc"
  curvature={0.4}
  dash={{ pattern: "5,5", animation: true }}
  dropShadow={{ dx: 2, dy: 2, blur: 4, color: "rgba(0,0,0,0.3)" }}
  outline={{ enabled: true, color: "white", size: 2 }}
  endPlug="arrow2"
  startPlug="disc"
/>
```

### Dynamic Line Updates

```tsx
const line = createLeaderLine(startRef, endRef, {
  color: "red",
  size: 3,
});

// Update multiple properties
line.setOptions({
  color: "blue",
  size: 5,
  endPlug: "arrow2",
  dash: { pattern: "8,4", animation: true },
});

// Individual property updates
line.color = "green";
line.size = 4;

// Show/hide with animations
line.show("fade");
line.hide("slide");
```

## 🔧 TypeScript

The library is fully typed with comprehensive TypeScript definitions:

```tsx
import {
  LeaderLine,
  LeaderLineClass,
  LeaderLineProps,
  SocketPosition,
  PlugType,
  PathType,
} from "react-native-leader-line";
```

## 🎭 Animation Effects

Supported animation types for show/hide:

- `"fade"` - Fade in/out
- `"draw"` - Draw/undraw the line
- `"slide"` - Slide in/out

```tsx
line.show("fade"); // Show with fade
line.hide("draw"); // Hide with draw effect
```

## 🔌 Socket Gravity

Control how connection points attach to elements:

```tsx
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  startSocketGravity="auto" // Auto positioning
  endSocketGravity={150} // Custom gravity value
/>
```

## ⚡ Performance Tips

1. **Minimize re-renders**: Use `useCallback` for dynamic updates
2. **Batch updates**: Use `setOptions()` for multiple property changes
3. **Lazy measurement**: Lines measure elements automatically when needed
4. **Memory management**: Remove lines when components unmount

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Federico Garcia](https://github.com/federicogarcia)

## 🙏 Acknowledgments

This library is a React Native port of the excellent [leader-line](https://github.com/anseki/leader-line) library by [anseki](https://github.com/anseki). We are grateful for the original work and the inspiration it provided.

### Original Library

- **leader-line** by [anseki](https://github.com/anseki) - The original JavaScript library for drawing lines
- Repository: https://github.com/anseki/leader-line
- License: MIT

### Community Contributions

This port includes fixes and enhancements from various community forks and contributions to the original leader-line library.

## 🐛 Known Issues

- React Native Web support is experimental
- Some advanced animations may not work on all platforms
- Performance may vary on older devices with complex paths

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ⚠️ React Native Web (experimental)

## 🔗 Related Libraries

- [react-native-svg](https://github.com/react-native-svg/react-native-svg) - SVG library for React Native
- [leader-line](https://github.com/anseki/leader-line) - Original web library

---

Made with ❤️ for the React Native community
