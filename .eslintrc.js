module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  rules: {
    'no-console': 1,
    'react/prefer-stateless-function': 2, // only React.FC
    semi: 0,
    'import/prefer-default-export': 0, // only named exports
    'import/no-default-export': 2, // only named exports
    'react-native/no-inline-styles': 0, // allow inline styles
  },
}
