const tseslint = require("typescript-eslint");
const eslintPluginImport = require("eslint-plugin-import");
const eslintPluginPrettier = require("eslint-plugin-prettier");

module.exports = [
  {
    ignores: [
      "node_modules/**/*",
      "dist/**/*",
      "generated/**/*", // ★ generated도 무시
    ],
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".ts"],
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "import/no-unresolved": "error",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "prettier/prettier": "error",
    },
  },
];
