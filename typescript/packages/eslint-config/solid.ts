import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import plugin from "eslint-plugin-solid";
import globals from "globals";
import ts from "typescript-eslint";
import baseConfig from "@packages/eslint-config/base";

export default ts.config(
  ...baseConfig,
  {
    ...plugin.configs["flat/recommended"],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  eslintPluginPrettierRecommended
);
