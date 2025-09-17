# React Native Leader Line - Expo Example

Interactive example app showcasing all features of the react-native-leader-line library using Expo.

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- Yarn package manager
- Expo CLI (will be installed automatically)

### Installation

From the repository root:

```bash
# Install all dependencies
yarn install

# Build the library first
yarn workspace react-native-leader-line build
```

### Running the Example

```bash
# From the repository root
yarn workspace expo-example start

# Or from this directory
yarn start
```

This will start the Expo development server. You can then:

- Press `i` to open in iOS Simulator
- Press `a` to open in Android Emulator
- Scan the QR code with Expo Go app on your device

## 📱 Available Examples

The app includes comprehensive examples organized by feature:

### 1. **Basic Demo**
- Simple line connections between elements
- Basic configuration options
- Default styling

### 2. **Path Types Demo**
- `straight` - Direct lines
- `arc` - Curved lines with adjustable curvature
- `fluid` - Smooth bezier curves
- `magnet` - L-shaped connections
- `grid` - Grid-aligned paths

### 3. **Socket Positions Demo**
- All 9 socket positions (center, top, right, bottom, left, corners)
- Auto socket detection
- Socket gravity demonstrations

### 4. **Animations Demo**
- Show/hide animations
- Fade effects
- Draw-on animations
- Dynamic property updates

### 5. **Labels Demo**
- Start, middle, and end labels
- Caption labels
- Path labels
- Label styling options

### 6. **Multiple Lines Demo**
- Managing multiple connections
- Batch updates for performance
- Complex connection scenarios

### 7. **Imperative API Demo**
- Using the hook-based manager pattern
- Dynamic line creation/removal
- Programmatic control

### 8. **Effects Demo**
- Outline effects
- Drop shadows
- Dash patterns
- Gradient lines

## 🗂️ Project Structure

```
expo-example/
├── src/
│   ├── navigation/      # React Navigation setup
│   ├── screens/         # Demo screens
│   │   ├── HomeScreen.tsx
│   │   ├── BasicDemo.tsx
│   │   ├── PathTypesDemo.tsx
│   │   ├── SocketPositionsDemo.tsx
│   │   ├── AnimationsDemo.tsx
│   │   ├── LabelsDemo.tsx
│   │   ├── MultipleLinesDemo.tsx
│   │   ├── ImperativeApiDemo.tsx
│   │   └── EffectsDemo.tsx
│   └── components/      # Shared components
├── App.tsx              # App entry point
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config
```

## 🔧 Configuration

The example app is configured with:

- **TypeScript** for type safety
- **React Navigation** for screen navigation
- **Expo SDK 49** for latest features
- **react-native-svg** for rendering

## 🎨 Customizing Examples

To add your own examples:

1. Create a new screen in `src/screens/`
2. Add navigation entry in `src/navigation/AppNavigator.tsx`
3. Add a card link in `HomeScreen.tsx`

Example screen template:

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LeaderLine } from 'react-native-leader-line';

export function MyCustomDemo() {
  const startRef = useRef(null);
  const endRef = useRef(null);

  return (
    <View style={styles.container}>
      <View ref={startRef} style={styles.box} />
      <View ref={endRef} style={styles.box} />
      <LeaderLine
        start={{ element: startRef }}
        end={{ element: endRef }}
        color="#3498db"
      />
    </View>
  );
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found: react-native-leader-line"**
   - Make sure you've built the library: `yarn workspace react-native-leader-line build`

2. **"Unable to resolve module react-native-svg"**
   - Run `yarn install` from the repository root

3. **Expo Go crashes**
   - Clear cache: `yarn start --clear`
   - Reinstall Expo Go app

### Development Tips

- Use `yarn start --clear` to clear Metro bundler cache
- Enable Fast Refresh for instant updates
- Use React DevTools for debugging

## 📚 Resources

- [Main Library Documentation](../../packages/react-native-leader-line/README.md)
- [React Native Leader Line API](../../packages/react-native-leader-line/README.md#api-reference)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)

## 🤝 Contributing

To contribute to the examples:

1. Add comprehensive examples that showcase library features
2. Ensure examples are self-contained and easy to understand
3. Include comments explaining key concepts
4. Test on both iOS and Android
5. Update this README with new examples

## 📄 License

MIT - Same as the main library

---

Happy coding! 🎉