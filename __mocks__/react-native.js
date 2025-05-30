// Mock for react-native in tests
const React = require("react");

const createMockComponent = (name) => {
  const MockComponent = React.forwardRef((props, ref) => {
    return React.createElement(name.toLowerCase(), {
      ...props,
      ref,
      "data-testid": props.testID,
    });
  });
  MockComponent.displayName = `Mock${name}`;
  return MockComponent;
};

const ReactNative = {
  View: createMockComponent("View"),
  Text: createMockComponent("Text"),
  TouchableOpacity: createMockComponent("TouchableOpacity"),
  Pressable: createMockComponent("Pressable"),
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
  PixelRatio: {
    get: jest.fn(() => 2),
  },
  Platform: {
    OS: "ios",
    select: jest.fn((obj) => obj.ios),
  },
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
    Value: jest.fn().mockImplementation(() => ({
      setValue: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      interpolate: jest.fn(() => "interpolated"),
    })),
    timing: jest.fn().mockImplementation(() => ({
      start: jest.fn((callback) => callback && callback()),
    })),
    spring: jest.fn().mockImplementation(() => ({
      start: jest.fn((callback) => callback && callback()),
    })),
    parallel: jest.fn().mockImplementation(() => ({
      start: jest.fn((callback) => callback && callback()),
    })),
    sequence: jest.fn().mockImplementation(() => ({
      start: jest.fn((callback) => callback && callback()),
    })),
    loop: jest.fn().mockImplementation(() => ({
      start: jest.fn(),
    })),
  },
  Easing: {
    linear: jest.fn(),
    ease: jest.fn(),
    inOut: jest.fn(),
  },
  findNodeHandle: jest.fn(() => 1),
};

module.exports = ReactNative;
