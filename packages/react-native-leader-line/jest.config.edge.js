module.exports = {
  ...require('./jest.config.js'),
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/components/__tests__/edge-cases.test.tsx'],
};
