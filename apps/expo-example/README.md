# React Native Leader Line - Expo Example

This is an example app demonstrating the usage of `react-native-leader-line` library with Expo.

## Features Demonstrated

1. **Arc Path**: Curved connection between elements
2. **Straight Path with Labels**: Direct line with start, middle, and end labels
3. **Fixed Points**: Connection from an element to a fixed coordinate

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