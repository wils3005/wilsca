const config = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/packages/*/src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/packages/*/src/**/*.test.{js,jsx,ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text"],
  coverageThreshold: {
    global: {
      branches: 67,
      functions: 91,
      lines: 88,
      statements: 89,
    },
  },
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/packages/jest/dist/css.js",
    "localhost-cert.pem": "<rootDir>/packages/jest/dist/localhost-cert.js",
    "localhost-key.pem": "<rootDir>/packages/jest/dist/localhost-key.js",
  },
  preset: "ts-jest",
  rootDir: process.cwd(),
  setupFiles: ["<rootDir>/packages/jest/dist/setup.js"],
  testMatch: ["<rootDir>/packages/*/src/**/*.test.{js,ts}"],
  testURL: "https://localhost/",
};

export = config;
