import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turbo from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

export const config = tseslint.config(
  js.configs.recommended,
  eslintConfigPrettier,
  tseslint.configs.recommended,
  turbo.configs["flat/recommended"],
  {
    ignores: ["dist/**"],
  }
);
