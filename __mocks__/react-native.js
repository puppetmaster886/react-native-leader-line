const React = require('react');

// Create base View component with all measurement methods
const View = React.forwardRef((props, ref) => {
  const divRef = React.useRef(null);
  
  React.useImperativeHandle(ref, () => ({
    measureInWindow: jest.fn((callback) => {
      callback(100, 100, 100, 50);
    }),
    measureLayout: jest.fn((relativeToNativeNode, onSuccess, onFail) => {
      onSuccess(10, 10, 100, 50);
    }),
    measure: jest.fn((callback) => {
      callback(0, 0, 100, 50, 100, 100);
    }),
    ...divRef.current,
  }));
  
  return React.createElement('div', { ...props, ref: divRef });
});

View.displayName = 'View';

// Create other common React Native components
const Text = React.forwardRef((props, ref) => 
  React.createElement('span', { ...props, ref })
);
Text.displayName = 'Text';

const ScrollView = React.forwardRef((props, ref) => 
  React.createElement('div', { ...props, ref })
);
ScrollView.displayName = 'ScrollView';

const TouchableOpacity = React.forwardRef((props, ref) => 
  React.createElement('div', { ...props, ref, onClick: props.onPress })
);
TouchableOpacity.displayName = 'TouchableOpacity';

const TouchableWithoutFeedback = React.forwardRef((props, ref) => 
  React.createElement('div', { ...props, ref, onClick: props.onPress })
);
TouchableWithoutFeedback.displayName = 'TouchableWithoutFeedback';

const Image = React.forwardRef((props, ref) => 
  React.createElement('img', { ...props, ref })
);
Image.displayName = 'Image';

// Export all mocked components and utilities
module.exports = {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet: {
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
  },
  Platform: {
    OS: 'ios',
    Version: '14.0',
    isPad: false,
    isTVOS: false,
    isTV: false,
    select: (obj) => obj.ios || obj.default,
  },
  Dimensions: {
    get: (dim) => {
      const dimensions = {
        window: { width: 375, height: 812, scale: 2, fontScale: 1 },
        screen: { width: 375, height: 812, scale: 2, fontScale: 1 },
      };
      return dimensions[dim] || dimensions.window;
    },
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
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
    View,
    Text,
    ScrollView,
    Image,
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
  },
};