# React Native Leader Line

[![npm version](https://badge.fury.io/js/react-native-leader-line.svg)](https://badge.fury.io/js/react-native-leader-line)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.60+-blue.svg)](https://reactnative.dev/)

A React Native port of the popular [leader-line](https://github.com/anseki/leader-line) library for drawing arrow lines and connectors between UI components. This library brings the powerful line-drawing capabilities of leader-line to React Native applications, with additional fixes and enhancements from community forks.

## ✨ Features

- 🎯 **Multiple Plug Types**: arrow1, arrow2, disc, square, diamond, hand, crosshair, and more
- 📍 **Flexible Anchors**: pointAnchor, areaAnchor, mouseHoverAnchor (adapted for touch)
- 🏷️ **Multiple Labels**: startLabel, middleLabel, endLabel, captionLabel, pathLabel
- 🎨 **Visual Effects**: outline, drop shadows, dash patterns
- 📐 **Socket Positioning**: 12 different socket positions with gravity control
- 🛤️ **Path Types**: straight, arc, fluid, magnet, grid
- 🎭 **Animations**: show/hide effects with customizable timing
- 📱 **React Native Ready**: Built specifically for iOS and Android
- 🔧 **TypeScript Support**: Full type definitions included
- ⚡ **Performance Optimized**: Efficient rendering using react-native-svg

## 📦 Installation

```bash
npm install react-native-leader-line react-native-svg
```

**Note**: This library requires `react-native-svg` as a peer dependency.

### iOS Setup

For iOS, you need to install the pod:

```bash
cd ios && pod install
```

### Android Setup

No additional setup required for Android when using React Native 0.60+.

## 🚀 Quick Start

```tsx
import React, { useRef } from "react";
import { View, Text } from "react-native";
import { LeaderLine } from "react-native-leader-line";

const MyComponent = () => {
  const startRef = useRef(null);
  const endRef = useRef(null);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View ref={startRef} style={{ padding: 10, backgroundColor: "blue" }}>
        <Text style={{ color: "white" }}>Start Point</Text>
      </View>

      <View
        ref={endRef}
        style={{ padding: 10, backgroundColor: "red", marginTop: 100 }}
      >
        <Text style={{ color: "white" }}>End Point</Text>
      </View>

      <LeaderLine
        start={{ element: startRef }}
        end={{ element: endRef }}
        color="green"
        size={3}
        endPlug="arrow1"
        startSocket="bottom"
        endSocket="top"
      />
    </View>
  );
};
```

## 📖 API Documentation

### Basic Props

| Prop        | Type         | Default     | Description               |
| ----------- | ------------ | ----------- | ------------------------- |
| `start`     | `Attachment` | required    | Starting point attachment |
| `end`       | `Attachment` | required    | Ending point attachment   |
| `color`     | `string`     | `"#ff6b6b"` | Line color                |
| `size`      | `number`     | `2`         | Line thickness            |
| `startPlug` | `PlugType`   | `"none"`    | Start point plug type     |
| `endPlug`   | `PlugType`   | `"arrow1"`  | End point plug type       |

### Socket Positions

- `"auto"`, `"center"`, `"top"`, `"right"`, `"bottom"`, `"left"`
- `"top_left"`, `"top_right"`, `"bottom_left"`, `"bottom_right"`

### Plug Types

- `"none"`, `"behind"`, `"disc"`, `"square"`, `"arrow1"`, `"arrow2"`, `"arrow3"`
- `"hand"`, `"crosshair"`, `"diamond"`

### Path Types

- `"straight"`: Direct line between points
- `"arc"`: Curved arc line
- `"fluid"`: Smooth curved line
- `"magnet"`: Magnetic-style connection
- `"grid"`: Grid-aligned path

## 🎨 Advanced Examples

### Multiple Labels

```tsx
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  startLabel="Begin"
  middleLabel="Process"
  endLabel="Complete"
  captionLabel="Workflow"
/>
```

### Styled Line with Effects

```tsx
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#2196F3"
  size={4}
  dash={{ pattern: "5,5", animation: true }}
  dropShadow={{ dx: 2, dy: 2, blur: 4, color: "rgba(0,0,0,0.3)" }}
  outline={{ enabled: true, color: "white", size: 2 }}
/>
```

### Class-based API (Leader Line Compatible)

```tsx
import { LeaderLineClass } from "react-native-leader-line";

const line = new LeaderLineClass(startRef, endRef, {
  color: "red",
  size: 3,
  endPlug: "arrow2",
});

// Show with animation
line.show("fade");

// Hide with animation
line.hide("fade");

// Update properties
line.color = "blue";
line.endPlug = "disc";
```

## 🔧 TypeScript

This library is written in TypeScript and provides full type definitions:

```tsx
import {
  LeaderLineProps,
  SocketPosition,
  PlugType,
} from "react-native-leader-line";

const MyTypedComponent: React.FC = () => {
  const socketPosition: SocketPosition = "top_right";
  const plugType: PlugType = "arrow2";

  return (
    <LeaderLine
      start={{ element: startRef }}
      end={{ element: endRef }}
      startSocket={socketPosition}
      endPlug={plugType}
    />
  );
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

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
