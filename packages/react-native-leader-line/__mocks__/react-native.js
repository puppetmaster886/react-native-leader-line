const React = require('react');

const createMockComponent = (name) => {
  const Component = React.forwardRef((props, ref) => {
    const { children, ...rest } = props;
    return React.createElement(name, { ...rest, ref }, children);
  });
  Component.displayName = name;
  return Component;
};

module.exports = {
  View: createMockComponent('View'),
  Text: createMockComponent('Text'),
  ScrollView: createMockComponent('ScrollView'),
  TouchableOpacity: createMockComponent('TouchableOpacity'),
  TouchableWithoutFeedback: createMockComponent('TouchableWithoutFeedback'),
  Image: createMockComponent('Image'),
  SafeAreaView: createMockComponent('SafeAreaView'),
  StatusBar: createMockComponent('StatusBar'),
  StyleSheet: {
    create: (styles) => styles,
    flatten: (style) => style,
    compose: (style1, style2) => [style1, style2],
    hairlineWidth: 1,
    absoluteFillObject: {},
    absoluteFill: {},
  },
  Platform: {
    OS: 'ios',
    Version: '14.0',
    select: (obj) => obj.ios,
  },
  Dimensions: {
    get: (dim) => ({ width: 375, height: 812, scale: 2, fontScale: 1 }),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    set: jest.fn(),
  },
  PixelRatio: {
    get: () => 2,
    getFontScale: () => 1,
    getPixelSizeForLayoutSize: (size) => size * 2,
    roundToNearestPixel: (size) => Math.round(size * 2) / 2,
  },
  Alert: {
    alert: jest.fn(),
  },
  Animated: {
    View: createMockComponent('AnimatedView'),
    Text: createMockComponent('AnimatedText'),
    ScrollView: createMockComponent('AnimatedScrollView'),
    Image: createMockComponent('AnimatedImage'),
    Value: class { constructor() {} setValue() {} addListener() {} removeListener() {} removeAllListeners() {} stopAnimation() {} resetAnimation() {} interpolate() { return this; } animate() {} },
    ValueXY: class { constructor() {} setValue() {} addListener() {} removeListener() {} removeAllListeners() {} getLayout() {} getTranslateTransform() {} },
    timing: jest.fn(() => ({ start: jest.fn((cb) => cb && cb({ finished: true })) })),
    spring: jest.fn(() => ({ start: jest.fn((cb) => cb && cb({ finished: true })) })),
    decay: jest.fn(() => ({ start: jest.fn((cb) => cb && cb({ finished: true })) })),
    parallel: jest.fn(() => ({ start: jest.fn((cb) => cb && cb({ finished: true })) })),
    sequence: jest.fn(() => ({ start: jest.fn((cb) => cb && cb({ finished: true })) })),
    event: jest.fn(() => jest.fn()),
    createAnimatedComponent: (Component) => Component,
  },
  AppState: {
    currentState: 'active',
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
  Linking: {
    openURL: jest.fn(() => Promise.resolve()),
    canOpenURL: jest.fn(() => Promise.resolve(true)),
    getInitialURL: jest.fn(() => Promise.resolve(null)),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
  NativeModules: {},
  requireNativeComponent: jest.fn((name) => createMockComponent(name)),
};

module.exports.default = module.exports;
