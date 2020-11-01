module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'jsx-quotes': [2, 'prefer-single'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'no-console': 'off',
    'no-shadow': 'off', 
    'no-plusplus': 'off',
    'import/no-named-as-default': 0,
    'react/no-array-index-key': 'off',
    'jsx-a11y/label-has-associated-control': [ 2, {
      'labelComponents': ['label'],
      'labelAttributes': ['htmlFor'],
      'controlComponents': ['input']
    }],
    'react/no-danger': 'off',
    'no-unused-vars': 'off',
    'class-methods-use-this': 'off',
  },
};