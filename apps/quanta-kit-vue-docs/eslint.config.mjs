import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("plugin:vue/vue3-essential", "eslint:recommended"),
  {
    languageOptions: {
      parser: "@babel/eslint-parser",
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-env"]
        }
      },
      globals: {
        node: true
      }
    },
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
    ],
  },
];

export default eslintConfig;
