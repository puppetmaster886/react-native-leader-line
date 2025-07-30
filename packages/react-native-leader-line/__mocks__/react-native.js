import React from 'react';

// Helper to create a mock component
const createComponent = (name) => {
  const Component = React.forwardRef((props, ref) => {
    // If ref is provided, add measurement methods
    if (ref) {
      if (typeof ref === 'function') {
        ref({
          measureInWindow: jest.fn((callback) => {
            callback(100, 100, 100, 50);
          }),
          measureLayout: jest.fn((relativeToNativeNode, onSuccess, onFail) => {
            onSuccess(10, 10, 100, 50);
          }),
          measure: jest.fn((callback) => {
            callback(0, 0, 100, 50, 100, 100);
          }),
        });
      } else if (ref && typeof ref === 'object' && 'current' in ref) {
        ref.current = {
          measureInWindow: jest.fn((callback) => {
            callback(100, 100, 100, 50);
          }),
          measureLayout: jest.fn((relativeToNativeNode, onSuccess, onFail) => {
            onSuccess(10, 10, 100, 50);
          }),
          measure: jest.fn((callback) => {
            callback(0, 0, 100, 50, 100, 100);
          }),
        };
      }
    }
    
    return React.createElement(name.toLowerCase(), props, props.children);
  });
  
  Component.displayName = name;
  return Component;
};

// Create all React Native components
const View = createComponent('View');
const Text = createComponent('Text');
const ScrollView = createComponent('ScrollView');
const TouchableOpacity = createComponent('TouchableOpacity');
const TouchableWithoutFeedback = createComponent('TouchableWithoutFeedback');
const Image = createComponent('Image');
const SafeAreaView = createComponent('SafeAreaView');
const StatusBar = createComponent('StatusBar');

// Export all mocked components and utilities
export {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  StatusBar,
};

export const StyleSheet = {
  create: (styles) => styles,
  flatten: (style) => style,
  compose: (style1, style2) => (style1 && style2 ? [style1, style2] : style1 || style2),
  hairlineWidth: 1,
  absoluteFillObject: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};

export const Platform = {
  OS: 'ios',
  Version: '14.0',
  isPad: false,
  isTVOS: false,
  isTV: false,
  select: (obj) => obj.ios !== undefined ? obj.ios : obj.default,
};

export const Dimensions = {
  get: (dim) => {
    const dimensions = {
      window: { width: 375, height: 812, scale: 2, fontScale: 1 },
      screen: { width: 375, height: 812, scale: 2, fontScale: 1 },
    };
    return dimensions[dim] || dimensions.window;
  },
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

export const PixelRatio = {
  get: () => 2,
  getFontScale: () => 1,
  getPixelSizeForLayoutSize: (size) => size * 2,
  roundToNearestPixel: (size) => Math.round(size * 2) / 2,
};

export const Alert = {
  alert: jest.fn(),
};

export const Animated = {
  View: createComponent('AnimatedView'),
  Text: createComponent('AnimatedText'),
  ScrollView: createComponent('AnimatedScrollView'),
  Image: createComponent('AnimatedImage'),
  Value: jest.fn(() => ({
    setValue: jest.fn(),
    setOffset: jest.fn(),
    flattenOffset: jest.fn(),
    extractOffset: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    stopAnimation: jest.fn(),
    resetAnimation: jest.fn(),
    interpolate: jest.fn(),
    animate: jest.fn(),
  })),
  ValueXY: jest.fn(() => ({
    setValue: jest.fn(),
    setOffset: jest.fn(),
    flattenOffset: jest.fn(),
    extractOffset: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    stopAnimation: jest.fn(),
    resetAnimation: jest.fn(),
    getLayout: jest.fn(),
    getTranslateTransform: jest.fn(),
  })),
  timing: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
    stop: jest.fn(),
    reset: jest.fn(),
  })),
  spring: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
    stop: jest.fn(),
    reset: jest.fn(),
  })),
  decay: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
    stop: jest.fn(),
    reset: jest.fn(),
  })),
  parallel: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
    stop: jest.fn(),
    reset: jest.fn(),
  })),
  sequence: jest.fn(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
    stop: jest.fn(),
    reset: jest.fn(),
  })),
  event: jest.fn(),
  createAnimatedComponent: jest.fn((component) => component),
};