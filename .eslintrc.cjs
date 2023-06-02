module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: './tsconfig.json' },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'prettier/prettier': 'error',
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    'import/extensions': 0,
  },
};
