// Jest setup for React Native Leader Line

// Import testing library extensions
import '@testing-library/jest-native/extend-expect';

// Mock react-native-svg
jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  
  const createMockComponent = (name) => {
    return React.forwardRef((props, ref) => {
      return React.createElement(View, {
        ...props,
        ref,
        testID: props.testID || `svg-${name}`,
      });
    });
  };
  
  const Svg = createMockComponent('Svg');
  
  // Add all SVG components as static properties
  Svg.Path = createMockComponent('Path');
  Svg.Defs = createMockComponent('Defs');
  Svg.Marker = createMockComponent('Marker');
  Svg.Text = createMockComponent('Text');
  Svg.Circle = createMockComponent('Circle');
  Svg.Rect = createMockComponent('Rect');
  Svg.Line = createMockComponent('Line');
  Svg.G = createMockComponent('G');
  
  return {
    __esModule: true,
    default: Svg,
    Svg,
    Path: Svg.Path,
    Defs: Svg.Defs,
    Marker: Svg.Marker,
    Text: Svg.Text,
    Circle: Svg.Circle,
    Rect: Svg.Rect,
    Line: Svg.Line,
    G: Svg.G,
  };
});

// Helper to create mock refs with measurement functions
global.createMockRef = (measurements = {}) => ({
  current: {
    measureInWindow: jest.fn((callback) => {
      callback(
        measurements.pageX ?? 100,
        measurements.pageY ?? 100,
        measurements.width ?? 100,
        measurements.height ?? 50
      );
    }),
    measureLayout: jest.fn((relativeToNativeNode, onSuccess, onFail) => {
      onSuccess(
        measurements.x ?? 10,
        measurements.y ?? 10,
        measurements.width ?? 100,
        measurements.height ?? 50
      );
    }),
    measure: jest.fn((callback) => {
      callback(
        measurements.x ?? 0,
        measurements.y ?? 0,
        measurements.width ?? 100,
        measurements.height ?? 50,
        measurements.pageX ?? 100,
        measurements.pageY ?? 100
      );
    }),
  },
});

// Silence specific warnings
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.warn = jest.fn((...args) => {
  const message = args[0];
  if (
    typeof message === 'string' &&
    message.includes('Warning:') &&
    (message.includes('React.jsx') || message.includes('LEADER_LINE_DEBUG'))
  ) {
    return;
  }
  originalConsoleWarn(...args);
});

console.error = jest.fn((...args) => {
  const message = args[0];
  if (
    typeof message === 'string' &&
    (message.includes('Warning:') ||
     message.includes('React.jsx') ||
     message.includes('LEADER_LINE_DEBUG') ||
     message.includes('react-test-renderer'))
  ) {
    return;
  }
  originalConsoleError(...args);
});