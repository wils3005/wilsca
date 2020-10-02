const { join } = require('path');
const { sync } = require('glob');
const jestFiles = join(process.cwd(), 'jest');

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
      branches: 62,
      functions: 80,
      lines: 85,
      statements: 86,
    },
  },
  moduleNameMapper: {
    '\\.(css)$': join(jestFiles, 'css.ts'),
    'localhost-cert.pem': join(jestFiles, 'localhost-cert.ts'),
    'localhost-key.pem': join(jestFiles, 'localhost-key.ts'),
  },
  preset: 'ts-jest',
  setupFiles: sync(join(jestFiles, '*.ts')),
  testMatch: ['<rootDir>/packages/*/src/**/*.test.{js,ts}'],
  testURL: 'https://localhost/',
};
