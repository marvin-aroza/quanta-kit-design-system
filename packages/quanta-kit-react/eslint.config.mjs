import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "build/**", "storybook-static/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.{spec,test}.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
