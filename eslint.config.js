// eslint.config.js (CommonJS)
const globals = require("globals");
const tseslint = require("typescript-eslint");
const eslintJs = require("@eslint/js");

module.exports = tseslint.config(
  // Global ignores
  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
      "jest.config.js",
      "eslint.config.js", // Ignore self
      "ecosystem.config.js",
      "config.ts",
    ],
  },

  // Basic ESLint recommended rules for all JS/TS files
  eslintJs.configs.recommended,

  // Basic TypeScript linting configuration (applied to all .ts files)
  // This includes eslintRecommended and recommended from typescript-eslint
  ...tseslint.configs.recommended, // This is an array of configs, spread it

  // Configuration for type-checked linting (applied only to src/**/*.ts)
  {
    files: ["src/**/*.ts"],
    extends: [...tseslint.configs.recommendedTypeChecked], // This is also an array
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Type-checked rules can be customized here if needed
      // e.g. "@typescript-eslint/no-floating-promises": "error"
      "@typescript-eslint/no-unused-vars": "warn", // Keep this specific rule
      "@typescript-eslint/no-explicit-any": "off", // Keep this specific rule
      "no-unused-vars": "off", // Ensure base rule is off
    },
  },

  // Configuration for Jest test files (src/**/*.test.ts, src/**/*.spec.ts)
  {
    files: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-floating-promises": "off",
      // Relax unused vars for tests if common to have them for stubs/examples
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  // Global language options (applies to all files unless overridden)
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
    },
  },
);
