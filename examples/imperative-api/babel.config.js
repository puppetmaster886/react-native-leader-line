module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json'
        ],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@utils': './src/utils',
          '@types': './src/types',
          // Map library to local source for development
          'react-native-leader-line': '../../src',
        }
      }
    ]
  ]
};