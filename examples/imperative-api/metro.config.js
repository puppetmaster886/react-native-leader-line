const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

// Get the default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Path to the root of the monorepo (where the library is)
const libraryRoot = path.resolve(__dirname, '../..');

const config = {
  watchFolders: [
    // Add the library source folder to watchFolders so Metro will watch it for changes
    path.resolve(libraryRoot, 'src'),
    path.resolve(libraryRoot, 'lib'),
    libraryRoot,
  ],

  resolver: {
    alias: {
      // Map the library name to the local source code
      'react-native-leader-line': path.resolve(libraryRoot, 'src'),
    },
    
    // Add support for TypeScript and other file extensions
    sourceExts: [
      ...defaultConfig.resolver.sourceExts,
      'ts',
      'tsx',
    ],

    // Make sure node_modules are resolved correctly
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(libraryRoot, 'node_modules'),
    ],

    // Platforms
    platforms: ['ios', 'android', 'native', 'web'],
  },

  transformer: {
    // Use the default transformer but ensure it can handle TypeScript
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },

  // Additional Metro configuration for better performance
  resetCache: true,
};

module.exports = mergeConfig(defaultConfig, config);