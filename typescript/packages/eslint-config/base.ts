import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import turbo from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  turbo.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/**"],
  }
);
