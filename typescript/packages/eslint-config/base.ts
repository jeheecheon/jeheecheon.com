import js from "@eslint/js";
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
import turbo from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

export const config = tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  turbo.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/**"],
  }
);
