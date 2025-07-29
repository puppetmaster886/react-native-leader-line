const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const localPackagePath = path.resolve(__dirname, '../');

const config = getDefaultConfig(__dirname);

// Configure resolver for local package
config.resolver.extraNodeModules = {
  'react-native-leader-line': localPackagePath,
};

// Priority order: local node_modules first, then parent
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../node_modules'),
];

// Block parent node_modules for react-native and react to avoid conflicts
config.resolver.blockList = [
  new RegExp(`${path.resolve(__dirname, '../node_modules/react-native')}/.*`),
  new RegExp(`${path.resolve(__dirname, '../node_modules/react')}/.*`),
  new RegExp(`${path.resolve(__dirname, '../node_modules/react-dom')}/.*`),
];

config.resolver.unstable_enableSymlinks = true;

// Watch the parent directory for changes
config.watchFolders = [
  localPackagePath,
];

module.exports = config;