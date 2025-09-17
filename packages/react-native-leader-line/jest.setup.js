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

// Silence specific warnings in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = jest.fn((...args) => {
    const message = String(args[0]);
    if (
      message.includes('Warning:') ||
      message.includes('Invalid') ||
      message.includes('Failed prop type')
    ) {
      return;
    }
    originalError(...args);
  });

  console.warn = jest.fn((...args) => {
    const message = String(args[0]);
    if (message.includes('Warning:')) {
      return;
    }
    originalWarn(...args);
  });
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});