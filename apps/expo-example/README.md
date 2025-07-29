# React Native Leader Line - Expo Example

This is a comprehensive example app demonstrating all features of the `react-native-leader-line` library with Expo.

## Features Demonstrated

### Navigation Structure
The app uses React Navigation to organize examples into separate screens:

1. **Basic Connection**: Simple line connections with default settings
2. **Path Types**: Different algorithms (straight, arc, fluid, magnet, grid)
3. **Animations**: Dynamic updates and animated elements
4. **Socket Positions**: Connection points (auto, center, top, right, bottom, left)
5. **Labels**: Start, middle, and end labels with custom styling
6. **Multiple Lines**: Managing many connections efficiently
7. **Imperative API**: Dynamic line creation using the Manager pattern
8. **Effects & Styling**: Outlines, shadows, plug types, and visual effects

## Running the Example

From the monorepo root:

```bash
# Install dependencies
yarn install

# Navigate to the example app
cd apps/expo-example

# Start the Expo development server
npx expo start
```

## Testing Options

- **iOS Simulator**: Press `i` (requires macOS with Xcode)
- **Android Emulator**: Press `a` (requires Android Studio)
- **Physical Device**: Install Expo Go app and scan the QR code

## Structure

- `App.tsx`: Main component with multiple examples
- `metro.config.js`: Metro configuration for monorepo support
- `package.json`: Dependencies including local library reference

## Troubleshooting

If you encounter module resolution issues:

1. Clear Metro cache: `npx expo start --clear`
2. Ensure you've run `yarn install` from the monorepo root
3. Check that the library is built: `yarn build` from root

## Available Path Types

The examples demonstrate:
- `arc`: Curved path
- `straight`: Direct line
- `fluid`: Smooth bezier curves

## Customization

Feel free to modify the examples to test different:
- Colors
- Stroke widths
- Path types
- Socket positions
- Labels and styling