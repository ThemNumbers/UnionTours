module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'react', 'react-native'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  rules: {
    'no-console': 1,
    'react/prefer-stateless-function': 2, // only React.FC
    semi: 0,
    'import/prefer-default-export': 0, // only named exports
    'import/no-default-export': 2, // only named exports
    'react-native/no-inline-styles': 0, // allow inline styles
    '@typescript-eslint/no-explicit-any': 1, // warning
    'react-native/no-unused-styles': 1, //no unused styles
  },
}
