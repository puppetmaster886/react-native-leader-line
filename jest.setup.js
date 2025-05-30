// Enhanced Jest setup to fix React component test issues
import "@testing-library/jest-native/extend-expect";

// Add setImmediate polyfill for Node.js environments
if (!global.setImmediate) {
  global.setImmediate = (callback, ...args) => {
    return setTimeout(callback, 0, ...args);
  };
}

if (!global.clearImmediate) {
  global.clearImmediate = (id) => {
    return clearTimeout(id);
  };
}

// Mock react-native with better async handling
jest.mock("react-native", () => ({
  View: "View",
  Text: "Text",
  ScrollView: "ScrollView",
  StyleSheet: {
    create: jest.fn((styles) => styles),
    flatten: jest.fn((style) => {
      if (Array.isArray(style)) {
        return style.reduce((acc, s) => ({ ...acc, ...s }), {});
      }
      return style || {};
    }),
  },
  Animated: {
    Value: jest.fn(() => ({
      setValue: jest.fn(),
      interpolate: jest.fn(() => ({ _value: 0 })),
    })),
    timing: jest.fn(() => ({
      start: jest.fn((callback) => callback && callback()),
    })),
    spring: jest.fn(() => ({
      start: jest.fn((callback) => callback && callback()),
    })),
    parallel: jest.fn(() => ({
      start: jest.fn((callback) => callback && callback()),
    })),
    sequence: jest.fn(() => ({
      start: jest.fn((callback) => callback && callback()),
    })),
  },
  Easing: {
    linear: jest.fn(),
    ease: jest.fn(),
    quad: jest.fn(),
    bounce: jest.fn(),
    in: jest.fn(() => jest.fn()),
    out: jest.fn(() => jest.fn()),
  },
  Dimensions: {
    get: () => ({ width: 375, height: 812 }),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
  Platform: {
    OS: "ios",
    select: (obj) => obj.ios,
  },
  findNodeHandle: jest.fn(() => 1),
}));

// Mock react-native-svg with proper React elements
jest.mock("react-native-svg", () => {
  const React = require("react");

  const createMockSvgComponent = (name) => {
    const Component = React.forwardRef((props, ref) => {
      return React.createElement("MockSvg" + name, {
        ...props,
        ref,
        testID: props.testID || `mock-${name.toLowerCase()}`,
      });
    });
    Component.displayName = `Mock${name}`;
    return Component;
  };

  return {
    __esModule: true,
    default: createMockSvgComponent("Svg"),
    Svg: createMockSvgComponent("Svg"),
    Path: createMockSvgComponent("Path"),
    Defs: createMockSvgComponent("Defs"),
    Marker: createMockSvgComponent("Marker"),
    Text: createMockSvgComponent("Text"),
    Circle: createMockSvgComponent("Circle"),
    Rect: createMockSvgComponent("Rect"),
    Line: createMockSvgComponent("Line"),
    G: createMockSvgComponent("G"),
  };
});

// Enhanced ref mocking with immediate callbacks
global.createMockRef = (measurements = {}) => ({
  current: {
    measure: jest.fn((callback) => {
      // Call synchronously in test environment to avoid timer issues
      // Use proper nullish coalescing to handle 0 values correctly
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

// Mock timers to prevent hanging
jest.useFakeTimers();

// Mock console to reduce noise but keep errors
global.originalConsoleError = console.error;
global.originalConsoleWarn = console.warn;

console.warn = jest.fn((message) => {
  // Only show non-React warnings
  if (
    typeof message === "string" &&
    !message.includes("React") &&
    !message.includes("Warning:")
  ) {
    global.originalConsoleWarn(message);
  }
});

console.error = jest.fn((message) => {
  // Only show actual errors, not React warnings
  if (
    typeof message === "string" &&
    !message.includes("Warning:") &&
    !message.includes("React.jsx")
  ) {
    global.originalConsoleError(message);
  }
});

// Override setInterval/setTimeout to be synchronous in tests
const originalSetInterval = global.setInterval;
const originalClearInterval = global.clearInterval;

global.setInterval = jest.fn((callback, delay) => {
  // In tests, don't actually set intervals that could cause hanging
  return 123; // Mock interval ID
});

global.clearInterval = jest.fn((intervalId) => {
  // Mock clear interval
});

// Cleanup function for tests
global.setupTestCleanup = () => {
  jest.clearAllMocks();
  jest.clearAllTimers();
};

global.teardownTestCleanup = () => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
};
