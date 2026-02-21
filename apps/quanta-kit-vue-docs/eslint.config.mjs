import js from "@eslint/js";
import globals from "globals";
import vueParser from "vue-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: "module",
        ecmaVersion: "latest",
        extraFileExtensions: [".vue"],
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "writable",
        global: "readonly",
      },
    },
  },
];
