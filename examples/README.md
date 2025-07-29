# React Native Leader Line - Examples

This directory contains organized example applications demonstrating different use cases of the React Native Leader Line library.

## Examples

### 1. Basic Example (`/basic`)

Simple usage with arrow lines connecting two elements.

- Basic line connections
- Socket positioning
- Simple styling

### 2. Advanced Example (`/advanced`)

Showcases advanced features and customization options.

- Multiple line types
- Animation effects
- Label systems
- Interactive demos

### 3. Imperative API Example (`/imperative-api`)

Demonstrates the leader-line compatible imperative API for backward compatibility.

- Hook-based imperative API
- Leader-line compatibility API
- Factory function usage
- Dynamic line management
- Real-time property updates

### 4. Testing Suite (`/testing`)

Comprehensive test suite consolidating all test components.

- **Basic Connection Test**: Simple arrow connections (consolidates SimpleTestComponent, BasicTestComponent, MiniTestComponent)
- **Minimal SVG Test**: Direct SVG implementation without library (consolidates SuperMinimalTest, MinimalTestComponent)
- **Library Integration Test**: Tests compiled library integration (consolidates TestWithLibComponent, SimplifiedTest)

## Running Examples

Each example is a complete React Native application:

```bash
# Basic example
cd examples/basic
npm install
npm run android  # or npm run ios

# Advanced example
cd examples/advanced
npm install
npm run android  # or npm run ios

# Imperative API example
cd examples/imperative-api
npm install
npm run android  # or npm run ios

# Testing suite
cd examples/testing
npm install
npm run android  # or npm run ios
```

## Usage in Your App

All examples use the published npm package:

```bash
npm install react-native-leader-line react-native-svg
```

Then import and use:

```jsx
import { LeaderLine } from "react-native-leader-line";

// For imperative API (leader-line compatibility)
import { 
  useImperativeLeaderLine,
  useLeaderLineCompatibility,
  createImperativeLeaderLine 
} from "react-native-leader-line";
```

## API Styles

The library supports multiple API styles for different use cases:

### 1. Declarative React Component (Recommended)
```jsx
<LeaderLine
  start={{ element: startRef }}
  end={{ element: endRef }}
  color="#3498db"
  strokeWidth={3}
  endPlug="arrow1"
/>
```

### 2. Imperative Hook API
```jsx
const { createLine } = useImperativeLeaderLine();
const line = createLine(startRef, endRef, {
  color: 'blue',
  size: 4,
  endPlug: 'arrow1'
});

line.setOptions({ color: 'red' });
line.hide();
line.show();
```

### 3. Leader-Line Compatibility API
```jsx
const { LeaderLine } = useLeaderLineCompatibility();
const line = new LeaderLine(startRef, endRef, {
  color: 'coral',
  size: 4,
  endPlug: 'arrow1'
});
```
