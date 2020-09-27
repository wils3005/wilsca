module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/packages/*/src/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/css.ts',
    'localhost-cert.pem': '<rootDir>/__mocks__/localhost-cert.ts',
    'localhost-key.pem': '<rootDir>/__mocks__/localhost-key.ts',
  },
  preset: 'ts-jest',
  setupFiles: [
    '<rootDir>/__mocks__/global.ts',
    '<rootDir>/__mocks__/http.ts',
    '<rootDir>/__mocks__/https.ts',
    '<rootDir>/__mocks__/process.ts',
    '<rootDir>/__mocks__/stream.ts',
  ],
  testURL: 'http://localhost/',
};
