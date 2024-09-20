module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',  // For handling CSS imports
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: [
      '/node_modules/(?!react-leaflet|@react-leaflet/)', // Include both react-leaflet and @react-leaflet
    ],
  };
  