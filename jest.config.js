module.exports = {
  moduleFileExtensions: ['js', 'json'],
  rootDir: './',
  testRegex: ['.spec.js$', '.test.js$'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/{!(index),}.js'],
  testTimeout: 30000
};
