/**
 * @fileoverview Entry point for Imperative API Example
 * @description React Native entry point for the imperative API demo
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './package.json';

// Register the main application component
AppRegistry.registerComponent(appName, () => App);

// For web compatibility (if using React Native Web)
if (typeof document !== 'undefined') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  if (rootTag) {
    AppRegistry.runApplication(appName, {
      rootTag,
    });
  }
}