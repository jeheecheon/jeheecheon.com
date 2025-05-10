import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import turbo from "eslint-plugin-turbo";
import ts from "typescript-eslint";

export default ts.config(
  js.configs.recommended,
  ts.configs.recommended,
  turbo.configs["flat/recommended"],
  eslintPluginPrettierRecommended
);
