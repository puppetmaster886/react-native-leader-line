# React Native Leader Line - Complete Demo Collection

This Expo Snack contains all the examples and demos for **react-native-leader-line** in a single app with tab navigation.

## 🚀 Try it Live

[Open in Expo Snack](https://snack.expo.dev/) <!-- TODO: Add actual Snack URL -->

## 📱 What's Included

This combined demo app includes 5 comprehensive sections:

### 🎯 Basic Examples
- Simple line connections between elements
- Different colors and stroke widths
- Socket positioning controls
- Installation and usage guide

### ⭐ Advanced Features
- Multiple path types (straight, arc, fluid)
- Advanced styling (outlines, shadows, dash patterns)
- Labels and text positioning
- Plug types reference guide

### 🔧 Imperative API
- Dynamic line creation and removal
- Programmatic control over multiple lines
- Batch operations for performance
- Interactive controls for real-time updates

### 🎮 Interactive Playground
- Real-time property adjustment
- Visual property editor with live preview
- Code generation for your configurations
- Experiment with all available options

### 🌍 Real World Examples
- Workflow/Process diagrams
- Network topology visualization
- Tutorial/Onboarding highlights
- Data flow representations

## 🛠️ Features Demonstrated

- **Element-to-element connections** using React refs
- **Point-to-point connections** with fixed coordinates
- **Multiple path types**: straight, arc, fluid, magnet, grid
- **Styling options**: colors, stroke width, dash patterns, outlines, shadows
- **Plug types**: arrows, discs, squares, and custom markers
- **Socket positioning**: auto, center, top, right, bottom, left, corners
- **Labels**: start, middle, and end labels with custom styling
- **Imperative API**: dynamic creation, modification, and removal
- **Performance optimizations**: batched updates and efficient rendering

## 📦 Dependencies

- **react-native-leader-line**: The main library
- **react-native-svg**: Required for rendering SVG lines
- **expo**: For easy mobile testing
- **react-native**: Core framework

## 🔧 Installation

To use react-native-leader-line in your own project:

```bash
npm install react-native-leader-line react-native-svg
```

## 📖 Basic Usage

```jsx
import React, { useRef } from 'react';
import { View } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

const MyComponent = () => {
  const startRef = useRef(null);
  const endRef = useRef(null);

  return (
    <View>
      <View ref={startRef} style={{ width: 50, height: 50 }} />
      <View ref={endRef} style={{ width: 50, height: 50 }} />
      
      <LeaderLine
        start={{ element: startRef }}
        end={{ element: endRef }}
        color="#007AFF"
        strokeWidth={2}
        endPlug="arrow1"
      />
    </View>
  );
};
```

## 🎨 Styling Examples

```jsx
// Advanced styling
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#FF3B30"
  strokeWidth={4}
  path="arc"
  curvature={0.3}
  endPlug="arrow2"
  startPlug="disc"
  outline={{ enabled: true, color: "white", size: 2 }}
  dash={{ pattern: "8,4", animation: true }}
  dropShadow={{ dx: 2, dy: 2, blur: 4, color: "rgba(0,0,0,0.3)" }}
  middleLabel={{
    text: "Custom Label",
    fontSize: 12,
    color: "white",
    backgroundColor: "#FF3B30",
    borderRadius: 4,
    padding: 4
  }}
/>
```

## 🔧 Imperative API

```jsx
import { useLeaderLineManager } from 'react-native-leader-line';

const MyComponent = () => {
  const { createLine, removeLine, updateLine } = useLeaderLineManager();

  const handleCreateLine = () => {
    createLine('my-line', {
      start: { element: startRef },
      end: { element: endRef },
      color: '#007AFF',
      strokeWidth: 2,
      endPlug: 'arrow1'
    });
  };

  const handleRemoveLine = () => {
    removeLine('my-line');
  };

  // ... rest of component
};
```

## 🚀 Quick Start

### Option 1: Try Online (Recommended)
1. Click the Snack link above
2. The Snack will open in your browser
3. Install Expo Go on your phone
4. Scan the QR code to preview on device

### Option 2: Run Locally
```bash
# Clone the repository
git clone https://github.com/puppetmaster886/react-native-leader-line
cd react-native-leader-line/expo-snacks

# Install dependencies
npm install

# Start the development server
npm start
```

## 📚 Learning Path

We recommend exploring the tabs in this order:

### Beginner Path
1. **Basic** - Get familiar with core concepts
2. **Playground** - Experiment with properties
3. **Real World** - See practical applications

### Advanced Path
1. **Advanced** - Master complex styling
2. **Imperative** - Learn dynamic control
3. **Playground** - Fine-tune configurations

## 🎯 Feature Coverage

| Feature | Basic | Advanced | Imperative | Playground | Real World |
|---------|-------|----------|------------|------------|------------|
| **Basic Connections** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Colors & Styling** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Socket Positioning** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Path Types** | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| **Advanced Effects** | ❌ | ✅ | ⚠️ | ✅ | ⚠️ |
| **Labels** | ❌ | ✅ | ❌ | ✅ | ⚠️ |
| **Dynamic Creation** | ❌ | ❌ | ✅ | ❌ | ⚠️ |
| **Batch Operations** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Real-time Editor** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Production Patterns** | ❌ | ❌ | ⚠️ | ❌ | ✅ |

**Legend:** ✅ Full coverage, ⚠️ Partial coverage, ❌ Not covered

## 📚 Learn More

- [GitHub Repository](https://github.com/puppetmaster886/react-native-leader-line)
- [API Documentation](https://github.com/puppetmaster886/react-native-leader-line#api)
- [Migration Guide](https://github.com/puppetmaster886/react-native-leader-line/blob/main/MIGRATION_GUIDE.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](https://github.com/puppetmaster886/react-native-leader-line/blob/main/LICENSE) file for details.

---

Made with ❤️ for the React Native community