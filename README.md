# React Native Leader Line - Monorepo

[![npm version](https://badge.fury.io/js/react-native-leader-line.svg)](https://badge.fury.io/js/react-native-leader-line)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.64+-blue.svg)](https://reactnative.dev/)
[![Test Coverage](https://img.shields.io/badge/Coverage-80%25+-green.svg)](https://github.com/puppetmaster886/react-native-leader-line)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A React Native port of the popular [leader-line](https://github.com/anseki/leader-line) library for drawing arrow lines and connectors between UI components.

## 📁 Monorepo Structure

This project uses Yarn workspaces to manage multiple packages:

```
react-native-leader-line/
├── packages/
│   └── react-native-leader-line/    # Main library package
├── apps/
│   ├── expo-example/                 # Expo example app
│   └── bare-example/                 # Bare React Native example
└── docs/                             # Documentation
```

## 🚀 Quick Start

### For Library Users

Install the library in your project:

```bash
npm install react-native-leader-line react-native-svg
# or
yarn add react-native-leader-line react-native-svg
```

See the [library README](./packages/react-native-leader-line/README.md) for detailed usage instructions.

### For Contributors

1. Clone the repository:

```bash
git clone https://github.com/puppetmaster886/react-native-leader-line.git
cd react-native-leader-line
```

2. Install dependencies:

```bash
yarn install
```

3. Build the library:

```bash
yarn workspace react-native-leader-line build
```

## 🛠️ Development Commands

### Root Commands

```bash
# Install all dependencies
yarn install

# Run tests across all packages
yarn test

# Run linting across all packages
yarn lint

# Build all packages
yarn build
```

### 🔥 Auto-Watch Development

```bash
# Watch library and auto-rebuild on changes
yarn dev:lib

# Watch library with verbose output
yarn dev:lib:verbose

# Run example app
yarn dev:example

# Run both library watch + example app simultaneously
yarn dev:all
```

### Library Development

```bash
# Build the library once
yarn workspace react-native-leader-line build

# Watch and auto-rebuild on changes
yarn workspace react-native-leader-line dev

# Run library tests
yarn workspace react-native-leader-line test

# Watch tests
yarn workspace react-native-leader-line test:watch

# Lint with fix
yarn workspace react-native-leader-line lint:fix
```

### Example Apps

```bash
# Run Expo example with tunnel and clear cache
yarn workspace expo-example start --tunnel --clear

# Run bare React Native example (iOS)
yarn workspace bare-example ios

# Run bare React Native example (Android)
yarn workspace bare-example android
```

## � Development Workflow

### Recommended Development Flow

1. **Start Auto-Watch**: Begin with library auto-compilation

   ```bash
   yarn dev:lib
   ```

2. **Run Example App**: In a second terminal, start the demo app

   ```bash
   yarn dev:example
   ```

3. **Alternative: Run Both Simultaneously**

   ```bash
   yarn dev:all  # Uses concurrently to run both
   ```

4. **Debug with Built-in Tools**: Use the 🐛 Debug button in the example app
   - Toggle visual debugging elements
   - Monitor console logs
   - Test layout boundaries

### Hot Development Tips

- **Auto-recompilation**: Changes in `packages/react-native-leader-line/src/` trigger instant rebuilds
- **Debug system**: Use the comprehensive debug toggles in example app
- **Type safety**: TypeScript compiler catches errors immediately
- **Live reload**: Metro bundler reflects changes in the example app instantly

## �📦 Packages

### react-native-leader-line

The main library package providing arrow line components for React Native.

- **Location**: `packages/react-native-leader-line`
- **Features**: Multiple API styles, animations, TypeScript support
- **No Expo Required**: Works with any React Native project

[View Package README](./packages/react-native-leader-line/README.md)

### expo-example

Interactive example app showcasing all library features using Expo.

- **Location**: `apps/expo-example`
- **Features**: Live demos, navigation, all component variations
- **Run**: `yarn workspace expo-example start --tunnel --clear`

[View Example README](./apps/expo-example/README.md)

### bare-example

Minimal React Native app demonstrating library usage without Expo.

- **Location**: `apps/bare-example`
- **Purpose**: Verify library works in bare React Native projects
- **Run**: `yarn workspace bare-example ios/android`

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork & Clone**: Fork the repository and clone locally
2. **Branch**: Create a feature branch from `main`
3. **Develop**: Make your changes following the code style
4. **Test**: Ensure all tests pass with `yarn test`
5. **Commit**: Use conventional commits (e.g., `feat:`, `fix:`, `docs:`)
6. **Push**: Push to your fork
7. **PR**: Open a pull request with a clear description

### Development Setup

1. Use Node.js 16+ and Yarn 1.22+
2. Install dependencies: `yarn install`
3. Build before testing: `yarn workspace react-native-leader-line build`
4. Run tests: `yarn test`
5. Check linting: `yarn lint`

### Code Style

- TypeScript for all source code
- ESLint configuration provided
- Prettier for formatting
- JSDoc comments for public APIs

## 📚 Documentation

- [API Documentation](./packages/react-native-leader-line/README.md)
- [Examples](./apps/expo-example/README.md)
- [Migration Guide](./packages/react-native-leader-line/MIGRATION_GUIDE.md)
- [Quick Start Guide](./packages/react-native-leader-line/QUICK_START.md)

## 🐛 Issues

Found a bug or have a feature request? Please check existing issues first, then open a new issue with:

- Clear description
- Steps to reproduce (if bug)
- Expected vs actual behavior
- Environment details (RN version, platform, etc.)

## 📄 License

MIT © Federico Garcia

See [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Original [leader-line](https://github.com/anseki/leader-line) by anseki
- React Native community for feedback and contributions
- All contributors who helped improve this library

---

Made with ❤️ by the React Native community
