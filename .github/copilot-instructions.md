<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# React Native Leader Line Library

This is a React Native library project that provides arrow line components for connecting UI elements, similar to the web LeaderLine library but adapted for mobile development.

## Key Guidelines:

- Use TypeScript for all source code
- Use react-native-svg for drawing arrows and lines
- Keep the API simple and focused on basic arrow functionality
- Avoid complex web-specific features like DOM manipulation
- Focus on performance for mobile devices
- Use React Native's coordinate system and layout
- Support both iOS and Android platforms
- Prefer functional components with hooks over class components
- Use proper TypeScript types for all props and interfaces

## Dependencies:

- react-native-svg for SVG rendering
- React Native 0.60+
- TypeScript for type safety

## Architecture:

- src/components/ - React components
- src/utils/ - Math and helper utilities
- src/types/ - TypeScript type definitions
- src/hooks/ - Custom React hooks
