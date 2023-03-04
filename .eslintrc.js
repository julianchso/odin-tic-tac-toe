module.exports = {
  env: {
    browser: true,
    commonJS: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    quotes: ['error', 'single'],
    'func-names': 'off',
  },
};
