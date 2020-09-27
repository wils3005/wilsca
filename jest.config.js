const { join } = require('path');
const rootDir = join(__dirname);
const mocksDir = join(rootDir, '__mocks__');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [join(rootDir, 'packages', '*', 'src', '[jt]s*')],
  coverageDirectory: 'coverage',
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      branches: 46,
      functions: 65,
      lines: 72,
      statements: 72,
    },
  },
  moduleNameMapper: {
    '\\.(css)$': join(mocksDir, 'css.ts'),
    'localhost-cert.pem': join(mocksDir, 'localhost-cert.ts'),
    'localhost-key.pem': join(mocksDir, 'localhost-key.ts'),
  },
  preset: 'ts-jest',
  setupFiles: [
    join(mocksDir, 'global.ts'),
    join(mocksDir, 'http.ts'),
    join(mocksDir, 'https.ts'),
    join(mocksDir, 'process.ts'),
    join(mocksDir, 'stream.ts'),
  ],
  testURL: 'http://localhost/',
};
