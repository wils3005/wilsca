const { join } = require('path');
const { sync } = require('glob');

module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/packages/*/src/**/*.test.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      branches: 68,
      functions: 81,
      lines: 86,
      statements: 87,
    },
  },
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/jest/css.ts',
    'localhost-cert.pem': '<rootDir>/jest/localhost-cert.ts',
    'localhost-key.pem': '<rootDir>/jest/localhost-key.ts',
  },
  preset: 'ts-jest',
  rootDir: process.cwd(),
  setupFiles: sync(join(process.cwd(), 'jest', '*.ts')),
  testMatch: ['<rootDir>/packages/*/src/**/*.test.{js,ts}'],
  testURL: 'https://localhost/',
};
