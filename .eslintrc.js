module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  plugins: ['babel', 'import', 'jsx-a11y', 'react', 'prettier', 'react-native'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'linebreak-style': 'off', // Неправильно работает в Windows.

    'arrow-parens': 'off', // Несовместимо с prettier
    'object-curly-newline': 'off', // Несовместимо с prettier
    'no-mixed-operators': 'off', // Несовместимо с prettier
    'arrow-body-style': 'off', // Это - не наш стиль?
    'function-paren-newline': 'off', // Несовместимо с prettier
    'no-plusplus': 'off',
    'space-before-function-paren': 0, // Несовместимо с prettier

    'max-len': ['error', 100, 2, { ignoreUrls: true }], // airbnb позволяет некоторые пограничные случаи
    'no-console': 'error', // airbnb использует предупреждение
    'no-alert': 'error', // airbnb использует предупреждение

    'no-param-reassign': 'off', // Это - не наш стиль?
    radix: 'off', // parseInt, parseFloat и radix выключены. Мне это не нравится.

    'react/require-default-props': 'off', // airbnb использует уведомление об ошибке
    'react/forbid-prop-types': 'off', // airbnb использует уведомление об ошибке
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    'prefer-destructuring': 'off',

    'react/no-find-dom-node': 'off', // Я этого не знаю
    'react/no-did-mount-set-state': 'off',
    'react/no-unused-prop-types': 'off', // Это всё ещё работает нестабильно
    'react/jsx-one-expression-per-line': 'off',

    'jsx-a11y/anchor-is-valid': ['error', { components: ['Link'], specialLink: ['to'] }],
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id'],
        },
      },
    ], // для ошибки вложенных свойств htmlFor элементов label

    'prettier/prettier': ['error'],
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 'off'
  },
};
