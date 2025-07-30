# React Native Leader Line - Bare Example

This is a bare React Native app (without Expo) demonstrating that `react-native-leader-line` works perfectly in standard React Native projects.

## Features Demonstrated

1. **Basic Connection**: Simple arc connection between two elements
2. **Multiple Lines**: Multiple connections from a single source
3. **Fixed Points**: Connection between fixed coordinates

## Setup

From the monorepo root:

```bash
# Install dependencies
yarn install

# iOS Setup (Mac only)
cd apps/bare-example/ios
pod install
cd ../../..

# Run iOS
yarn workspace bare-example ios

# Run Android
yarn workspace bare-example android
```

## Project Structure

This is a minimal React Native app created to verify library compatibility:

- No Expo dependencies
- Standard React Native CLI structure
- Configured for monorepo with Metro
- TypeScript support

## Requirements

- React Native development environment set up
- For iOS: macOS with Xcode
- For Android: Android Studio with emulator/device

## Troubleshooting

### iOS Issues
1. Clean build: `cd ios && rm -rf build && cd ..`
2. Reset pods: `cd ios && pod deintegrate && pod install`

### Android Issues
1. Clean build: `cd android && ./gradlew clean`
2. Reset Metro: `npx react-native start --reset-cache`

## Key Differences from Expo

- Manual native dependency linking may be required
- Platform-specific configuration files (iOS/Android)
- More control over native code
- Requires full development environment setup