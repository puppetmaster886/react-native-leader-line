# GEMINI.md

This file provides guidance to Gemini when working with code in this repository.

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

## Current Status (July 2025)

### Build Status
- **TypeScript Build**: ❌ Failing due to type mismatches between `@types/react-native@0.74.0` and `@types/react@~18.2.79`
  - Error: "bigint is not assignable to type 'ReactNode'"
  - Affects: LeaderLine.tsx, LeaderLineClass.tsx, useImperativeLeaderLine.ts

### Test Status
- **Test Results**: ✅ 226 passing / ❌ 240 failing (479 total)
- **Main Issues**:
  1. React Native Testing Library compatibility errors ("Can't access .root on unmounted test renderer")
  2. Version mismatch between react-test-renderer@18.2.0 and @testing-library/react-native@12.9.0

### Linting Status
- **ESLint**: ⚠️ 271 errors/warnings (after removing 354 lines of console.log statements)
- **Remaining Issues**:
  - Unused variables in jest.setup.js
  - Empty blocks in some test files
  - References to undefined globals (jest, require, console, global)

### Recent Cleanup
- ✅ Removed all debugging console.log statements (354 lines across 6 files)
- ✅ Fixed unused variables (midX, midY) in math.ts
- ✅ Created basic smoke tests in basic-smoke.test.tsx
- ✅ Updated Jest configuration to use jsdom environment
- ✅ Created custom mocks for react-native and react-native-svg

### Recommended Next Steps
1. Fix TypeScript build errors by aligning @types versions
2. Investigate React Native Testing Library preset configuration
3. Address remaining linting errors
4. Consider migrating to a more modern test setup

## steps to develop new features or fix bugs

1. **Identify the Issue**: Review the issue or feature request in the repository.
2. **Understand the Codebase**: Familiarize yourself with the relevant parts of the codebase, especially the components and hooks involved.
3. **Check that everything is working**: Run the tests to ensure the current codebase is functioning correctly. (test, lint, build, etc.)
4. **Implement the smaller chunks of the change possible**: Break down the change into manageable parts. Implement one part at a time.
5. **Write Tests**: For each change, write tests to cover the new functionality or bug fix. Ensure that existing tests still pass.
6. **Run Tests**: After implementing the change, run the tests to verify that everything works as expected.
7. **build and check the changes are working**: Build the library and check that the changes are functioning correctly in a test environment.
8. **iterate from step 4 adding more changes and tests until the issue is resolved**: Continue to refine and test your changes until the issue is fully resolved or the feature is complete.
9. **Document Changes**: Update documentation as necessary to reflect the new functionality or changes made
10. **Add documentation for the new feature**: Ensure that any new features are well-documented, including usage examples and API details.
11. **Add examples for the new feature**: If applicable, add examples to the documentation to demonstrate how to use the new feature.
12. **clean up the code and increase performance**: Refactor the code to improve readability and performance. Remove any unnecessary code or comments.
13. **Check that everything is working**: Run all tests again to ensure that the codebase is still functioning correctly after your changes.

## Next Features:

- [ ] add live examples to the documentation
- [ ] add posibility to build the examples with react native android and ios
- [ ] fix remaining test suite issues (240 failing tests)
- [ ] resolve TypeScript build errors
