import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.node,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      js: pluginJs,
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-undef": "off",
      'react/prop-types': "off",
      "react/jsx-key": "off",
      'no-unused-vars': 'off',
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
