// .eslintrc.cjs

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: [],
  rules: {
    'no-console': 'off', // Allow console.log in development
    '@typescript-eslint/no-unused-vars': 'warn', // Downgrade to warning
    'vue/component-definition-name-casing': 'warn', // Downgrade to warning
    'require-await': 'warn', // Downgrade to warning
    'object-shorthand': 'warn', // Downgrade to warning
  },
};
