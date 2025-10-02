# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.2] - 2025-10-02

### Added

- **Intelligent Auto Socket Selection**: The `socket="auto"` option now intelligently selects the closest connection point from 9 available positions (center, 4 sides, and 4 corners) instead of always using the center
- New utility function `getAllSocketPoints(layout)`: Returns coordinates for all 9 socket positions
- New utility function `calculateClosestSocket(sourceLayout, targetCenter)`: Calculates which socket is closest to a target point using Euclidean distance

### Improved

- Enhanced `calculateConnectionPoints()` to support intelligent auto socket selection
- Enhanced `calculateConnectionPointsRelative()` to support intelligent auto socket selection
- Lines with `startSocket="auto"` or `endSocket="auto"` now automatically choose the optimal connection point based on element positions

### Demo

- Added comprehensive visual demo in `expo-example` showing intelligent auto socket selection
- Demo includes 8 example connections from different positions to demonstrate automatic socket selection
- Added educational documentation explaining how auto socket selection works

### Technical Details

- Implements distance-based algorithm to find optimal socket positions
- Evaluates all 9 possible socket positions (center, top, right, bottom, left, top_left, top_right, bottom_left, bottom_right)
- Selects socket with minimum Euclidean distance to target element's center
- Fully backwards compatible - existing code continues to work without changes

### Tests

- Added comprehensive test suite for new socket selection functionality
- 10 new test cases covering all socket selection scenarios
- All 85 tests passing (100% success rate)

## [1.0.0] - 2025-05-29

### Added

- Initial release of React Native Leader Line
- Complete React Native port of the leader-line library
- Support for all major plug types (arrow1, arrow2, disc, square, diamond, hand, crosshair)
- Multiple label support (startLabel, middleLabel, endLabel, captionLabel, pathLabel)
- Socket positioning with 12 different positions
- Path types: straight, arc, fluid, magnet, grid
- Visual effects: outline, drop shadows, dash patterns
- Animation support for show/hide effects
- TypeScript support with full type definitions
- Class-based API compatible with original leader-line
- React hooks for advanced functionality
- Touch-optimized anchor system for mobile
- Performance optimizations for React Native
- iOS and Android platform support
- Comprehensive documentation and examples

### Technical Details

- Built with TypeScript for type safety
- Uses react-native-svg for efficient SVG rendering
- Optimized for React Native 0.60+
- Includes fixes from community forks of original leader-line
- Mobile-first design with touch interactions
- Memory-efficient rendering system

### Acknowledgments

- Based on the excellent leader-line library by anseki
- Incorporates community fixes and enhancements
- Adapted for React Native ecosystem
