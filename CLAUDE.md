# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Install dependencies
yarn install

# Build the library
yarn run build

# Run tests
yarn test
yarn run test:watch    # Watch mode for development
yarn run test:coverage # Generate coverage report

# Linting and formatting
yarn run lint
yarn run lint:fix

# Publishing workflow
yarn run prepare       # Build before publishing
yarn run prepublishOnly # Build and test before publishing
```

### Testing individual files
```bash
# Run specific test file
yarn test src/components/__tests__/basic-smoke.test.tsx

# Run tests matching pattern
yarn test --testNamePattern="should render basic line"
```

## Architecture Overview

React Native library for drawing arrow lines between UI components, based on the web LeaderLine library but optimized for mobile.

### Dual API Architecture

1. **Functional Component API** (`LeaderLine`) - Declarative React approach
   - Props-based configuration
   - Automatic rendering and updates
   - Recommended for most use cases

2. **Imperative API** (`useLeaderLineCompatibility`) - Compatible with original leader-line
   - Same API as web version: `new LeaderLine(start, end, options)`
   - Methods: `show()`, `hide()`, `setOptions()`, `remove()`
   - Legacy property support (e.g., `size` → `strokeWidth`)

### Core Dependencies

- **react-native-svg** (^15.12.0): SVG rendering engine
- **React Native** (>=0.64.0): Modern hooks support required
- **TypeScript**: Full type safety with comprehensive definitions

### Project Structure

```
src/
├── components/
│   ├── LeaderLine.tsx         # Main functional component
│   ├── LeaderLineClass.tsx    # Class component for compatibility
│   ├── LeaderLineImperative.ts # Imperative API implementation
│   ├── MemoizedPath.tsx       # Optimized SVG path rendering
│   └── MemoizedLabel.tsx      # Optimized label rendering
├── hooks/
│   ├── useLeaderLineManager.ts # Multi-line management
│   ├── useImperativeLeaderLine.ts # Imperative API hook
│   ├── useAttachment.ts       # Attachment point management
│   └── useLeaderLineAnimation.ts # Animation utilities
├── types/
│   └── index.ts              # 700+ lines of TypeScript definitions
└── utils/
    └── math.ts               # SVG path generation and calculations
```

## Testing Configuration

- **Framework**: Jest with React Native Testing Library
- **Environment**: jsdom with custom React Native mocks
- **Coverage thresholds**: 80% (branches, functions, lines, statements)
- **Mock setup**: `jest.setup.js` provides React Native and SVG mocks
- **Timer handling**: Uses fake timers to prevent test hanging

### Test Helpers

```javascript
// Available in tests via jest.setup.js
global.createMockRef = (measurements = {}) => ({
  current: {
    measure: jest.fn((callback) => {
      callback(
        measurements.x ?? 0,
        measurements.y ?? 0,
        measurements.width ?? 100,
        measurements.height ?? 50,
        measurements.pageX ?? 100,
        measurements.pageY ?? 50
      );
    }),
  },
});
```

## Key Technical Concepts

### Attachment System
- `element`: React ref to component (dynamically measured)
- `point`: Fixed coordinate `{x, y}` in React Native coordinates

### Socket Positions
Connection points: `center`, `top`, `right`, `bottom`, `left`, `top_left`, `top_right`, `bottom_left`, `bottom_right`, `auto`

### Path Types
- `straight`: Direct line (fastest)
- `arc`: Curved with configurable curvature
- `fluid`: Smooth bezier curves
- `magnet`, `grid`: Advanced algorithms

### Performance Features
- React.memo optimization on all components
- Batched updates in manager pattern
- Layout measurement caching
- Update threshold system

## Development Guidelines

From `.github/copilot-instructions.md`:
- Use TypeScript for all source code
- Use react-native-svg for drawing
- Keep API simple and leader-line compatible
- Avoid DOM manipulation (React Native only)
- Focus on mobile performance
- Support iOS and Android
- Prefer functional components with hooks

## Type System

TypeScript-first with extensive JSDoc for LLM consumption:
- `LeaderLineProps`: Main component interface
- `Attachment`: Connection point definitions
- `SocketPosition`: Socket positioning types
- `PathType`, `PlugType`: Visual styling types
- `LeaderLineOptions`: Complete configuration interface

## Development Workflow

1. **Check current state**: Run tests, lint, and build to ensure clean baseline
2. **Implement changes**: Work in small, testable chunks
3. **Write tests**: Cover new functionality with tests
4. **Run validation**: Execute `yarn test && yarn lint && yarn build`
5. **Iterate**: Continue until feature complete
6. **Documentation**: Update JSDoc and examples as needed

## Important Notes

- Always run `yarn lint` and `yarn test` before considering work complete
- The library uses npm for publishing but yarn for development
- Test environment uses fake timers - use `jest.runAllTimers()` when needed
- SVG components are mocked in tests - check `jest.setup.js` for details