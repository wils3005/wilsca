export = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [
    ".nyc_output/",
    ".storybook/",
    ".vscode/",
    "build/",
    "coverage/",
    "dist/",
    "node_modules/",
    "stories/",
    "tmp/",
  ],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: [
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
  },
  root: true,
  rules: {
    "import/exports-last": "error",
    "import/no-anonymous-default-export": "error",
    "import/no-relative-parent-imports": "error",
    "sort-imports": "error",
  },
};
