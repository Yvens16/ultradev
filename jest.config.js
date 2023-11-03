/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: __dirname,
  moduleDirectories: ['node_modules', '<rootDir>'],
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  moduleNameMapper: {
    '@domain/(.*)': "<rootDir>/domain/$1",
    '@application/(.*)': "<rootDir>/application/$1",
    '@framework/(.*)': "<rootDir>/framework/$1",
  }
};