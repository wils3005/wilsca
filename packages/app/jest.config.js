module.exports = {
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
      branches: 72,
      functions: 100,
      lines: 90,
      statements: 91,
    },
  },
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/jest/css.ts",
    "localhost-cert.pem": "<rootDir>/jest/localhost-cert.ts",
    "localhost-key.pem": "<rootDir>/jest/localhost-key.ts",
  },
  preset: "ts-jest",
  setupFiles: ["<rootDir>/jest/setup.ts"],
  testMatch: ["<rootDir>/packages/*/src/**/*.test.{js,ts}"],
  testURL: "https://localhost/",
};
