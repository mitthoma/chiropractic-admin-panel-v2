module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    // Add any custom rules here
    "no-console": "off",
    "no-debugger": "off",
  },
};
