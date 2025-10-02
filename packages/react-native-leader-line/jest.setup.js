// Jest setup for React Native Leader Line

// Import React to ensure it's available globally
import React from 'react';
global.React = React;

// Import testing library extensions
import '@testing-library/jest-native/extend-expect';

// Global test utilities
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
